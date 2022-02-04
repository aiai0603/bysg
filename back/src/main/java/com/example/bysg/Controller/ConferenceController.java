package com.example.bysg.Controller;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.ConferenceService;
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
@RequestMapping(value="/conference")
public class ConferenceController {
    @Autowired
    ConferenceService conferenceService;



    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(){

        List<ConferenceEntity> conferenceEntity= conferenceService.findall();
        return new ResponseData("200","查找成功", conferenceEntity);
    }

    @RequestMapping(value="/find",method = RequestMethod.GET)
    Response findAdmin(@RequestParam int id){

        ConferenceEntity conferenceEntity= conferenceService.findById(id);
        if(conferenceEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else{
            return new ResponseData("200","查找成功", conferenceEntity);
        }

    }




    @RequestMapping(value="/delete",method = RequestMethod.GET)
    Response changePass(@RequestParam int id){
        conferenceService.delete(id);
        return new ResponseData("200","修改成功",null );

    }


    @RequestMapping(value="/create",method = RequestMethod.POST)
    Response create(@RequestBody ConferenceEntity conferenceEntity){
        if(conferenceEntity.getId()!=0){
            ConferenceEntity myConferenceEntity= conferenceService.findByName(conferenceEntity.getConferenceName());
            if(myConferenceEntity == null || myConferenceEntity.getId()==conferenceEntity.getId()){
                conferenceService.save(conferenceEntity);
                return new ResponseData("200","操作成功",null);
            }
            else{
                return new ResponseData("400","会议室已存在",null);
            }
        }else{
            ConferenceEntity myConferenceEntity= conferenceService.findByName(conferenceEntity.getConferenceName());
            if(myConferenceEntity == null ){
                conferenceService.save(conferenceEntity);
                return new ResponseData("200","操作成功",null);
            }
            else{
                return new ResponseData("400","会议室已存在",null);
            }
        }}



}
