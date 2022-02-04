package com.example.bysg.Service;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity findById(int id);

    UserEntity save(UserEntity userEntity);

    List<UserEntity> findall();


}
