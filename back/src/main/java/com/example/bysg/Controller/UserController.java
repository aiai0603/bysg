package com.example.bysg.Controller;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.UserEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.Service.UserService;
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
@RequestMapping(value="/user")
public class UserController {
    @Autowired
    UserService userService;


    @RequestMapping(value="/find",method = RequestMethod.GET)
    Response findAdmin(@RequestParam int id){

        UserEntity userEntity = userService.findById(id);
        if(userEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else{
            return new ResponseData("200","查找成功", userEntity);
        }

    }


    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(){

        List<UserEntity> userEntity= userService.findall();
        return new ResponseData("200","查找成功", userEntity);
    }


    @RequestMapping(value="/change",method = RequestMethod.POST)
    Response create(@RequestBody UserEntity userEntity){

              userService.save(userEntity);
              return new ResponseData("200","操作成功",null);

      }



    }






