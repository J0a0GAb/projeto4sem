package com.projeto.models.service;

import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.model.Usuario;

import jakarta.servlet.http.HttpServletRequest;

public interface RegistrarUsuarioService {
	
	UsuarioResponse registrarUsuario(UsuarioRequest usuarioRequest, HttpServletRequest request);
	
	UsuarioResponse getUsuario(String verificationToken);
	
	void criarVerificacaoDoTokenParaUsuario(Usuario usuario, String token);

	UsuarioResponse liberarUsuario(String token);

}
