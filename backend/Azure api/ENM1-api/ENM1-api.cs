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
    public static class Function1
    {

        static string TOKEN = Environment.GetEnvironmentVariable("InfluxDB_token");
        static string BUCKET = Environment.GetEnvironmentVariable("InfluxDB_bucket");
        static string ORG = Environment.GetEnvironmentVariable("InfluxDB_org");

        [FunctionName("GetFields")]
        public static async Task<IActionResult> GetFields(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "fields")] HttpRequest req,
            ILogger log)
        {
            using var client = InfluxDBClientFactory.Create("http://howest-energy-monitoring.westeurope.cloudapp.azure.com:8086", TOKEN);

            var query = "import \"influxdata/influxdb/schema\" "
                      + "import \"json\""
                      + "schema.fieldKeys(bucket: \"Transfosite\")"
                      /*+"  |> map(fn: (r) => ({ _value: string(v: json.encode(v: { \"field\":r._value}))}))"*/;
            var tables = await client.GetQueryApi().QueryAsync(query, ORG);
            List<string> fields = tables.SelectMany(table => table.Records).Select(record => (string)record.GetValue()).ToList();
            var json = JsonConvert.SerializeObject(fields);
            //foreach (var record in tables.SelectMany(table => table.Records))
            //{
            //    Console.WriteLine($"{record.GetValue()}");
            //    Console.WriteLine($"{record.GetValueByIndex(3)}");
            //}

            return new JsonResult(fields);
        }
    }
}
