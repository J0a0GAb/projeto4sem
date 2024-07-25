package com.projeto.models.service.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projeto.models.model.Usuario;
import com.projeto.models.repository.UsuarioRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Optional<Usuario> usuario = usuarioRepository.findUsuarioByEmail(email);
		
		if (!usuario.isPresent()) {
			throw new UsernameNotFoundException("Usuario não cadastrado! "+email);
		}
		
		Usuario usuarioLogado = usuario.get();
		
		usuarioLogado.getAuthorities();
		
		return usuarioLogado;
	}

}
