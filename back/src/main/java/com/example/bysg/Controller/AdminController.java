package com.example.bysg.Controller;

import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Service.AdminService;
import com.example.bysg.result.Response;
import com.example.bysg.result.ResponseData;
import com.example.bysg.util.jwt.JwtUtil;
import com.sun.net.httpserver.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.bysg.result.ExceptionMsg;

import java.util.Map;

@Transactional
@CrossOrigin
@RestController
@RequestMapping(value="/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @RequestMapping(value="/login",method = RequestMethod.POST)
    Response adminController(@RequestBody Map<String, Object> map){

        AdminEntity adminEntity= adminService.findById(map.get("username").toString());
        if(adminEntity==null){
            return new ResponseData("405","账号或者密码错误",null);
        }
        else{
            if(adminEntity.getAdminPassword().equals(map.get("password").toString())){
                if(adminEntity.getDeleteFlag()==1){
                    return new ResponseData("400","账号被封禁", null);
                }
                return new ResponseData("200","登录成功", adminEntity);
            }else{
                return new ResponseData("400","请输入正确的密码",null);
            }
        }

    }

    @RequestMapping(value="/find",method = RequestMethod.GET)
    Response findAdmin(@RequestParam String username){

        AdminEntity adminEntity= adminService.findById(username);
        if(adminEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else{

            return new ResponseData("200","查找成功", adminEntity);

        }

    }



}
