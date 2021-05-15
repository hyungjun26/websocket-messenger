package com.java.chat.controller;

import com.java.chat.model.MessageModel;
import com.java.chat.storage.UserStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/send/{to}")
    public void sendMessage(@DestinationVariable String to, MessageModel message){
        System.out.println("handling send message: " + message + "to: " + to);
        boolean isExists = UserStorage.getInstance().getUsers().contains(to);
        if(isExists){
            simpMessagingTemplate.convertAndSend("/topic/message/"+to, message);
        }
    }

    @MessageMapping("/sendTo")
    @SendTo("/topics/sendTo")
    public void SendToMessage(MessageModel msg) throws Exception {
        System.out.println(msg.getMessage() + " " + msg.getFromLogin());
        simpMessagingTemplate.convertAndSend("/topics/sendTo", msg);
    }

    @MessageMapping("/Template")
    public void SendTemplateMessage() { simpMessagingTemplate.convertAndSend("/topics/template" , "Template"); }

    @RequestMapping(value="/api")
    public void SendAPI() { simpMessagingTemplate.convertAndSend("/topics/api" , "API"); }


}
