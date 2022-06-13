package com.example.bysg.mqtt;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.example.bysg.DAO.EquipmentDAO;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.retry.annotation.Recover;
import org.springframework.stereotype.Component;
import sun.applet.resources.MsgAppletViewer_es;

import java.sql.Timestamp;

public class PushCallback  implements MqttCallback {

    public static final String HOST = "tcp://47.97.158.11";
    private MqttConnectOptions options;
    private static String clientid = "";
    private MqttClient client;





    public void connectionLost(Throwable cause) {
        System.out.println("connectionLost---------连接断开，可以做重连");
    }

    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete---------" + token.isComplete());
    }

    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("接收消息主题 : " + topic);
        System.out.println("接收消息Qos : " + message.getQos());
        String res = new String(message.getPayload());
        System.out.println("接收消息内容 : " + res);
        clientid=System.currentTimeMillis()+"zs";
        client = new MqttClient(HOST, clientid, new MemoryPersistence());
        client.connect(options);

        //通过上下文的方式获取Service，然后在这个地方保存数据即可
        if(topic.equals("bysg/IP")){
            ApplicationContext context = SpringUtil.context;  //获取Spring容器
            EquipmentDAO equipmentDAO= context.getBean(EquipmentDAO.class);
            JSONObject receive=JSON.parseObject(new String(message.getPayload()));
            equipmentDAO.setIp((String)receive.get("ip"),(String)receive.get("eid"));
        }
    }



    @Component
    public static class SpringUtil extends ApplicationObjectSupport {
        public static ApplicationContext context;

        public static Object getBean(String serviceName){
            return context.getBean(serviceName);
        }

        @Override
        protected void initApplicationContext(ApplicationContext context) throws BeansException {
            super.initApplicationContext(context);
            SpringUtil.context = context;
        }
    }
}