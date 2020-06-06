package com.ibm.covid.rationatyourdoor.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.trace.http.HttpTrace.Response;
import org.springframework.stereotype.Component;

import com.ibm.covid.rationatyourdoor.data.ConsumerProfile;
import com.ibm.covid.rationatyourdoor.service.ConsumerDetailsService;

@Component
public class ConsumerDetailsApiImpl implements ConsumerDetailsApiInterface {
	private static final Logger logger = LogManager.getLogger(ConsumerDetailsApiImpl.class);

	@Autowired
	private ConsumerDetailsService consumerDetailsService;
	
	@Override
	public List<ConsumerProfile> getData() throws IOException{
		List<ConsumerProfile> list = new ArrayList<>();
		try {
				 list = consumerDetailsService.getConsumerData();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		
		return list;
	}

	@Override
	public void createData(String state) throws IOException {
		try {
			consumerDetailsService.createConsumerData(state);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	
}