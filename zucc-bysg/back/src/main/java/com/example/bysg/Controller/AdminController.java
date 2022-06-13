package com.example.bysg.Controller;

import com.example.bysg.DTO.initDTO;
import com.example.bysg.DTO.initallDTO;
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

import java.util.List;
import java.util.Map;

@Transactional
@CrossOrigin
@RestController
@RequestMapping(value="/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @RequestMapping(value="/init",method = RequestMethod.GET)
    Response init(@RequestParam int id){

        initallDTO initDTO= adminService.init(id);
        return new ResponseData("200","查找成功", initDTO);
    }


    @RequestMapping(value="/login",method = RequestMethod.POST)
    Response adminController(@RequestBody Map<String, Object> map){

        AdminEntity adminEntity= adminService.findByAdminId((String) map.get("username"));
        if(adminEntity==null){
            return new ResponseData("405","账号或者密码错误",null);
        }
        else{
            if(adminEntity.getAdminPassword().equals(map.get("password").toString())){
                if(adminEntity.getState()==1){
                    return new ResponseData("400","账号被封禁", null);
                }
                return new ResponseData("200","登录成功", adminEntity);
            }else{
                return new ResponseData("400","请输入正确的密码",null);
            }
        }

    }

    @RequestMapping(value="/find",method = RequestMethod.GET)
    Response findAdmin(@RequestParam int id){

        AdminEntity adminEntity= adminService.findById(id);
        if(adminEntity==null){
            return new ResponseData("405","找不到用户",null);
        }
        else{
            return new ResponseData("200","查找成功", adminEntity);
        }

    }


    @RequestMapping(value="/findall",method = RequestMethod.GET)
    Response findAll(){

        List<AdminEntity> adminEntity= adminService.findall();
        return new ResponseData("200","查找成功", adminEntity);
    }



    @RequestMapping(value="/changePass",method = RequestMethod.POST)
    Response changePass(@RequestBody AdminEntity adminEntity){

        return new ResponseData("200","修改成功", adminService.changePass(adminEntity));

    }

    @RequestMapping(value="/create",method = RequestMethod.POST)
    Response create(@RequestBody AdminEntity adminEntity){
      if(adminEntity.getId()!=0){
          AdminEntity myAdminEntity= adminService.findByAdminId(adminEntity.getAdminId());
          if(myAdminEntity == null || myAdminEntity.getId()==adminEntity.getId()){
              adminService.changePass(adminEntity);
              return new ResponseData("200","操作成功",null);
          }
          else{
              return new ResponseData("400","账号已存在",null);
          }
      }else{
          AdminEntity myAdminEntity= adminService.findByAdminId(adminEntity.getAdminId());
          if(myAdminEntity == null ){
              adminService.changePass(adminEntity);
              return new ResponseData("200","操作成功",null);
          }
          else{
              return new ResponseData("400","账号已存在",null);
          }
      }


    }


    @RequestMapping(value="/delete",method = RequestMethod.GET)
    Response changePass(@RequestParam int id){
        adminService.delete(id);
        return new ResponseData("200","修改成功",null );

    }



}
