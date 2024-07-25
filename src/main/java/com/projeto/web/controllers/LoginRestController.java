package com.projeto.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.data.LoginRequest;
import com.projeto.models.data.LoginResponse;
import com.projeto.models.data.TokenRefreshRequest;
import com.projeto.models.service.LoginService;
import com.projeto.web.response.MensagemSistema;
import com.projeto.web.swagger.LoginRestControllerApi;


@RestController
@RequestMapping(value="/rest", produces = MediaType.APPLICATION_JSON_VALUE )
public class LoginRestController implements LoginRestControllerApi {

	@Autowired
	private LoginService loginService;
	
    @Autowired	
	private MensagemSistema<LoginResponse> mensagem;
	
	
	@Override
	@PostMapping(value="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        var loginResponse = loginService.login(login); 
        mensagem.showMensagem(null,HttpStatus.OK.value(), loginResponse);
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

	@Override
	@PostMapping(value="/refreshtoken")
	public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
		var loginResponse = loginService.refreshToken(request.getRefresh_token());
		mensagem.showMensagem(null, HttpStatus.OK.value(), loginResponse);
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

	@Override
	@PostMapping(value="/logout")
	public ResponseEntity<?> logout(@RequestBody TokenRefreshRequest request) {
		
		System.out.println("passando pelo logout ");
		
		loginService.logout(request.getAccess_token());
		mensagem.showMensagem("Logout Efetuado!", HttpStatus.NO_CONTENT.value(),null);
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

	@Override
	@PostMapping(value="/validartoken")
	public ResponseEntity<?> validarToken(@RequestBody TokenRefreshRequest request) {
		var loginResponse = loginService.validarToken(request.getAccess_token(), request.getRefresh_token());
		mensagem.showMensagem(null, HttpStatus.OK.value(), loginResponse);
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

}
