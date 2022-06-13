package com.example.bysg.DAO;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserDAO extends JpaRepository<UserEntity,Integer> {


    Integer countAllByDeleteFlagIs(int flag);

    UserEntity findByOpenIdIs(String id);

    UserEntity findByIdAndDeleteFlag(int id,int deleteFlag);

    UserEntity save(AdminEntity adminEntity);

    List<UserEntity> findAllByDeleteFlag(int deleteFlag);

    UserEntity save(UserEntity userEntity);


}
