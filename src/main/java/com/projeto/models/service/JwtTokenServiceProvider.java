package com.projeto.models.service;

import java.util.Date;

import org.springframework.security.core.Authentication;

import com.projeto.models.model.Usuario;

public interface JwtTokenServiceProvider {

	public String createAccessToken(Usuario usuario);
	
	public String createRefreshToken(Usuario usuario);
	
	public boolean validateToken(String token);
	
	public Authentication getAuthentication(String token);
	
	public String getEmail(String token);
	
	public Date getDateExpiration(String token);
	
	public boolean isTokenValid(String token);
	
	
}
