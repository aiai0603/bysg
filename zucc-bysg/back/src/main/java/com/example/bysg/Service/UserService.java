package com.example.bysg.Service;

import com.example.bysg.Entity.UserEntity;
import org.apache.catalina.User;

import java.util.List;

public interface UserService {
    UserEntity findById(int id);

    UserEntity save(UserEntity userEntity);

    List<UserEntity> findall();

    UserEntity finByOpenId(String openId);



}
