package com.java.chat.controller;

import com.java.chat.model.Conversation;
import com.java.chat.model.MessageModel;
import com.java.chat.model.User;
import com.java.chat.storage.ConversationStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsersController {
    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private RedisTemplate<String, Conversation> conversationTemplate;

    @Autowired
    private RedisTemplate<String, User> userTemplate;


    @GetMapping("/search/{myId}/{userId}")
    public ResponseEntity<Integer> search(@PathVariable String userId, @PathVariable String myId){
        if(!userTemplate.hasKey(userId+":info")){
            return new ResponseEntity<>(101, HttpStatus.OK);
        }
        HashOperations<String, String, Conversation> hashOperations = conversationTemplate.opsForHash();
        if(hashOperations.hasKey(myId, userId)){
            return new ResponseEntity<>(102, HttpStatus.OK);
        }
        hashOperations.put(myId, userId, new Conversation(userId, new ArrayList<>()));
        return new ResponseEntity<>(100, HttpStatus.OK);
    }

    @GetMapping("/fetchAllUsers/{userName}")
    public ResponseEntity<Collection<Conversation>> fetchAll(@PathVariable String userName){
        HashOperations<String, String, Conversation> hashOperations = conversationTemplate.opsForHash();
        logger.info("user name: {}", userName);
        Map<String, Conversation> mapper = hashOperations.entries(userName);
        Collection<Conversation> res = mapper.values();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Integer> login(@RequestBody User user){
        logger.info("Login Info: [{}]", user);
        ValueOperations<String, User> vop = userTemplate.opsForValue();
        if(!userTemplate.hasKey(user.getId()+":info")){
            return new ResponseEntity<>(100, HttpStatus.OK);
        } else if(!vop.get(user.getId()+":info").getPassword().equals(user.getPassword())){
            return new ResponseEntity<>(200, HttpStatus.OK);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody User user){
        ValueOperations<String, User> vop = userTemplate.opsForValue();
        if(userTemplate.hasKey(user.getId()+":info")){
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        vop.set(user.getId()+":info",user);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
