package com.ibm.covid.deepqa.legal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Copyright(Copyright.IBM_COPYRIGHT)
public @interface Copyright {

	public static final String IBM_COPYRIGHT = "\n\n(C) COPYRIGHT IBM Corp. 2016\nAll Rights Reserved\nLicensed Material - Property of IBM\nUS Government Users Restricted Rights - Use, duplication or\ndisclosure restricted by GSA ADP Schedule Contract with IBM Corp.\n\n";

	public abstract String value();

}
