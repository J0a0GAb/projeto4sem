package com.projeto.models.service.event;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.projeto.config.ConfigProjeto;
import com.projeto.models.model.Usuario;
import com.projeto.models.repository.UsuarioRepository;
import com.projeto.models.service.EmailService;
import com.projeto.models.service.JwtTokenServiceProvider;

@Component
public class RegistrarUsuarioListerner implements ApplicationListener<RegistrarUsuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private JwtTokenServiceProvider jwtTokenServiceProvider;
	
	@Autowired
	private EmailService emailService;
	
	@Override
	public void onApplicationEvent(RegistrarUsuario registrarUsuario) {
	    confirmarRegistroDoUsuario(registrarUsuario);	
	}

	private void confirmarRegistroDoUsuario(RegistrarUsuario registrarUsuario) {
		
		final Usuario usuario = usuarioRepository.findById(registrarUsuario.getUsuario().getId()).get(); 
        final String token = jwtTokenServiceProvider.createAccessToken(usuario);
        final String password = registrarUsuario.getPassword();
        criarEmailMensagem(registrarUsuario, usuario, token, password);
		
	}
	
	
	private void criarEmailMensagem(RegistrarUsuario event, Usuario usuario, String token, String password) {
		
		String recipientAddress = usuario.getEmail();
		String subject = "Confirmar o Registro no sistema "+usuario.getUsername();
		String url = event.getUrl()+ "/rest/registro?token="+token;
		String message = "Confirme o seu registro no sistema "+event.getLocale()+" "+
		  " "+"seu código de ocnfirmação do registro é "+token+" e a sua senha de acesso n sistema é "+password;
        String text = message + "\r\n "+url;
        emailService.sendSimpleMessage(recipientAddress, subject, text, ConfigProjeto.EMAIL_ENVIO);
		
		
		
	}

}
