package com.example.bysg.Service;

import com.example.bysg.DTO.initDTO;
import com.example.bysg.Entity.AdminEntity;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;

import java.util.List;

public interface AdminService {

    initDTO init(int id);

    AdminEntity findById(int id);

    AdminEntity findByAdminId(String adminId);

    AdminEntity changePass(AdminEntity adminEntity);

    List<AdminEntity> findall();

    void delete(int id);

}
