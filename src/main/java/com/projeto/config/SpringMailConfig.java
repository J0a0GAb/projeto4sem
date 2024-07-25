package com.projeto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class SpringMailConfig {

	@Bean
	public JavaMailSender mailSender() {
		
		JavaMailSenderImpl emailSender = new JavaMailSenderImpl();
		emailSender.setHost("127.0.0.1");
		emailSender.setPort(1025);
       
		return emailSender;
		
	}
	
}
