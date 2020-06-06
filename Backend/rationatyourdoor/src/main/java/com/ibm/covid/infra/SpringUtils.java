package com.ibm.covid.infra;

import java.util.Locale;

import org.springframework.context.i18n.LocaleContextHolder;

public class SpringUtils {
	

		public static Locale getLocale()
		{
			return LocaleContextHolder.getLocale();
		}
	}
