package com.projeto.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper model = new ModelMapper();
		return model;
	}
	
}
