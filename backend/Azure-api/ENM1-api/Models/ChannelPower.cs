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
            { "5500031443 D", "Stopcontact16A EB1.D" },
            { "5500033160 A", "Stopcontact16A EB1.D" },
            { "5500033160 B", "Stopcontact16A EB1.D" },
            { "5500033102 A", "Stopcontact 63A fuifzaal EB1" },
            { "5500033102 B", "Stopcontact 63A fuifzaal EB1" },
            { "5500033102 C", "Stopcontact 63A fuifzaal EB1" },
            { "5500031425 A", "Stopcontact125A EB1.A" },
            { "5500031425 B", "Stopcontact125A EB1.A" },
            { "5500031425 C", "Stopcontact125A EB1.A" },
            { "5500031443 A", "Voeding Fuifzaal EB1.I" },
            { "5500031443 B", "Voeding Fuifzaal EB1.I" },
            { "5500031443 C", "Voeding Fuifzaal EB1.I" },
            { "5500033160 C", "Stopcontact32A EB1.C" },
            { "5500033160 D", "Stopcontact32A EB1.C" },
            { "5500033102 D", "Stopcontact32A EB1.C" },
            { "5500031417 A", "Machinezaal EB3.A" },
            { "5500031417 B", "Machinezaal EB3.A" },
            { "5500031417 C", "Machinezaal EB3.A" },
            { "5500031417 D", "Kantoren verdiep 4 EB3.B" },
            { "5500033167 A", "Kantoren verdiep 4 EB3.B" },
            { "5500033167 B", "Kantoren verdiep 4 EB3.B" },
            { "5500033167 C", "Oenanthé EB3.C" },
            { "5500033167 D", "Oenanthé EB3.C" },
            { "5500031540 A", "Oenanthé EB3.C" },
            { "5500031540 B", "Verdieping 5 EB3.D" },
            { "5500031540 C", "Verdieping 5 EB3.D" },
            { "5500031540 D", "Verdieping 5 EB3.D" },
            { "5500033164 A", "Waterkot EB3.I" },
            { "5500033164 B", "Waterkot EB3.I" },
            { "5500033164 C", "Waterkot EB3.I" },
            { "5500033164 D", "Reserve loods EB3.H" },
            { "5500031412 A", "Reserve loods EB3.H" },
            { "5500031412 B", "Reserve loods EB3.H" },
            { "5500031536 A", "CE stekker fuifzaal Opbouw" },
            { "5500031536 B", "CE stekker fuifzaal Opbouw" },
            { "5500031536 C", "CE stekker fuifzaal Opbouw" },
            { "5500031536 D", "Silo" },
        };
    }
}
