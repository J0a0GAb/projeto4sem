package com.projeto.models.service.event;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;

import com.projeto.models.model.Usuario;

public class RegistrarUsuario extends ApplicationEvent {

	private static final long serialVersionUID = -4889830836627143022L;


	private final String url;
	private final Locale locale;
	private Usuario usuario;
	private String password;
	
	
	public RegistrarUsuario(String password, Usuario usuario,Locale locale, String url ) {
        
		super(usuario);
		this.url = url;
		this.locale = locale;
		this.usuario = usuario;
		this.password = password;
	    
	}


	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUrl() {
		return url;
	}


	public Locale getLocale() {
		return locale;
	}
	
	
	

}
