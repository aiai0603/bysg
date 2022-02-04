package com.example.bysg.Controller;

import com.example.bysg.DTO.HistoryDTO;
import com.example.bysg.Entity.HistoryEntity;
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


    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(@RequestParam int id){

        List<HistoryDTO> historyEntity= historyService.findall(id);
        return new ResponseData("200","查找成功", historyEntity);
    }






}






