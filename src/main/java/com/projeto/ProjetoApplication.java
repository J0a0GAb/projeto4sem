package com.projeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.projeto.models.model.Usuario;
import com.projeto.models.repository.UsuarioRepository;


@SpringBootApplication
public class ProjetoApplication implements ApplicationRunner{
    
	@Autowired
	private UsuarioRepository repository;
	
	public static void main(String[] args) {
		SpringApplication.run(ProjetoApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		
//		Usuario user = new Usuario();
//		
//		user.setAtivo(true);
//		user.setEmail("cocao@cocao.com.br");
//		user.setPassword("$2a$12$JNypkjjLWNQBhetZ26K2auLzBuyT.sapkv3pQTJhCPB8TIT4XsnRa");
//		user.setUsername("cocao");
//		
//		repository.save(user);
		
	}

	

}
