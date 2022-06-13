package com.example.bysg.Controller;

import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.DTO.nowDTO;
import com.example.bysg.Entity.ConferenceEntity;
import com.example.bysg.Entity.HistoryEntity;
import com.example.bysg.Service.ConferenceService;
import com.example.bysg.Service.EquipemntService;
import com.example.bysg.Service.HistoryService;
import com.example.bysg.result.Response;
import com.example.bysg.result.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Transactional
@CrossOrigin
@RestController
@RequestMapping(value="/history")
public class HistoryController {
    @Autowired
    HistoryService historyService;

    @Autowired
    EquipemntService equipemntService;

    @Autowired
    ConferenceService conferenceService;


    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(@RequestParam int id){

        List<HistoryDTO> historyEntity= historyService.findall(id);
        return new ResponseData("200","查找成功", historyEntity);
    }

    @RequestMapping(value="/create",method = RequestMethod.POST)
    Response create(@RequestBody HistoryEntity historyEntity){

        if(historyService.findnow(historyEntity.getRoomId())!=null){
            return new ResponseData("400","会议已经开始", null);
        }else{
            historyEntity.setCreateTime(new java.sql.Timestamp(System.currentTimeMillis() ));
            return new ResponseData("200","开始会议", historyService.save(historyEntity));
        }

    }

    @RequestMapping(value="/findbyid",method = RequestMethod.GET)
    Response findbyid(@RequestParam int id){

        List<HistoryEntity> historyEntity= historyService.findbyid(id);
        return new ResponseData("200","查找成功", historyEntity);
    }


    @RequestMapping(value="/finish",method = RequestMethod.GET)
    Response finish(@RequestParam int id){

        if(historyService.findnow2(id)==null)
            return new ResponseData("400","已经结束", null);

        historyService.delete(new java.sql.Timestamp(System.currentTimeMillis() ),id);
        return new ResponseData("200","关闭成功", null);
    }


    @RequestMapping(value="/findnow",method = RequestMethod.GET)
    Response findnow(@RequestParam int id){

        HistoryEntity historyEntity = historyService.findnow(id);


        nowDTO now = new nowDTO();
        if(historyEntity==null){
            now.setId(0);
            now.setFlag(0);
            now.setName("");
        }else{
            now.setId(historyEntity.getId());
            now.setFlag(1);
            now.setName(historyEntity.getName());
        }
        now.setNum(equipemntService.findallByid(id).size());
        now.setSum(conferenceService.findById(id).getNum());

        return new ResponseData("200","查找成功", now);
    }



}






