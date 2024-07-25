package com.projeto.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.service.RegistrarUsuarioService;
import com.projeto.web.response.MensagemSistema;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value="/rest")
public class RegistrarUsuarioRestController {
	
	@Autowired
	private RegistrarUsuarioService registrarUsuarioService;
	
	@Autowired
	private MensagemSistema<UsuarioResponse> mensagem;

	@PostMapping(value="/registrar", consumes=MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> registrarUsuario(@RequestBody @Valid UsuarioRequest usuario,
			                                  HttpServletRequest request){
		
		var usuarioResponse = registrarUsuarioService.registrarUsuario(usuario, request);
		
		mensagem.showMensagem("Usuário Registrado com sucesso!, verifique seu e-mail", 
				               HttpStatus.OK.value(), 
				               usuarioResponse);
		
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}
	
     
	@GetMapping(value="/registrar/{token}", consumes=MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> liberarAcessoUsuario(@RequestParam("token") String token ){         
		
		var usuarioResponse = registrarUsuarioService.liberarUsuario(token);
		
		mensagem.showMensagem("Usuário Registrado com sucesso!, verifique seu e-mail", 
				               HttpStatus.OK.value(), 
				               usuarioResponse);
		
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

	 
	
}
