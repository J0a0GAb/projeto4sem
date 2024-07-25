package com.projeto.models.service;

import com.projeto.models.model.RefreshToken;
import com.projeto.models.model.Usuario;

public interface RefreshTokenService {
	
	public RefreshToken findByToken(String token);
	
	public RefreshToken createRefreshToken(Usuario usuario, String token);
	
	public RefreshToken refreshToken(String refreshToken);
	
	public void deleteTokenByUserId(Long id);
	
	public void setTokenBloqueado(Long id);
	
	public RefreshToken findTokenByUserId(Long id);

}
