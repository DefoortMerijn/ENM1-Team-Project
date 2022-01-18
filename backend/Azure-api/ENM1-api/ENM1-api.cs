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
using System.Diagnostics;

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

        [FunctionName("GetRecentPowerUsageField")]
        public static async Task<IActionResult> GetRecentPowerUsageField(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/hour/{field}")] HttpRequest req, ILogger log, string field)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -1h)"
                       + $"   |> filter(fn: (r) => r._field == \"{field}\")";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                http_code = 200,
                info = new
                {
                    field = records[0].GetField(),
                    measurement = records[0].GetMeasurement(),
                    meter = records[0].GetValueByKey("meter")
                },
                values = records.Select(r => new { time = r.GetTime(), value = r.GetValue().ToString() })
            };
            return new JsonResult(json);
        }

        [FunctionName("GetRecentPowerUsageDayField")]
        public static async Task<IActionResult> GetRecentPowerUsageDayField(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/day/{field}")] HttpRequest req, ILogger log, string field)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -1d)"
                       + "   |> aggregateWindow(every: 1h, fn: sum)"
                       + $"   |> filter(fn: (r) => r._field == \"{field}\")";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                http_code = 200,
                info = new
                {
                    field = records[0].GetField(),
                    measurement = records[0].GetMeasurement(),
                    meter = records[0].GetValueByKey("meter")
                },
                values = records.Select(r => new { time = r.GetTime(), value = r.GetValue().ToString() })
            };
            return new JsonResult(json);
        }

        [FunctionName("GetRecentPowerUsageWeekField")]
        public static async Task<IActionResult> GetRecentPowerUsageWeekField(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/week/{field}")] HttpRequest req, ILogger log, string field)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -7d)"
                       + $"  |> filter(fn: (r) => r._field == \"{field}\")"
                       + "   |> aggregateWindow(every: 1d, fn: sum)"
                       + "   |> elapsed(unit: 1s)"
                       + "   |> toInt()";
            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                http_code = 200,
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
        [FunctionName("GetRecentPowerUsageMonthField")]
        public static async Task<IActionResult> GetRecentPowerUsageMonthField(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/month/{field}")] HttpRequest req, ILogger log, string field)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -31d)"
                       + $"  |> filter(fn: (r) => r._field == \"{field}\")"
                       + "   |> aggregateWindow(every: 1d, fn: sum)"
                       + "   |> elapsed(unit: 1s)"
                       + "   |> toInt()";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

            var records = tables.SelectMany(table => table.Records).ToList();
            var json = new
            {
                http_code = 200,
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
        [FunctionName("GetRecentPowerUsageMonth")]
        public static async Task<IActionResult> GetRecentPowerUsageMonth(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/month")] HttpRequest req, ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -31d)"
                       + "   |> aggregateWindow(every: 1d, fn: sum)"
                       + "   |> elapsed(unit: 1s)"
                       + "   |> toInt()";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

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
                         .Select(x => new {
                             Field = x.Key,
                             values = x.Select(y => new { time = y.GetTimeInDateTime(), value = y.GetValue() })
                         })
            };
            return new JsonResult(json);

        }
        [FunctionName("GetRecentPowerUsageWeek")]
        public static async Task<IActionResult> GetRecentPowerUsageWeek(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/week")] HttpRequest req, ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -7d)"
                       + "   |> aggregateWindow(every: 1d, fn: sum)"
                       + "   |> elapsed(unit: 1s)"
                       + "   |> toInt()";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

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
                         .Select(x => new {
                             Field = x.Key,
                             values = x.Select(y => new { time = y.GetTimeInDateTime(), value = y.GetValue() })
                         })
            };
            return new JsonResult(json);

        }
        [FunctionName("GetRecentPowerUsageDay")]
        public static async Task<IActionResult> GetRecentPowerUsageDay(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/day")] HttpRequest req, ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -1d)"
                       + "   |> aggregateWindow(every: 1h, fn: sum)"
                       + "   |> elapsed(unit: 1s)"
                       + "   |> toInt()";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

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
                         .Select(x => new {
                             Field = x.Key,
                             values = x.Select(y => new { time = y.GetTimeInDateTime(), value = y.GetValue() })
                         })
            };
            return new JsonResult(json);

        }
        [FunctionName("GetRecentPowerUsageHour")]
        public static async Task<IActionResult> GetRecentPowerUsageHour(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "power/usage/recent/hour")] HttpRequest req, ILogger log)
        {
            using var client = InfluxDBClientFactory.Create(URL, TOKEN);
            var query = $"from(bucket: \"{BUCKET}\")"
                       + "   |> range(start: -1h)";

            var tables = await client.GetQueryApi().QueryAsync(query, ORG);

            if (tables.Count == 0) return new BadRequestObjectResult(new { http_code = 400, error_message = "Table not found, check if given name is correct (case sensitive)" });

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
                         .Select(x => new {
                             Field = x.Key,
                             values = x.Select(y => new { time = y.GetTimeInDateTime(), value = y.GetValue() })
                         })
            };
            return new JsonResult(json);

        }
    }
}
