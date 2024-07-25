package com.projeto.models.service;

import java.io.InputStream;

import com.projeto.models.data.FotoRequest;
import com.projeto.models.data.FotoResponse;

public interface LocalFotoStorageService {
	
	public FotoResponse armazenar(FotoRequest foto);
	public FotoResponse excluirFoto(FotoRequest foto);
	public boolean remover(String foto);
	public InputStream recuperar(String nomeArquivo);
	public byte[] recuperarFoto(String nomeArquivo);

}
