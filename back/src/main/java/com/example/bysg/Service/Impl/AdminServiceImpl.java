package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.AdminDAO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminDAO adminDAO;

    @Override
    public AdminEntity findById(String id) {
        return adminDAO.findByAdminId(id);
    }
}
