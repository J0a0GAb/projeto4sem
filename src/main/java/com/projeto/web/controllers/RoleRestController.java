package com.projeto.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.model.Role;
import com.projeto.models.service.RoleService;
import com.projeto.web.response.MensagemSistema;
import com.projeto.web.swagger.RoleRestControllerApi;

@RestController
@RequestMapping(value="/rest/role")
public class RoleRestController implements RoleRestControllerApi{
    
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private MensagemSistema<Role> mensagem;
	
	@Override
	@GetMapping(value="/listar")
	public List<Role> lista(){
		return roleService.list();
	}

	@Override
	public Page<Role> listaPaginada() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Role> listaPaginadaPorNome(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@GetMapping("/buscar/{id}")
	public ResponseEntity<?> buscarRolePorId(@PathVariable("id") Long id) {
        Role role = roleService.read(id); 
        mensagem.showMensagem("Papel encontrado com sucesso!",
        		    HttpStatus.OK.value(),
        		    role);
   	return ResponseEntity.ok().body(mensagem);
	}

	

	@Override
	@PostMapping(value="/salvar")
	public ResponseEntity<?> salvarRole(@RequestBody Role role) {
		roleService.save(role);
		mensagem.showMensagem("Papel cadastrado com sucesso!",
    		    HttpStatus.OK.value(),
    		    role);
		return ResponseEntity.ok().body(mensagem);
				
	}

	@Override
	@PutMapping(value="/alterar/{id}")
	public ResponseEntity<?> alterarRole(@PathVariable("id") Long id, @RequestBody Role role) {
		Role roleCadastrado = roleService.update(id, role);
		mensagem.showMensagem("Papel alterado com sucesso!",
    		    HttpStatus.OK.value(),
    		    roleCadastrado);
		return ResponseEntity.ok().body(mensagem);
	}

	@Override
	@DeleteMapping(value="/excluir/{id}")
	public ResponseEntity<?> excluirRole(@PathVariable("id") Long id) {
        roleService.delete(id);
        mensagem.showMensagem("Papel excluído com sucesso!",
    		    HttpStatus.OK.value(),null);
		return ResponseEntity.ok().body(mensagem);
	}
	

	
}
