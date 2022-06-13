package com.example.bysg.Service;

import com.example.bysg.DAO.HistoryDAO;
import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.HistoryEntity;

import java.sql.Timestamp;
import java.util.List;

public interface HistoryService {


    List<HistoryDTO> findall(int id);

    List<HistoryEntity> findbyid(int id);

    HistoryEntity findnow(int id);

    HistoryEntity findnow2(int id);

    void delete(Timestamp time,int id);

    HistoryEntity save(HistoryEntity historyEntity);



}
