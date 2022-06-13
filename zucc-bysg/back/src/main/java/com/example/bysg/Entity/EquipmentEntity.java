package com.example.bysg.Entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "equipment", schema = "tableCards", catalog = "")
public class EquipmentEntity {
    private int id;
    private String equipmentId;
    private String equipmentVersion;
    private String picture;
    private int conferenceRoom;
    private String ip;
    private int deleteFlag;
    private Timestamp createTime;
    private int state;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "equipment_id")
    public String getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(String equipmentId) {
        this.equipmentId = equipmentId;
    }

    @Basic
    @Column(name = "equipment_version")
    public String getEquipmentVersion() {
        return equipmentVersion;
    }

    public void setEquipmentVersion(String equipmentVersion) {
        this.equipmentVersion = equipmentVersion;
    }

    @Basic
    @Column(name = "picture")
    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Basic
    @Column(name = "conference_room")
    public int getConferenceRoom() {
        return conferenceRoom;
    }

    public void setConferenceRoom(int conferenceRoom) {
        this.conferenceRoom = conferenceRoom;
    }

    @Basic
    @Column(name = "ip")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "delete_flag")
    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Basic
    @Column(name = "create_time")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "state")
    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EquipmentEntity that = (EquipmentEntity) o;
        return id == that.id &&
                conferenceRoom == that.conferenceRoom &&
                deleteFlag == that.deleteFlag &&
                state == that.state &&
                Objects.equals(equipmentId, that.equipmentId) &&
                Objects.equals(equipmentVersion, that.equipmentVersion) &&
                Objects.equals(picture, that.picture) &&
                Objects.equals(ip, that.ip) &&
                Objects.equals(createTime, that.createTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, equipmentId, equipmentVersion, picture, conferenceRoom, ip, deleteFlag, createTime, state);
    }
}
