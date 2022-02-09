package com.example.bysg.DAO;

import com.example.bysg.DTO.EquipmentDTO;
import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Entity.EquipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface EquipmentDAO extends JpaRepository<EquipmentEntity,Integer> {

    Integer countAllByDeleteFlagIs(int flag);

    @Query(value = "select count(*) from equipment as a , conference as b where a.conference_room = b.id and b.admin_id = ? and a.delete_flag = 0",nativeQuery = true)
    Integer countById(int id);

    EquipmentEntity findByIdAndDeleteFlag(int id,int deleteFlag);

    EquipmentEntity findByEquipmentIdAndDeleteFlag(String name,int deleteFlag);

    EquipmentEntity save(EquipmentEntity equipmentEntity);

    @Query(value = "select new com.example.bysg.DTO.EquipmentDTO(a.id,a.equipmentId,a.equipmentVersion,a.picture,\'未分配\',a.ip,a.deleteFlag,a.createTime,a.state) from " +
            "EquipmentEntity  as a where a.conferenceRoom = 0 and a.deleteFlag = :flag")
    List<EquipmentDTO> findAll(@Param("flag") int flag);

    @Query(value = "select new com.example.bysg.DTO.EquipmentDTO(a.id,a.equipmentId,a.equipmentVersion,a.picture,b.conferenceName,a.ip,a.deleteFlag,a.createTime,a.state) from " +
            "EquipmentEntity  as a,ConferenceEntity as b where a.conferenceRoom = b.id and a.conferenceRoom <> 0 and a.deleteFlag = :flag")
    List<EquipmentDTO> findAll2( @Param("flag") int flag);

    @Query(value = "select new com.example.bysg.DTO.EquipmentDTO(a.id,a.equipmentId,a.equipmentVersion,a.picture,\'未分配\',a.ip,a.deleteFlag,a.createTime,a.state) from " +
            "EquipmentEntity  as a , ConferenceEntity as b where a.conferenceRoom = b.id and  a.conferenceRoom = 0 and a.deleteFlag = :flag and b.adminId = :id")
    List<EquipmentDTO> findAlladmin(@Param("flag") int flag,@Param("id") int id);

    @Query(value = "select new com.example.bysg.DTO.EquipmentDTO(a.id,a.equipmentId,a.equipmentVersion,a.picture,b.conferenceName,a.ip,a.deleteFlag,a.createTime,a.state) from " +
            "EquipmentEntity  as a,ConferenceEntity as b where a.conferenceRoom = b.id and a.conferenceRoom <> 0 and a.deleteFlag = :flag and b.adminId = :id")
    List<EquipmentDTO> findAll2admin( @Param("flag") int flag,@Param("id") int id);

    List<EquipmentEntity> findAllByConferenceRoomIsAndAndDeleteFlagIs(int id,int flag);

    @Modifying
    @Query(value = "update equipment set delete_flag = 1  where id = ?",nativeQuery = true)
    void deleteById(int id);
}
