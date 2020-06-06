package com.ibm.covid.rationatyourdoor.api;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.ibm.covid.rationatyourdoor.data.ConsumerProfile;

@Component
public interface ConsumerDetailsApiInterface {
	
	public void createData(@RequestBody String state) throws IOException;
	
	public List<ConsumerProfile> getData() throws IOException;
	
	
	
	
	
	
	
}
