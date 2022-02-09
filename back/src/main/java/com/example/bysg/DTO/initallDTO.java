package com.example.bysg.DTO;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class initallDTO {

    private Integer conference;
    private Integer user;


    public initallDTO(Integer conference, Integer user, Integer equipment, Integer history, List<chartDTO> charts) {
        this.conference = conference;
        this.user = user;
        this.equipment = equipment;
        this.history = history;
        this.charts = charts;
    }

    private Integer equipment;
    private Integer history;
    private List<chartDTO> charts;




}
