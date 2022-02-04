package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.AdminDAO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminDAO adminDAO;

    @Override
    public AdminEntity findById(int id) {
        return adminDAO.findByIdAndDeleteFlag(id,0);
    }

    @Override
    public AdminEntity findByAdminId(String adminId) {
        return adminDAO.findByadminIdAndDeleteFlag(adminId,0);
    }

    @Override
    public AdminEntity changePass(AdminEntity adminEntity) {
        return adminDAO.save(adminEntity);
    }

    @Override
    public List<AdminEntity> findall() {
        return adminDAO.findAllByDeleteFlag(0);
    }

    @Override
    public void delete(int id) {
         adminDAO.deleteById(id);
    }




}
