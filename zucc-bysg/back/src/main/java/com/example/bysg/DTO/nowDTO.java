package com.example.bysg.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class nowDTO {

    private int id;
    private String name;
    private Integer flag;

    public nowDTO() {

    }

    public nowDTO(int id,String name, Integer flag, Integer num, Integer sum) {
        this.id = id;
        this.name = name;
        this.flag = flag;
        this.num = num;
        this.sum = sum;
    }

    private Integer num;
    private Integer sum;

}
