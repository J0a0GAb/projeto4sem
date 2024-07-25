package com.projeto.models.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.projeto.models.data.LoginRequest;
import com.projeto.models.data.LoginResponse;
import com.projeto.models.model.RefreshToken;
import com.projeto.models.model.Usuario;
import com.projeto.models.repository.UsuarioRepository;
import com.projeto.models.service.JwtTokenServiceProvider;
import com.projeto.models.service.LoginService;
import com.projeto.models.service.RefreshTokenService;
import com.projeto.models.service.exception.TokenRefreshException;
import com.projeto.models.service.mapper.ConverterEntity;

@Service
public class LoginServiceImpl implements LoginService {
    
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private ConverterEntity converter;
	
	@Autowired
	private JwtTokenServiceProvider jwtTokenServiceProvider;
	
	@Autowired
	private RefreshTokenService refreshTokenService;

	@Override
	public LoginResponse login(LoginRequest login) {
		
		String accessToken = null;
		String refreshToken = null;
		
		Optional<Usuario> usuarioCadastrado = usuarioRepository.findUsuarioByEmail(login.getEmail()); 
		
		if (!usuarioCadastrado.isPresent()) {
			throw new UsernameNotFoundException("E-mail informado não está cadastrado "+login.getEmail());
		}
		
		Usuario usuario = usuarioCadastrado.get();
		
		if (login.getEmail().equals(usuario.getEmail()) &&
			usuario.isAtivo()== false) {
			throw new LockedException("Usuário bloqueado no sistema!!");
		}
		
        if (login.getEmail().equals(usuario.getEmail())&&
        	BCrypt.checkpw(login.getPassword(), usuario.getPassword())) {
            	new UsernamePasswordAuthenticationToken(usuario, usuario.getPassword(), usuario.getAuthorities());	
        }else {
        	throw new BadCredentialsException("A senha informada não é válida!!");
        }
		
	    var loginResponse = converter.parseObject(usuario, LoginResponse.class);
	    
	    accessToken = jwtTokenServiceProvider.createAccessToken(usuario);
	    
	    refreshToken = jwtTokenServiceProvider.createRefreshToken(usuario);
	    
	    loginResponse.setAccess_token(accessToken);
	    
		loginResponse.setRefresh_token(refreshToken);
		
		refreshTokenService.createRefreshToken(usuario, refreshToken);
	    
		return loginResponse;
	}

	@Override
	public LoginResponse refreshToken(String token) {
		
		RefreshToken newRefreshToken = refreshTokenService.refreshToken(token);
		
		var loginResponse = converter.parseObject(newRefreshToken.getUsuario(), LoginResponse.class);
	
		loginResponse.setRefresh_token(newRefreshToken.getToken());
		
		loginResponse.setAccess_token(jwtTokenServiceProvider.createAccessToken(newRefreshToken.getUsuario()));
		
		return loginResponse;
	}

	@Override
	public void logout(String access_token) {
		
		String email = jwtTokenServiceProvider.getEmail(access_token);
		
		var usuario = usuarioRepository.findUsuarioByEmail(email);
		
		refreshTokenService.setTokenBloqueado(usuario.get().getId());

	}

	@Override
	public LoginResponse validarToken(String access_token, String refresh_token) {
		
		if (!jwtTokenServiceProvider.isTokenValid(access_token)) {
			throw new TokenRefreshException(access_token, "Token inválido ou expirado!");
		}
		
		if (!jwtTokenServiceProvider.isTokenValid(refresh_token)) {
			throw new TokenRefreshException(refresh_token, "Token inválido ou expirado!");
		}
				
		String email = jwtTokenServiceProvider.getEmail(access_token);
		
		var usuario = usuarioRepository.findUsuarioByEmail(email);
		
		var loginResponse = converter.parseObject(usuario.get(), LoginResponse.class);
	
		loginResponse.setAccess_token(access_token);
		
		loginResponse.setRefresh_token(refresh_token);
		
		return loginResponse;
	}

}
