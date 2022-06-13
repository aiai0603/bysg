package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.*;
import com.example.bysg.DTO.initDTO;
import com.example.bysg.DTO.initallDTO;
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

    @Autowired
    ConferenceDAO conferenceDAO;

    @Autowired
    EquipmentDAO equipmentDAO;

    @Autowired
    HistoryDAO historyDAO;

    @Autowired
    UserDAO userDAO;


    @Override
    public initallDTO init(int id) {
        if(id == 0)
            return new initallDTO(conferenceDAO.countAllByDeleteFlagIs(0),equipmentDAO.countAllByDeleteFlagIs(0),userDAO.countAllByDeleteFlagIs(0),historyDAO.countAllByDeleteFlagIs(0),historyDAO.findchart());
        else
            return new initallDTO(conferenceDAO.countAllByDeleteFlagIsAndAdminIdIs(0,id),
                    equipmentDAO.countById(id),userDAO.countAllByDeleteFlagIs(0),historyDAO.countById(id),historyDAO.findchart());
    }

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
