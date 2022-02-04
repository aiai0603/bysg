package com.example.bysg.Service;

import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.HistoryEntity;

import java.util.List;

public interface HistoryService {


    List<HistoryDTO> findall(int id);


}
