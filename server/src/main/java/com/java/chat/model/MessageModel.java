package com.java.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageModel {
    private String message;
    private String author;
}
