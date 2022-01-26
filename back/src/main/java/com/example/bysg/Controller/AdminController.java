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
        System.out.println(map);
        AdminEntity adminEntity= adminService.findById(map.get("username").toString());
        if(adminEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else{
            if(adminEntity.getAdminPassword().equals(map.get("password").toString())){
                return new ResponseData("200","登录成功", adminEntity);
            }else{
                return new ResponseData("400","登录失败，请确认账号密码正确",null);
            }
        }

    }



}
