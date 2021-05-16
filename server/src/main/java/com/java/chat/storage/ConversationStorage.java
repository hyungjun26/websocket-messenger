package com.java.chat.storage;

import com.java.chat.model.Conversation;
import com.java.chat.model.MessageModel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ConversationStorage {
    private static ConversationStorage instance;
    private HashMap<String, List<Conversation>> conversationList;

    private ConversationStorage(){
        conversationList = new HashMap<>();

        List<Conversation> list = new ArrayList<>();
        List<MessageModel> msg = new ArrayList<>();
        msg.add(new MessageModel("hello, steve", "test user"));
        msg.add(new MessageModel("hello, test", "Steve Jobs"));
        msg.add(new MessageModel("It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!, ", "Steve Jobs"));
        msg.add(new MessageModel("test is good", "test user"));
        msg.add(new MessageModel("bye bye", "test user"));
        list.add(new Conversation("Steve Jobs", msg));
        conversationList.put("test user", list);
    }

    public static synchronized ConversationStorage getInstance(){
        if(instance == null){
            instance = new ConversationStorage();
        }
        return instance;
    }

    public List<Conversation> getConversation(String userName){
        List<Conversation> temp = new ArrayList<>();
        if(conversationList.containsKey(userName)){
            temp = conversationList.get(userName);
        }
        return temp;
    }
}
