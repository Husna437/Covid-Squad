package com.ibm.covid.rationatyourdoor.api;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.covid.rationatyourdoor.data.ConsumerProfile;

@RestController

@RequestMapping("/rationatyourdoor")
public class ConsumerDetailsApi {
	
 @Autowired
 private ConsumerDetailsApiInterface consumerApi;
 
 @RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json")
	public void createData(@RequestBody String state)throws IOException {
	 consumerApi.createData(state);
		System.out.println("entry created in consumer db");
	}
 
 @RequestMapping(value = "/get", method = RequestMethod.GET, produces = "application/json")
	public List<ConsumerProfile> getData()throws IOException {
		return consumerApi.getData();
	}
 

	

}