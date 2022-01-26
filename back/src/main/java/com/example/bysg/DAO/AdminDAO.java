package com.example.bysg.DAO;

import com.example.bysg.Entity.AdminEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface AdminDAO extends JpaRepository<AdminEntity,Integer> {



    AdminEntity findByAdminId(String adminId);





}
