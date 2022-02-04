package com.example.bysg.DAO;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.ConferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ConferenceDAO extends JpaRepository<ConferenceEntity,Integer> {

    Integer countAllByDeleteFlagIs(int flag);

    Integer countAllByDeleteFlagIsAndAdminIdIs(int flag,int id);

    ConferenceEntity findByIdAndDeleteFlag(int id,int deleteFlag);

    ConferenceEntity findByConferenceNameAndDeleteFlag(String name,int deleteFlag);

    ConferenceEntity save(ConferenceEntity conferenceEntity);

    List<ConferenceEntity> findAllByDeleteFlag(int deleteFlag);

    List<ConferenceEntity> findAllByDeleteFlagAndAdminId(int deleteFlag,int id);

    @Modifying
    @Query(value = "update conference set delete_flag = 1  where id = ?",nativeQuery = true)
    void deleteById(int id);
}
