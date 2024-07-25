package com.projeto.models.data;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description="Resposta do cadastro da imagem ")
public class FotoResponse {

	@Schema(description = "Id do usuário relacionada com a Imagem")
	private String  id;
	@Schema(description = "Nome do arquivo da imagem")
	private String nomeArquivo;
	@Schema(description = "Content type da imagem", example = "image/jpg")
	private String contentType;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNomeArquivo() {
		return nomeArquivo;
	}
	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}
	public String getContentType() {
		return contentType;
	}
	
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	@Override
	public String toString() {
		return "Foto [id=" + id + ", nomeArquivo=" + nomeArquivo + ", contentType="
				+ contentType + "]";
	}
	
	
	
	

}
