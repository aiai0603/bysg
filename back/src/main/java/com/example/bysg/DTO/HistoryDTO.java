package com.example.bysg.DTO;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class HistoryDTO {
    private int id;
    private Timestamp createTime;
    private Timestamp finishTime;
    private int deleteFlag;
    private String name;
    private String conferenceName;

    public HistoryDTO(int id, Date createTime, Date finishTime, int deleteFlag, String name, String conferenceName) {
        this.id = id;
        this.createTime = (Timestamp) createTime;
        this.finishTime = (Timestamp) finishTime;
        this.deleteFlag = deleteFlag;
        this.name = name;
        this.conferenceName = conferenceName;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Timestamp finishTime) {
        this.finishTime = finishTime;
    }

    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConferenceName() {
        return conferenceName;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }
}
