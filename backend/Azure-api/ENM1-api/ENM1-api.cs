using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using InfluxDB.Client;
using System.Linq;
using System.Collections.Generic;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt.Messaging;
using System.Text;
using Newtonsoft.Json.Linq;
using ENM1_api.Models;
using InfluxDB.Client.Writes;
using InfluxDB.Client.Api.Domain;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ENM1_api
{
    public static class ENM1_API
    {

        // Transfo Influx DB
        static InfluxDBClientOptions TRANSFO_OPTIONS = new InfluxDBClientOptions.Builder()
                .Url(Environment.GetEnvironmentVariable("InfluxDB_url_transfo"))
                .AuthenticateToken(Environment.GetEnvironmentVariable("InfluxDB_token_transfo"))
                .TimeOut(TimeSpan.FromSeconds(30))
                .ReadWriteTimeOut(TimeSpan.FromSeconds(30)).Build();
        static string TRANSFO_BUCKET = Environment.GetEnvironmentVariable("InfluxDB_bucket_transfo");
        static string TRANSFO_ORG = Environment.GetEnvironmentVariable("InfluxDB_org_transfo");

        // Howest personal Influx DB
        static InfluxDBClientOptions HOWEST_OPTIONS = new InfluxDBClientOptions.Builder()
                .Url(Environment.GetEnvironmentVariable("InfluxDB_url_howest"))
                .AuthenticateToken(Environment.GetEnvironmentVariable("InfluxDB_token_howest"))
                .TimeOut(TimeSpan.FromSeconds(30))
                .ReadWriteTimeOut(TimeSpan.FromSeconds(30)).Build();
        static string HOWEST_BUCKET = Environment.GetEnvironmentVariable("InfluxDB_bucket_howest");
        static string HOWEST_ORG = Environment.GetEnvironmentVariable("InfluxDB_org_howest");

        // Dict of time types along with their respective duration units
        static Dictionary<string, string[]> pairs = new Dictionary<string, string[]>()
            {
                { "year", new string[] { "-1y", "1mo" } }, // shows data up until 1 year ago, grouped per month
                { "month", new string[] { "-1mo", "1d" } },
                { "week", new string[] { "-1w", "1d" } },
                { "day", new string[] { "-1d", "1h" } },
                { "recent", new string[] { "-1h", "5m" } },
            };

        // List of fields to exclude from query
        static string[] blacklist = { "CO2_5min", "Description_Weather", "Humidity", "Pressure", "Temperature", "Windspeed" };
        static string strBlacklist = $"[{string.Join(", ", blacklist.Select(x => string.Format("\"{0}\"", x)))}]"; // string[] obj => ["x", "z", "y"] because C# is dumb


        [FunctionName("dsdasda")]
        public static async Task<IActionResult> GetFielddds(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "test")] HttpRequest req,
            ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(HOWEST_OPTIONS);

            var tables = await client.GetQueryApi().QueryAsync($"from(bucket:\"{HOWEST_BUCKET}\") |> range(start: -1y)", HOWEST_ORG);
            log.LogInformation(tables.ToString());

            return new OkResult();
        }


        [FunctionName("GetFields")]
        public static async Task<IActionResult> GetFields(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/duiktank/fields")] HttpRequest req,
            ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(TRANSFO_OPTIONS);
            var query = "import \"influxdata/influxdb/schema\" "
                      + "import \"json\""
                      + "schema.fieldKeys(bucket: \"Transfosite\")";
            var tables = await client.GetQueryApi().QueryAsync(query, TRANSFO_ORG);

            List<string> fields = tables.SelectMany(table => table.Records).Select(record => (string)record.GetValue()).ToList();
            fields.RemoveAll(f => blacklist.Contains(f)); // filter blacklisted fields

            return new JsonResult(fields);
        }

        [FunctionName("GetPowerUsageDuiktank")]
        public static async Task<IActionResult> GetPowerUsageDuiktank(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/duiktank/usage/{time}/{field?}")] HttpRequest req, ILogger log, string time, string field)
        {
            // Check whether correct time parameter was given, otherwise return BadRequest
            if (!pairs.ContainsKey(time)) return new BadRequestObjectResult(new { http_code = 400, error_message = "Incorrect time parameter, please check documentation" });

            // get range and window from given time parameter
            string range = pairs[time][0];
            string window = pairs[time][1];

            // create query
            using var client = InfluxDBClientFactory.Create(TRANSFO_OPTIONS);
            var query = $"from(bucket: \"{TRANSFO_BUCKET}\")"
                       + $"\n|> range(start: {range})" // if field param was given -> filter on field, else just filter on blacklist
                       + $"\n|> filter(fn: (r) => {(field != null ? $"r._field == \"{field}\"" : $"not contains(value: r._field, set: {strBlacklist})")})"
                       + $"\n|> aggregateWindow(every: {window}, fn: sum)";
            var tables = await client.GetQueryApi().QueryAsync(query, TRANSFO_ORG);

            // check for found tables, otherwise return BadRequest
            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "No data found, check if given field parameter is correct (case sensitive)" });


            // format to JSON
            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                http_code = 200,
                info = new
                {
                    measurement = records[0].GetMeasurement(),
                    meter = records[0].GetValueByKey("meter")
                },
                data = records
                         .OrderBy(r => r.GetField())
                         .GroupBy(r => r.GetField())
                         .Select(x => new
                         {
                             Field = x.Key,
                             values = x.Select(y => new { time = y.GetTimeInDateTime(), value = y.GetValue() })
                         })
            };

            return new JsonResult(json);
        }

        [FunctionName("TransfoMqttRealtime")]
        public static void SimpleFunction(
        [MqttTrigger("servicelocation/477d2645-2919-44c3-acf7-cad592ce7cdc/realtime")] IMqttMessage message,
        ILogger logger)
        {
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            logger.LogInformation("adding point data");

            // convert MQTT data to list of ChannelPower objects
            JObject json = JObject.Parse(bodyString);
            List<ChannelPower> chList = JsonConvert.DeserializeObject<List<ChannelPower>>(json["channelPowers"].ToString());

            // prepare Influx client
            using (var client = InfluxDBClientFactory.Create(HOWEST_OPTIONS))
            {
                List <PointData> points = new List<PointData>();
                foreach (ChannelPower ch in chList)
                {
                    // create point from ChannelPower obj
                    var point = PointData.Measurement("Transfo")
                        .Field("power", ch.Power)
                        .Field("current", ch.Current)
                        .Field("apparentpower", ch.ApparentPower)
                        .Field("phaseid", ch.PhaseId)
                        .Field("servicelocationid", ch.ServiceLocationId)
                        .Tag("formula", ch.SmappeeName)
                        .Tag("field", ch.SmappeeName)
                        .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

                    points.Add(point);
                }

                client.GetWriteApi().WritePoints(HOWEST_BUCKET, HOWEST_ORG, points);
            }
        }
    }
}
