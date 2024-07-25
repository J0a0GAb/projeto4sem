package com.projeto.models.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConverterEntity {

	@Autowired
	private ModelMapper mapper;
	
	public <O, D> D parseObject(O origem, Class<D> destino) {
	   return mapper.map(origem, destino);	
	}
	
	
	public <O, D> List<D> parseListObjects(List<O> origem, Class<D> destino){
		List<D> destinoObjetos = new ArrayList<D>();
		for (O o:origem) {
			destinoObjetos.add(mapper.map(o, destino));
		}
		return destinoObjetos;
	}
	
}
