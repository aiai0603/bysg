package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.ConferenceDAO;
import com.example.bysg.DAO.UserDAO;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Entity.UserEntity;
import com.example.bysg.Service.ConferenceService;
import com.example.bysg.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserDAO userDAO;


    @Override
    public UserEntity findById(int id) {
        return userDAO.findByIdAndDeleteFlag(id,0);
    }

    @Override
    public UserEntity save(UserEntity userEntity) {
        return userDAO.save(userEntity);
    }

    @Override
    public List<UserEntity> findall() {
        return userDAO.findAllByDeleteFlag(0);
    }

    @Override
    public UserEntity finByOpenId(String openId) {
        return userDAO.findByOpenIdIs(openId);
    }


}
