/* ***************************************************************** */
package com.ibm.covid.infra;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.ibm.covid.deepqa.legal.Copyright;

/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2016                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

@Copyright(Copyright.IBM_COPYRIGHT)
@Component
public final class EnvironmentProperties {

	@Autowired
	private Environment env;

	public static Environment environment;

	@PostConstruct
	public void init() {
		environment = env;
		System.out.println(environment == env);
	}
}
