package com.java.chat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageModel {
    private String message;
    private String author;
    private String to;
    private String email;
    private int status;
    private int clubId;
    private String clubName;
    private Date timestamp;
}
