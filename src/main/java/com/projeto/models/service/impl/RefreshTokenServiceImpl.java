package com.projeto.models.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.models.model.RefreshToken;
import com.projeto.models.model.Usuario;
import com.projeto.models.repository.RefreshTokenRepository;
import com.projeto.models.repository.UsuarioRepository;
import com.projeto.models.service.JwtTokenServiceProvider;
import com.projeto.models.service.RefreshTokenService;
import com.projeto.models.service.exception.TokenRefreshException;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	@Autowired
	private JwtTokenServiceProvider jwtTokenServiceProvider;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@Override
	public RefreshToken findByToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RefreshToken createRefreshToken(Usuario usuario, String token) {
		
		RefreshToken refresh = new RefreshToken();
		refresh.setUsuario(usuario);
		refresh.setToken(token);
		refresh.setExpirado(false);
		refresh.setBloqueado(false);
		
		refresh = refreshTokenRepository.saveAndFlush(refresh);
		
		return refresh;
	}

	@Override
	public RefreshToken refreshToken(String refreshToken) {
	
		if (!jwtTokenServiceProvider.isTokenValid(refreshToken)) {
			throw new TokenRefreshException(refreshToken, "Token inválido ou expirado!");
		}
		
		String email = jwtTokenServiceProvider.getEmail(refreshToken);
		
		var usuario = usuarioRepository.findUsuarioByEmail(email);
		
		bloquearTodosTokensDeUsuario(usuario.get().getId());
		
		RefreshToken token = new RefreshToken();
		
		token.setBloqueado(false);
		token.setExpirado(false);
		
		token.setUsuario(usuario.get());
		token.setToken(jwtTokenServiceProvider.createAccessToken(usuario.get()));
		
		refreshTokenRepository.saveAndFlush(token);
				
		return token;
	}

	@Override
	public void deleteTokenByUserId(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setTokenBloqueado(Long id) {
		bloquearTodosTokensDeUsuario(id);
	}

	@Override
	public RefreshToken findTokenByUserId(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	private void bloquearTodosTokensDeUsuario(Long id) {
		
		var tokensValidos = refreshTokenRepository.findAllTokenByUsuario(id);
		
		if ( tokensValidos.isEmpty()) {
			return;
		}
		
		tokensValidos.forEach(token->{
			token.setBloqueado(true);
			token.setExpirado(true);
		});
		
		refreshTokenRepository.saveAllAndFlush(tokensValidos);
		
		return;
		
	}
	
	
	
	
	

}
