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
package com.ibm.covid.exception;

import com.ibm.covid.deepqa.legal.Copyright;

@Copyright(Copyright.IBM_COPYRIGHT)
public class ServiceNotAvailable extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3354538771246625005L;

	public ServiceNotAvailable(String message)
	{
		super(message);
	}
}
