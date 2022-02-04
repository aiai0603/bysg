package com.example.bysg.DAO;

import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface HistoryDAO extends JpaRepository<HistoryEntity,Integer> {

    @Query(value = "select new com.example.bysg.DTO.HistoryDTO(a.id,a.createTime,a.finishTime,a.deleteFlag,a.name,b.conferenceName) from HistoryEntity  as a,ConferenceEntity as b where a.roomId = b.id and a.deleteFlag = :flag")
    List<HistoryDTO> findAllByDeleteFlag(@Param("flag")int flag);


}
