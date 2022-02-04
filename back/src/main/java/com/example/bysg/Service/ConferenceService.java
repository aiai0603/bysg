package com.example.bysg.Service;

import com.example.bysg.Entity.ConferenceEntity;

import java.util.List;

public interface ConferenceService {
    ConferenceEntity findById(int id);

    ConferenceEntity findByName(String name);

    ConferenceEntity save(ConferenceEntity conferenceEntity);

    List<ConferenceEntity> findall(int id);

    void delete(int id);

}
