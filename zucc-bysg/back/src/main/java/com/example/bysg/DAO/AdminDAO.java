package com.example.bysg.DAO;

import com.example.bysg.DTO.EquipmentDTO;
import com.example.bysg.DTO.initDTO;
import com.example.bysg.Entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface AdminDAO extends JpaRepository<AdminEntity,Integer> {


    AdminEntity findByIdAndDeleteFlag(int id,int deleteFlag);

    AdminEntity findByadminIdAndDeleteFlag(String adminId,int deleteFlag);

    AdminEntity save(AdminEntity adminEntity);

    List<AdminEntity> findAllByDeleteFlag(int deleteFlag);

    @Modifying
    @Query(value = "update admin set delete_flag = 1  where id = ?",nativeQuery = true)
    void deleteById(int id);
}
