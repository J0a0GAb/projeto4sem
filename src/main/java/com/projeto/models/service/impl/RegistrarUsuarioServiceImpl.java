package com.projeto.models.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.model.Role;
import com.projeto.models.model.Usuario;
import com.projeto.models.repository.RegistrarUsuarioRepository;
import com.projeto.models.repository.UsuarioRepository;
import com.projeto.models.service.JwtTokenServiceProvider;
import com.projeto.models.service.RegistrarUsuarioService;
import com.projeto.models.service.components.CriptografarSenha;
import com.projeto.models.service.email.CriarEmail;
import com.projeto.models.service.event.RegistrarUsuario;
import com.projeto.models.service.exception.EmailJaCadastradoException;
import com.projeto.models.service.mapper.ConverterEntity;

import jakarta.servlet.http.HttpServletRequest;

@Service
@Transactional
public class RegistrarUsuarioServiceImpl implements RegistrarUsuarioService{

	@Autowired
	private ConverterEntity converter;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private CriptografarSenha crypt;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher; 
	
	@Autowired
	private RegistrarUsuarioRepository registrarUsuarioRepository;
	
	@Autowired
	private CriarEmail criarEmail;
	
	@Autowired
	private JwtTokenServiceProvider jwtTokenServiceProvider;
	
	@Override
	public UsuarioResponse registrarUsuario(UsuarioRequest usuarioRequest, HttpServletRequest request) {
		
		var usuario = converter.parseObject(usuarioRequest, Usuario.class); 
		
	    if (emailExiste(usuario.getEmail())) {
            throw new EmailJaCadastradoException("E-mail já Cadastrado!");	    	
	    }
		
	    Role role = new Role();
	    role.setId(3L);
	    role.setNome("Usuario");
	    usuario.getRoles().add(role);

	    usuario.setAtivo(false);
	    
	    usuario.setPassword(crypt.passwordEncoder().encode(usuario.getPassword()));
	    
		usuario = registrarUsuarioRepository.saveAndFlush(usuario);
		
		eventPublisher.publishEvent(
				new RegistrarUsuario(usuario.getPassword(),
						             usuario,
						             request.getLocale(),
						             criarEmail.getAppUrl()));
	    
		return converter.parseObject(usuario, UsuarioResponse.class);
	}

	private boolean emailExiste(String email) {
		Optional<Usuario> usuario = usuarioRepository.findUsuarioByEmail(email);
		return usuario.isPresent() ? true : false;
	}

	@Override
	public UsuarioResponse getUsuario(String verificationToken) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void criarVerificacaoDoTokenParaUsuario(Usuario usuario, String token) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public UsuarioResponse liberarUsuario(String token) {
		
		if (!jwtTokenServiceProvider.isTokenValid(token)) {
			
		}
		
		String email = jwtTokenServiceProvider.getEmail(token);
		
		Usuario usuario = usuarioRepository.findUsuarioByEmail(email).get();
		
		var usuarioResponse = converter.parseObject(usuario, UsuarioResponse.class);
		
		System.out.println("Acesso liberado");
		
		return usuarioResponse;
	}

}
