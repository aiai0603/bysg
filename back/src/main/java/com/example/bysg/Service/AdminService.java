package com.example.bysg.Service;

import com.example.bysg.DTO.initallDTO;
import com.example.bysg.Entity.AdminEntity;

import java.util.List;

public interface AdminService {

    initallDTO init(int id);

    AdminEntity findById(int id);

    AdminEntity findByAdminId(String adminId);

    AdminEntity changePass(AdminEntity adminEntity);

    List<AdminEntity> findall();

    void delete(int id);

}
