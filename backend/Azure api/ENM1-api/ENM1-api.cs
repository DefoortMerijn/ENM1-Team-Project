using System;
using System.IO;
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

namespace ENM1_api
{
    public static class ENM1_API
    {

        static string URL = Environment.GetEnvironmentVariable("InfluxDB_url");
        static string TOKEN = Environment.GetEnvironmentVariable("InfluxDB_token");
        static string BUCKET = Environment.GetEnvironmentVariable("InfluxDB_bucket");
        static string ORG = Environment.GetEnvironmentVariable("InfluxDB_org");

        [FunctionName("GetFields")]
        public static async Task<IActionResult> GetFields(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/fields")] HttpRequest req,
            ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);

            var query = "import \"influxdata/influxdb/schema\" "
                      + "import \"json\""
                      + "schema.fieldKeys(bucket: \"Transfosite\")";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);
            List<string> fields = tables.SelectMany(table => table.Records).Select(record => (string)record.GetValue()).ToList();
            var json = JsonConvert.SerializeObject(fields);

            return new JsonResult(fields);
        }

        [FunctionName("GetRecentPowerUsage")]
        public static async Task<IActionResult> GetRecentPowerUsage(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/{field}")] HttpRequest req, ILogger log, string field)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -1h)"
                       +$"   |> filter(fn: (r) => r._field == \"{field}\")";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                info = new
                {
                    field = records[0].GetField(),
                    measurement = records[0].GetMeasurement(),
                    meter = records[0].GetValueByKey("meter")
                },
                values = records.Select(r => new { time = r.GetTime(), value = r.GetValue() })
            };
            return new JsonResult(json);
        }
    }
}
