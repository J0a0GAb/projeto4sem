package com.projeto.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.data.FotoRequest;
import com.projeto.models.data.FotoResponse;
import com.projeto.models.service.LocalFotoStorageService;
import com.projeto.web.response.MensagemSistema;
import com.projeto.web.swagger.FotoRestControllerApi;

@RestController
@RequestMapping(value="/rest/foto")
public class FotoRestController implements FotoRestControllerApi {

	@Autowired
	private LocalFotoStorageService localFotoStorageService;
	
	@Autowired
	private MensagemSistema<FotoResponse> mensagem;
	
	@Override
	@PostMapping(value="/salvar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
							produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> uploadFoto(FotoRequest fotoRequest) {
		var fotoResponse = localFotoStorageService.armazenar(fotoRequest);
		mensagem.showMensagem("Foto Gravada com sucesso", HttpStatus.CREATED.value(), fotoResponse);
		return ResponseEntity.status(HttpStatus.CREATED.value()).body(mensagem);
	}

	@Override
	@DeleteMapping(value="/excluir", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
									 produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> excuirFoto(FotoRequest fotoRequest) {
		var fotoResponse = localFotoStorageService.excluirFoto(fotoRequest);
		mensagem.showMensagem("Foto Excluída com sucesso!", HttpStatus.NO_CONTENT.value(), fotoResponse);
		return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).body(mensagem);
	}
	
	@Override
	@GetMapping("/{nomeFoto:.+}")
	public byte[] recuperarFoto(@PathVariable String nomeFoto) {
		System.out.println(nomeFoto);
		return localFotoStorageService.recuperarFoto(nomeFoto);
	}

}
