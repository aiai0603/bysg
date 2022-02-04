package com.example.bysg.Entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "conference", schema = "tableCards", catalog = "")
public class ConferenceEntity {
    private int id;
    private String conferenceName;
    private String conferencePwd;
    private int num;
    private int deleteFlag;
    private Timestamp createTime;
    private int state;
    private int adminId;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "conference_name")
    public String getConferenceName() {
        return conferenceName;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }

    @Basic
    @Column(name = "conference_pwd")
    public String getConferencePwd() {
        return conferencePwd;
    }

    public void setConferencePwd(String conferencePwd) {
        this.conferencePwd = conferencePwd;
    }

    @Basic
    @Column(name = "num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
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
        ConferenceEntity that = (ConferenceEntity) o;
        return id == that.id &&
                num == that.num &&
                deleteFlag == that.deleteFlag &&
                state == that.state &&
                Objects.equals(conferenceName, that.conferenceName) &&
                Objects.equals(conferencePwd, that.conferencePwd) &&
                Objects.equals(createTime, that.createTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, conferenceName, conferencePwd, num, deleteFlag, createTime, state);
    }

    @Basic
    @Column(name = "admin_id")
    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }
}
