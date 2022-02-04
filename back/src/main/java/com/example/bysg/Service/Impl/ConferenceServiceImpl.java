package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.AdminDAO;
import com.example.bysg.DAO.ConferenceDAO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.ConferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ConferenceServiceImpl implements ConferenceService {

    @Autowired
    ConferenceDAO conferenceDAO;


    @Override
    public ConferenceEntity findById(int id) {
        return conferenceDAO.findByIdAndDeleteFlag(id,0);
    }

    @Override
    public ConferenceEntity findByName(String name) {
        return conferenceDAO.findByConferenceNameAndDeleteFlag(name,0);
    }

    @Override
    public ConferenceEntity save(ConferenceEntity conferenceEntity) {
        return conferenceDAO.save(conferenceEntity);
    }

    @Override
    public List<ConferenceEntity> findall(int id) {
        if(id == 0){
            return conferenceDAO.findAllByDeleteFlag(0);
        }else{
            return conferenceDAO.findAllByDeleteFlagAndAdminId(0,id);
        }

    }

    @Override
    public void delete(int id) {
        conferenceDAO.deleteById(id);
    }




}
