package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.*;
import com.example.bysg.DTO.initallDTO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.BindEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.BindService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BindServiceImpl implements BindService {

    @Autowired
    BindDAO bindDAO;

    @Override
    public void save(BindEntity bindEntity) {
        bindDAO.save(bindEntity);
    }

    @Override
    public BindEntity find(int cid, int uid) {
        return bindDAO.findByConferenceIdIsAndUserIdIsAndDeleteFlagIs(cid,uid,0);
    }

    @Override
    public void delete(int id,int uid) {
        bindDAO.deleteById(id,uid);
    }


}
