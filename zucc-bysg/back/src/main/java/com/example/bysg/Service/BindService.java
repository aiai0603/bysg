package com.example.bysg.Service;

import com.alibaba.druid.sql.visitor.functions.Bin;
import com.example.bysg.DTO.initallDTO;
import com.example.bysg.Entity.AdminEntity;
import com.example.bysg.Entity.BindEntity;

import java.util.List;

public interface BindService {

    void save(BindEntity bindEntity);

    BindEntity find(int cid,int uid);

    void delete(int id,int uid);

}
