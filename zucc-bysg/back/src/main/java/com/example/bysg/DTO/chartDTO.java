package com.example.bysg.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class chartDTO {

    private Date date;


    public chartDTO(Date date, Integer count) {
        this.date = date;
        this.count = count;
    }

    private Integer count;




}
