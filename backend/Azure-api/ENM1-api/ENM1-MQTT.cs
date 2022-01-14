using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace ENM1_api
{
    public class ENM1_MQTT
    {
        public ENM1_MQTT(string hostname)
        {
            // create client instance 
            MqttClient client = new MqttClient(hostname);
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

            client.Connect(Guid.NewGuid().ToString());

            // subscribe to topic with QoS 2 
            client.Subscribe(new string[] { "/" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
        }

        static void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            throw new NotImplementedException();
        }
    }
}
