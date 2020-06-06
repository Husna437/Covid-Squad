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
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ibm.covid.deepqa.legal.Copyright;

@ControllerAdvice
@RestController
@Copyright(Copyright.IBM_COPYRIGHT)
public class GenericResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	/*
	 * @ExceptionHandler void
	 * handleIllegalArgumentException(IllegalArgumentException e,
	 * HttpServletResponse response) throws IOException {
	 * response.sendError(HttpStatus.BAD_REQUEST.value(),
	 * HttpStatus.BAD_REQUEST.toString()); }
	 */
	//final String generalErrorMessage="An unexpected error occured.Unable to proceed with password reset.";
	//final String generalErrorMessage = "An error occurred while completing your requested action. Please try again or contact your Service Desk for further assistance.";

	private final MessageSource messageSource;

	@Autowired
	public GenericResponseEntityExceptionHandler(MessageSource messageSource) {
		this.messageSource = messageSource;
	}
	
	@ExceptionHandler()
	public final ResponseEntity<ErrorObj> handleIllegalArgumentException(IllegalArgumentException ex,
			WebRequest request) {
		// System.out.println("handleIllegalArgumentException....");
				String errorMsg = ex.getMessage();
				Pattern pattern = Pattern.compile("\"([a-zA-Z]+)\"");
				Matcher matcher = pattern.matcher(errorMsg);
				if (matcher.find()) {
					String arg = matcher.group(1);
					String[] args = new String[1];
					args[0] = arg;
					errorMsg = messageSource.getMessage("Exception.ILLEGALARGUMENT", args, request.getLocale());
					System.out.println("request.getLocale() :"+request.getLocale());
					System.out.println("args:"+args);
				}
				ErrorObj errorObj = new ErrorObj(new Date(), errorMsg, getDetailMessage(ex));
				// ErrorObj errorObj = new ErrorObj(new Date(), ex.getMessage(),
				// getDetailMessage(ex));
				// ErrorObj errorObj = new ErrorObj(new Date(), ex.getMessage(),
				// request.getDescription(false));
				return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
			
	}

	@ExceptionHandler()
	public final ResponseEntity<ErrorObj> handleServiceNotAvailable(ServiceNotAvailable ex,
			WebRequest request) {
		//System.out.println("handleGeneralException....");
		/*String errorMsg = messageSource.getMessage("Exception.INTERNALSERVERERROR", null, request.getLocale());
		ErrorObj errorObj = new ErrorObj(new Date(), errorMsg, getDetailMessage(ex));
		return new ResponseEntity<>(errorObj, HttpStatus.NOT_FOUND);*/
		
		ErrorObj errorObj = new ErrorObj(new Date(), ex.getMessage(), getDetailMessage(ex));
		return new ResponseEntity<>(errorObj, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler()
	public final ResponseEntity<ErrorObj> handleGeneralException(ConsumerDetailsApiException ex,
			WebRequest request) {
		//System.out.println("handleGeneralException....");
		String errorMsg = messageSource.getMessage("Exception.INTERNALSERVERERROR", null, request.getLocale());
		ErrorObj errorObj = new ErrorObj(new Date(), errorMsg, getDetailMessage(ex));
		return new ResponseEntity<>(errorObj, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	private String getDetailMessage(Exception ex)
	{
        //StringWriter sw = new StringWriter();
        //ex.printStackTrace(new PrintWriter(sw));
		String detailMessage = ex.getMessage().toString();
		return detailMessage;		
	}
}
