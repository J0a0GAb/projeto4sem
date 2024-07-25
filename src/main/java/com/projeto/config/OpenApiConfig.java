package com.projeto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI customOpenApi() {
		return new OpenAPI()
				.info(apiInfo());
		
		
	}
	
	private Info apiInfo() {
		return new Info()
				.title("Restful Api com java 18 e Spring Boot 3.1.2")
				.description("Apresentação dos Recursos oferecidos pela API")
				.termsOfService("http://ppwi4.bri.ifsp.edu.br")
				.license(
						new License()
						    .name("Apache 2.0")
						    .url("http://ppwi4.bri.ifsp.edu.br")
						);
	}
	

}
