package com.java.chat.controller;

import com.java.chat.model.Conversation;
import com.java.chat.model.MessageModel;
import com.java.chat.storage.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.lang.Nullable;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class MessageController {

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RedisTemplate<String, Conversation> conversationTemplate;

    @MessageMapping("/send/{to}")
    public void sendMessage(@DestinationVariable String to, MessageModel message){
        System.out.println("handling send message: " + message + "to: " + to);
//        boolean isExists = UserStorage.getInstance().getUsers().contains(to);
//        if(isExists){
//            simpMessagingTemplate.convertAndSend("/topic/message/"+to, message);
//        }
    }

    @MessageMapping("/send")
    public void SendToMessage(MessageModel msg){
        logger.info("{}", msg);
        HashOperations<String, String, Conversation> ho = conversationTemplate.opsForHash();
        if(ho.hasKey(msg.getAuthor(),msg.getTo())){ // 상대방과 대화 데이터가 있을때
            Conversation con = ho.get(msg.getAuthor(), msg.getTo());
            con.getMessageList().add(msg);
            ho.put(msg.getAuthor(),msg.getTo(),con);
        } else { // 상대방 데이터가 없을때
            Conversation newCon = new Conversation(msg.getTo(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getAuthor(),msg.getTo(),newCon);
        }
        if(ho.hasKey(msg.getTo(), msg.getAuthor())){ // 상대방에게 대화 데이터가 있을때
            Conversation con = ho.get(msg.getTo(), msg.getAuthor());
            con.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),con);
        } else { // 상대방에게 대화 데이터가 없을때
            Conversation newCon = new Conversation(msg.getAuthor(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),newCon);
        }
        simpMessagingTemplate.convertAndSend("/topic/"+msg.getTo() , msg);
    }

    @MessageMapping("/Template")
    public void SendTemplateMessage() { simpMessagingTemplate.convertAndSend("/topics/template" , "Template"); }

    @RequestMapping(value="/api")
    public void SendAPI() { simpMessagingTemplate.convertAndSend("/topics/api" , "API"); }

    @MessageMapping("/test")
    public void test(SimpMessageHeaderAccessor headerAccessor) {
        //MessageModel temp = new MessageModel("hello","test");
        //logger.info("Init - SessionID : [{}], Message : [{}]", headerAccessor.getUser().getName(),temp);
        //simpMessagingTemplate.convertAndSendToUser(headerAccessor.getUser().getName(),"/queue/message",temp, createHeaders(headerAccessor.getUser().getName()));

    }

    private MessageHeaders createHeaders(@Nullable String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        if (sessionId != null) headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        logger.info(headerAccessor.toString());
        return headerAccessor.getMessageHeaders();
    }

}
