package com.example.bysg.DTO;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@Data
public class EquipmentDTO {

    private int id;
    private String equipmentId;
    private String equipmentVersion;
    private String picture;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(String equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getEquipmentVersion() {
        return equipmentVersion;
    }

    public void setEquipmentVersion(String equipmentVersion) {
        this.equipmentVersion = equipmentVersion;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getConferenceName() {
        return conferenceName;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    private String conferenceName;
    private String ip;
    private int deleteFlag;
    private Timestamp createTime;
    private int state;


    public EquipmentDTO(int id, String equipmentId, String equipmentVersion, String picture, String conferenceName, String ip, int deleteFlag, Date createTime, int state) {
        this.id = id;
        this.equipmentId = equipmentId;
        this.equipmentVersion = equipmentVersion;
        this.picture = picture;
        this.conferenceName = conferenceName;
        this.ip = ip;
        this.deleteFlag = deleteFlag;
        this.createTime = (Timestamp) createTime;
        this.state = state;
    }


}
