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

import java.util.Date;

import com.ibm.covid.deepqa.legal.Copyright;

@Copyright(Copyright.IBM_COPYRIGHT)
public class ErrorObj {

	  private Date timestamp;
	  private String message;
	  private String detailMessage;

	  public ErrorObj(Date timestamp, String message, String detailMessage) {
	    super();
	    this.timestamp = timestamp;
	    this.message = message;
	    this.detailMessage = detailMessage;
	  }

	  public Date getTimestamp() {
	    return timestamp;
	  }

	  public String getMessage() {
	    return message;
	  }

	  public String getDetailMessage() {
	    return detailMessage;
	  }	
}
