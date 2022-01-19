using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using InfluxDB.Client;
using System.Linq;
using System.Collections.Generic;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt.Messaging;
using System.Text;
using Newtonsoft.Json.Linq;
using System.IO;
using ENM1_api.Models;

namespace ENM1_api
{
    public static class ENM1_API
    {

        static string URL = Environment.GetEnvironmentVariable("InfluxDB_url");
        static string TOKEN = Environment.GetEnvironmentVariable("InfluxDB_token");
        static string BUCKET = Environment.GetEnvironmentVariable("InfluxDB_bucket");
        static string ORG = Environment.GetEnvironmentVariable("InfluxDB_org");

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


        [FunctionName("GetFields")]
        public static async Task<IActionResult> GetFields(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/duiktank/fields")] HttpRequest req,
            ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = "import \"influxdata/influxdb/schema\" "
                      + "import \"json\""
                      + "schema.fieldKeys(bucket: \"Transfosite\")";
            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

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
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + $"\n|> range(start: {range})" // if field param was given -> filter on field, else just filter on blacklist
                       + $"\n|> filter(fn: (r) => {(field != null ? $"r._field == \"{field}\"" : $"not contains(value: r._field, set: {strBlacklist})")})"
                       + $"\n|> aggregateWindow(every: {window}, fn: sum)";
            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

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

        [FunctionName("SimpleFunction")]
        public static void SimpleFunction(
        [MqttTrigger("servicelocation/477d2645-2919-44c3-acf7-cad592ce7cdc/realtime")] IMqttMessage message,
        ILogger logger)
        {
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            //logger.LogInformation($"{DateTime.Now:g} Message for topic {message.Topic}: {bodyString}");

            JObject json = JObject.Parse(bodyString);
            List<ChannelPower> chList = JsonConvert.DeserializeObject<List<ChannelPower>>(json["channelPowers"].ToString());
            chList.ForEach(x => logger.LogInformation($"{x.formula}, {x.SmappeeID}, {x.SmappeeName}"));

        }
    }
}
