package com.projeto.models.service;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

	void sendSimpleMessage(String to, String subject, String text, String from);
	
	void sendSimpleMessageUsingTemplate(String to, String subject, SimpleMailMessage template, String... templateArgs);

    void sendMessagemWithAttachment(String to, String subject, String text, String pathToAttachment);
    
}
