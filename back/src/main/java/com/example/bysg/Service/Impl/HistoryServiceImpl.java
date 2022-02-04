package com.example.bysg.Service.Impl;

import com.example.bysg.DAO.HistoryDAO;
import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.HistoryEntity;
import com.example.bysg.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryDAO historyDAO;

    @Override
    public List<HistoryDTO> findall() {
        return historyDAO.findAllByDeleteFlag(0);
    }
}
