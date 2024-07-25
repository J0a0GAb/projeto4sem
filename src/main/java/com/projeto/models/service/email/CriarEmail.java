package com.projeto.models.service.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.projeto.config.ConfigProjeto;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.service.EmailService;

@Component
public class CriarEmail {
	
	@Autowired
	private EmailService emailService;
	
	
	public void criarEmail(String subject, String body, UsuarioResponse usuario) {
		emailService.sendSimpleMessage(usuario.getEmail(), subject, body, ConfigProjeto.EMAIL_ENVIO );
	}


	public String getAppUrl() {
		return "http://localhost:8080";
	}

}
