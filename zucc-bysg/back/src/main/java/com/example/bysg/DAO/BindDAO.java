package com.example.bysg.DAO;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.BindEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface BindDAO extends JpaRepository<BindEntity,Integer> {


   BindEntity save(BindEntity bindEntity);

   BindEntity findByConferenceIdIsAndUserIdIsAndDeleteFlagIs(int cid,int uid,int flag);

    @Modifying
    @Query(value = "update bind set delete_flag = 1  where conference_id = ? and user_id = ?",nativeQuery = true)
    void deleteById(int id,int uid);
}
