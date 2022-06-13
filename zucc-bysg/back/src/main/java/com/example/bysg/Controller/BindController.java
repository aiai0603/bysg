package com.example.bysg.Controller;

import com.example.bysg.DTO.initallDTO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.BindEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.BindService;
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
@RequestMapping(value="/bind")
public class BindController {
    @Autowired
    BindService bindService;

    @Autowired
    ConferenceService conferenceService;


    @RequestMapping(value="/delete",method = RequestMethod.GET)
    Response delete(int id,int uid) {
        bindService.delete(id,uid);
        return new ResponseData("200", "删除成功",null );
    }

    @RequestMapping(value="/create",method = RequestMethod.POST)
    Response create(@RequestBody  Map<String, Object> map){
        if(conferenceService.findByName((String)map.get("name"))==null){
            return new ResponseData("405","会议室不存在",null);
        }else {
            if(!conferenceService.findByName( (String)map.get("name")).getConferencePwd().equals( (String)map.get("pass") )){
                System.out.println(conferenceService.findByName( (String)map.get("name")).getConferencePwd()+" "+(String)map.get("pass"));
                return new ResponseData("405","密码错误",null);
            }else{
                if(bindService.find(conferenceService.findByName( (String)map.get("name")).getId(),(Integer)map.get("user"))!=null){
                    return new ResponseData("400","请勿重复绑定",null);
                }else{
                    BindEntity bindEntity = new BindEntity();
                    bindEntity.setConferenceId(conferenceService.findByName( (String)map.get("name")).getId());
                    bindEntity.setUserId((Integer)map.get("user"));
                    bindEntity.setDeleteFlag(0);
                    bindService.save(bindEntity);
                    return new ResponseData("200","新增成功",null);
                }

            }
        }


    }







}
