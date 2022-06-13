package com.example.bysg.Controller;

import com.example.bysg.DTO.EquipmentDTO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Entity.EquipmentEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.EquipemntService;
import com.example.bysg.result.Response;
import com.example.bysg.result.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Transactional
@CrossOrigin
@RestController
@RequestMapping(value="/equipment")
public class EquipmentController {
    @Autowired
    EquipemntService equipemntService;

    @RequestMapping(value="/create",method = RequestMethod.POST)
    Response create(@RequestBody EquipmentEntity equipmentEntity){
        if(equipmentEntity.getId()!=0){
            EquipmentEntity myEquipmentEntity= equipemntService.findByName(equipmentEntity.getEquipmentId());
            if(myEquipmentEntity == null || myEquipmentEntity.getId()==equipmentEntity.getId()){
                equipemntService.save(equipmentEntity);
                return new ResponseData("200","操作成功",null);
            }
            else{
                return new ResponseData("400","设备号已存在",null);
            }
        }else{
            EquipmentEntity myEquipmentEntity= equipemntService.findByName(equipmentEntity.getEquipmentId());
            if(myEquipmentEntity == null ){
                equipemntService.save(equipmentEntity);
                return new ResponseData("200","操作成功",null);
            }
            else{
                return new ResponseData("400","设备号已存在",null);
            }
        }}



    @RequestMapping(value="/find",method = RequestMethod.GET)
    Response find(@RequestParam int id){
        EquipmentEntity equipmentEntity= equipemntService.findById(id);
        if(equipmentEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else {
            return new ResponseData("200", "查找成功", equipmentEntity);
        }
    }

    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(@RequestParam int flag,@RequestParam int id){
        List<EquipmentDTO> equipmentEntity= equipemntService.findall(flag,id);
        return new ResponseData("200","查找成功", equipmentEntity);
    }

    @RequestMapping(value="/findbyid",method = RequestMethod.GET)
    Response findAllById(@RequestParam int id){
        List<EquipmentEntity> equipmentEntity= equipemntService.findallByid(id);
        return new ResponseData("200","查找成功", equipmentEntity);
    }




    @RequestMapping(value="/delete",method = RequestMethod.GET)
    Response delete(@RequestParam int id){
        equipemntService.delete(id);
        return new ResponseData("200","修改成功",null );

    }



}
