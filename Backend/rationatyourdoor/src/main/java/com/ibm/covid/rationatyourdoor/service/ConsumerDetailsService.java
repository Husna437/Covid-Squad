package com.ibm.covid.rationatyourdoor.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ibm.covid.rationatyourdoor.data.ConsumerProfile;
@Component
public interface ConsumerDetailsService {

	public void createConsumerData(String state) throws Exception;
	public List<ConsumerProfile> getConsumerData() throws Exception;

}
