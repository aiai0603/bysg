package com.example.bysg.DTO;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class initDTO {

    private Integer conference;

    public initDTO(Integer conference, Integer equipment,Integer user, Integer history) {
        this.conference = conference;
        this.user = user;
        this.equipment = equipment;
        this.history = history;
    }

    private Integer user;
    private Integer equipment;
    private Integer history;




}
