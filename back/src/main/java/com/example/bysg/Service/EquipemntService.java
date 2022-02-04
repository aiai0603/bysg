package com.example.bysg.Service;

import com.example.bysg.DTO.EquipmentDTO;
import com.example.bysg.Entity.EquipmentEntity;
import com.example.bysg.Entity.UserEntity;

import java.util.List;

public interface EquipemntService {

    EquipmentEntity findById(int id);

    EquipmentEntity findByName(String name);

    EquipmentEntity save(EquipmentEntity equipmentEntity);

    List<EquipmentDTO> findall(int flag,int id);

    void delete(int id);


}
