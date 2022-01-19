using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ENM1_api.Models
{
    internal class ChannelPower
    {
        [JsonProperty(PropertyName = "power")]
        public int power { get; set; }
        [JsonProperty(PropertyName = "current")]
        public int current { get; set; }
        [JsonProperty(PropertyName = "apparentPower")]
        public int apparentPower { get; set; }
        [JsonProperty(PropertyName = "serviceLocationId")]
        public int serviceLocationId { get; set; }
        [JsonProperty(PropertyName = "phaseId")]
        public int phaseId { get; set; }
        [JsonProperty(PropertyName = "formula")]
        public string formula { get; set; }

        // Converts MQTT ID to Smappee ID, $5500031443/3$ => 5500031443 D
        private long[] formulaArr => Array.ConvertAll(formula.Substring(1, formula.Length - 2).Split("/"), long.Parse);
        public string SmappeeID => $"{formulaArr[0]} {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[(int)formulaArr[1]]}";

        // Converts Smappee ID to Smappee Name
        public string SmappeeName => formulaMap.GetValueOrDefault(SmappeeID, "unknown");
        private Dictionary<String, String> formulaMap = new Dictionary<String, String>()
        {
            { "5500031417 A", "Machinezaal EB3.A" },
            { "5500031417 B", "Machinezaal EB3.A" },
            { "5500031417 C", "Machinezaal EB3.A" },
        };
    }
}
