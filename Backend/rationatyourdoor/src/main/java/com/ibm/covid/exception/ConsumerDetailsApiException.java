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
public class ConsumerDetailsApiException extends RuntimeException{
	
	public ConsumerDetailsApiException(final String message) {
		super(message);
	}

	public ConsumerDetailsApiException(final Throwable cause) {
		super(cause);
	}

	public ConsumerDetailsApiException(String message, Throwable cause) {
		super(message, cause);
	}
}