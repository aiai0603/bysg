package com.example.bysg;


import com.example.bysg.mqtt.MyMqttClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandRunner implements CommandLineRunner {
    @Override
    public void run(String... args) {
        MyMqttClient mqttClient=new MyMqttClient();
        mqttClient.start();
    }
}