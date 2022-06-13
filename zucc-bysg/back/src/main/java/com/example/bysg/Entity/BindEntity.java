package com.example.bysg.Entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "bind", schema = "tableCards", catalog = "")
public class BindEntity {
    private int id;
    private int userId;
    private int deleteFlag;
    private int conferenceId;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "user_id")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
    @Column(name = "conference_id")
    public int getConferenceId() {
        return conferenceId;
    }

    public void setConferenceId(int conferenceId) {
        this.conferenceId = conferenceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BindEntity that = (BindEntity) o;
        return id == that.id &&
                userId == that.userId &&
                deleteFlag == that.deleteFlag &&
                conferenceId == that.conferenceId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, deleteFlag, conferenceId);
    }
}
