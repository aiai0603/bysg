package com.example.bysg.DAO;

import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.DTO.chartDTO;
import com.example.bysg.Entity.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Transactional
public interface HistoryDAO extends JpaRepository<HistoryEntity,Integer> {

    Integer countAllByDeleteFlagIs(int flag);

    List<HistoryEntity> findAllByRoomIdIsAndDeleteFlagIs(int id, int flag);

    @Query(value = "select count(*) from history a" +
            "where a.createTime,between current_date()-7 and current_date()", nativeQuery = true)
    Integer countByDate();

    @Query(value = "select count(*) from history as a , conference as b where a.room_id = b.id and b.admin_id = ? and a.delete_flag = 0", nativeQuery = true)
    Integer countById(int id);

    @Query(value = "select new com.example.bysg.DTO.HistoryDTO(a.id,a.createTime,a.finishTime,a.deleteFlag,a.name,b.conferenceName) from HistoryEntity  as a,ConferenceEntity as b where a.roomId = b.id and a.deleteFlag = :flag and b.adminId = :id")
    List<HistoryDTO> findAllByDeleteFlag2(@Param("flag") int flag, @Param("id") int id);

    @Query(value = "select new com.example.bysg.DTO.HistoryDTO(a.id,a.createTime,a.finishTime,a.deleteFlag,a.name,b.conferenceName) from HistoryEntity  as a,ConferenceEntity as b where a.roomId = b.id and a.deleteFlag = :flag")
    List<HistoryDTO> findAllByDeleteFlag(@Param("flag") int flag);

    @Query(value = "select date(create_time) as date,count(id) as count from history  where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(create_time) group by date(create_time)", nativeQuery = true)
    List<Object[]> findchart();

    HistoryEntity findByRoomIdIsAndFinishTimeIsNullAndDeleteFlagIs(int room_id,int flag);

    HistoryEntity findByIdIsAndFinishTimeIsNullAndDeleteFlagIs(int id,int flag);


    @Modifying
    @Query(value = "update history set finish_time = ?  where id = ?",nativeQuery = true)
    void finish(Timestamp time,int id);

    HistoryEntity save(HistoryEntity historyEntity);

}