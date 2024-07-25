package com.projeto.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.config.ConfigProjeto;
import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.data.UsuarioRoleResponse;
import com.projeto.models.service.UsuarioService;
import com.projeto.web.response.MensagemSistema;
import com.projeto.web.swagger.UsuarioRestControllerApi;

@RestController
@RequestMapping(value="/rest/usuario")
public class UsuarioRestController implements UsuarioRestControllerApi{
    
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private MensagemSistema<UsuarioResponse> mensagem;
	
	@Autowired
	private MensagemSistema<UsuarioRoleResponse> mens;
	
	@Override
	@GetMapping(value="/listar", 
	     produces = { MediaType.APPLICATION_JSON_VALUE, 
	                  MediaType.APPLICATION_XML_VALUE})
	
	public List<UsuarioResponse> lista(){
		return usuarioService.list();
	}

	@Override
	@GetMapping(value="/listapaginada")
	public Page<UsuarioResponse> listaPaginada(  
			   @RequestParam(value="page", 
			                 defaultValue = ConfigProjeto.PAGE_NUMBER, 
			                 required = false) 
			                 Integer page,
			   @RequestParam(value="pageSize",
					   		 defaultValue = ConfigProjeto.PAGE_SIZE,
					   		 required = false) Integer pageSize,
			   @RequestParam(value="dir",
			                 defaultValue = ConfigProjeto.SORT,
			                 required = false) String  dir,
			   @RequestParam(value="props",
               				 defaultValue = ConfigProjeto.PROPS,
               				 required = false) String  props ) {
	
		
		return null;
	}

	@Override
	@GetMapping(value="/listaPaginadaPorNome")
	public ResponseEntity<?> listaPaginadaPorNome(String key, 
			@RequestParam(value="page", 
            		      defaultValue = ConfigProjeto.PAGE_NUMBER, 
                          required = false) 
                          Integer page,
            @RequestParam(value="pageSize",
	   		              defaultValue = ConfigProjeto.PAGE_SIZE,
	   		              required = false) 
	                      Integer pageSize,
            @RequestParam(value="dir",
                          defaultValue = ConfigProjeto.SORT,
                          required = false) 
	                      String  dir,
            @RequestParam(value="props",
			              defaultValue = ConfigProjeto.PROPS,
				          required = false) 
	                      String  props ) {
		
		var usuarioResponse = usuarioService.listPaginationWithKey(key, page, pageSize, dir, props);
		
		return ResponseEntity.status(HttpStatus.OK.value()).body(usuarioResponse);
	}

	@Override
	@GetMapping(value = "/buscar/{id}", 
		 	   produces = { MediaType.APPLICATION_JSON_VALUE, 
					        MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<?> buscarUsuarioPorId(@PathVariable("id") Long id) {
        var usuarioResponse = usuarioService.read(id); 
		mensagem.showMensagem("Usuário encontrado com sucesso!",
     	       HttpStatus.OK.value(),
     	       usuarioResponse);
		return ResponseEntity.ok().body(mensagem);
	}
	
	@Override
	@GetMapping(value = "/{id}/roles", 
		 	   produces = { MediaType.APPLICATION_JSON_VALUE, 
					        MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<?> buscarUsuarioRolePorId(@PathVariable("id") Long id) {
        var usuarioRoleResponse = usuarioService.findUsuarioRoleById(id);
		mens.showMensagem("Usuário encontrado com sucesso!",
     	       HttpStatus.OK.value(),
     	       usuarioRoleResponse);
		return ResponseEntity.ok().body(mensagem);
	}

	@Override
	@PostMapping(value="/salvar", 
			   consumes = { MediaType.APPLICATION_JSON_VALUE, 
		                    MediaType.APPLICATION_XML_VALUE }, 
		       produces = { MediaType.APPLICATION_JSON_VALUE, 
				            MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<?> salvarUsuario(@RequestBody UsuarioRequest usuario ) {
		var usuarioResponse = usuarioService.save(usuario);
		mensagem.showMensagem("Usuário cadastrado com sucesso!",
     	       HttpStatus.CREATED.value(),
     	       usuarioResponse);
		return ResponseEntity.status(HttpStatus.CREATED.value()).body(mensagem);
				
	}


	@Override
	@PutMapping(value="/alterar/{id}", 
			   consumes = { MediaType.APPLICATION_JSON_VALUE, 
		                    MediaType.APPLICATION_XML_VALUE }, 
		       produces = { MediaType.APPLICATION_JSON_VALUE, 
				            MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<?> alterarUsuario(@PathVariable("id") Long id, @RequestBody UsuarioRequest usuario) {
		var usuarioResponse = usuarioService.update(id, usuario);
		mensagem.showMensagem("Usuário alterado com sucesso!",
     	       HttpStatus.OK.value(),
     	       usuarioResponse);
		return ResponseEntity.status(HttpStatus.OK.value()).body(mensagem);
	}

	@Override
	@DeleteMapping(value="/excluir/{id}", 
			   consumes = { MediaType.APPLICATION_JSON_VALUE, 
		                    MediaType.APPLICATION_XML_VALUE }, 
		       produces = { MediaType.APPLICATION_JSON_VALUE, 
				            MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<?> excluirUsuario(@PathVariable("id") Long id) {
        usuarioService.delete(id);
		mensagem.showMensagem("Usuário excluído com sucesso!",
            	       HttpStatus.NO_CONTENT.value(),
            	       null);
     	return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).body(mensagem);
	}
	
	
}
