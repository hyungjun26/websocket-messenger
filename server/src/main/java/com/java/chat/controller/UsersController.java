package com.java.chat.controller;

import com.java.chat.model.Conversation;
import com.java.chat.storage.ConversationStorage;
import com.java.chat.storage.UserStorage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsersController {
    @GetMapping("/register/{userName}")
    public ResponseEntity<Void> register(@PathVariable String userName){
        System.out.println("handling register user request:");
        try{
            UserStorage.getInstance().setUsers(userName);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/fetchAllUsers/{userName}")
    public List<Conversation> fetchAll(@PathVariable String userName){
        List<Conversation> users = ConversationStorage.getInstance().getConversation(userName);
        return users;
    }
}
