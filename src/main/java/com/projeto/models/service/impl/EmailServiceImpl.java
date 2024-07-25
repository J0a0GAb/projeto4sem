package com.projeto.models.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.projeto.models.service.EmailService;
import com.projeto.models.service.exception.NegocioException;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender emailSender;
	
	@Override
	public void sendSimpleMessage(String to, String subject, String text, String from) {
		
		try {
			
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject(subject);
			message.setText(text);
			message.setFrom(from);
			emailSender.send(message);
			
		}catch(MailException ex) {
			throw new NegocioException("Servidor de E-mail não está disponível ");
		}
		

	}

	@Override
	public void sendSimpleMessageUsingTemplate(String to, String subject, SimpleMailMessage template,
			String... templateArgs) {
		// TODO Auto-generated method stub

	}

	@Override
	public void sendMessagemWithAttachment(String to, String subject, String text, String pathToAttachment) {
		// TODO Auto-generated method stub

	}

}
