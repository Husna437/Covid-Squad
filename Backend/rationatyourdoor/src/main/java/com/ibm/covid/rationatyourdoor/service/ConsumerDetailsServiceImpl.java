package com.ibm.covid.rationatyourdoor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.covid.Application;
import com.ibm.covid.rationatyourdoor.data.ConsumerProfile;

@Component
public class ConsumerDetailsServiceImpl implements ConsumerDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);
	/*@Autowired
	private CloudantClient client;
	
	
	public ConsumerDetailsServiceImpl(CloudantClient client){
	
		this.client = client;
	}
	
@GetMapping("cloudant")
String cloudant(){
	List<String> list = new ArrayList<>();
	try{
	list  = client.getAllDbs();
	System.out.println("list of dbs: "+list);
	
	}catch(NullPointerException e){
		return "Server Error "+e.getMessage();
	}
	
	return "Cloudant is running list of databases: "+list.toString();
}*/

	

	@Override
	public void createConsumerData(String state) throws Exception {
		ConsumerProfile cp = new ConsumerProfile();
		String databaseName = "consumer_db";
		
		//if(client!=null){
		//client.createDB(databaseName);
		//Database store = client.database(databaseName, false);
		cp.setRationcardnumber("KA12345678");
		cp.setAddress(state);
		cp.setMobilenumber(1234567890);
		cp.setConsumername("Ramesh Kumar");
		cp.setSex('M');
		cp.setAge(35);
		cp.setCategory("AAY");
		
		//store.save(cp);
		
		System.out.println("consumer profile"+cp.toString());
		logger.info("consumer profile"+cp.toString());
	//	}
		
		
	}
	
	/*Please note the actual data will reside in the cloudant service from IBM.But currently 
	we could not integrate cloudant to springboot and that is why we 
	hardcoded the data to show the api flow and application workflow.*/
	
	@Override
	public List<ConsumerProfile> getConsumerData()  {
		ConsumerProfile cp = new ConsumerProfile();
		cp.setRationcardnumber("KA12345678");
		cp.setAddress("Karnataka");
		cp.setMobilenumber(1234567890);
		cp.setConsumername("Ramesh Kumar");
		cp.setSex('M');
		cp.setAge(35);
		cp.setCategory("AAY");
		cp.setDeliveryStatus("Delivered");
		cp.setPrice("Rs.35");
		cp.setRationamount("Rice 35Kg");
		
		ConsumerProfile cp1 = new ConsumerProfile();
		cp1.setRationcardnumber("KA99345678");
		cp1.setAddress("Karnataka");
		cp1.setMobilenumber(1234567890);
		cp1.setConsumername("Ravi Raju");
		cp1.setSex('M');
		cp1.setAge(45);
		cp1.setCategory("PHH");
		cp1.setDeliveryStatus("Delivered");
		cp1.setPrice("Rs.5");
		cp1.setRationamount("Rice 5Kg");

		
		
		List<ConsumerProfile> list = new ArrayList<>();
		list.add(cp);
		list.add(cp1);
		
		System.out.println("consumer profile"+cp.toString());
		logger.info("consumer profile"+cp.toString());
		System.out.println("consumer profile list"+list);
		logger.info("consumer profile list"+list);
		
		return list;
		/*try{
			
			
		} catch (ConsumerDetailsApiException|JSONException e) {
			e.printStackTrace();
			logger.error("Unable to reset password: " + e.getMessage());
			throw new ConsumerDetailsApiException("Unable to reset password: " + e.getMessage());
		}*/
		
	
	}

	
	
}