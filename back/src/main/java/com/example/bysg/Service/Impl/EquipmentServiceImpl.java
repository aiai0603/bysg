package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.AdminDAO;
import com.example.bysg.DAO.EquipmentDAO;
import com.example.bysg.DTO.EquipmentDTO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.EquipmentEntity;
import com.example.bysg.Entity.UserEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.EquipemntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EquipmentServiceImpl implements EquipemntService {

    @Autowired
    EquipmentDAO equipmentDAO;


    @Override
    public EquipmentEntity findById(int id) {
        return equipmentDAO.findByIdAndDeleteFlag(id,0);
    }

    @Override
    public EquipmentEntity findByName(String name) {
        return equipmentDAO.findByEquipmentIdAndDeleteFlag(name,0);
    }

    @Override
    public EquipmentEntity save(EquipmentEntity equipmentEntity) {
        return equipmentDAO.save(equipmentEntity);
    }

    @Override
    public List<EquipmentDTO> findall(int flag,int id) {
        if(flag == 0)
        {

                return equipmentDAO.findAll(0);
        }
        else{
            if(id == 0)
                return equipmentDAO.findAll2(0);
            else
                return equipmentDAO.findAll2admin(0,id);
        }
    }

    @Override
    public void delete(int id) {
        equipmentDAO.deleteById(id);
    }


}
