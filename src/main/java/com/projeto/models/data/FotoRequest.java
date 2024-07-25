package com.projeto.models.data;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description="Resposta do cadastro da imagem ")
public class FotoRequest {

	@Schema(description = "Id do usuário relacionada com a Imagem")
	private String id;
	@Schema(description = "Nome do arquivo da imagem")
	private String nomeArquivo;
	@Schema(description = "Content type da imagem", example = "image/jpg")
	private String contentType;
	@Schema(description = "Arquivo binário da foto ", example = "image/jpg")
	private MultipartFile foto;
	
	
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
	public MultipartFile getFoto() {
		return foto;
	}
	public void setFoto(MultipartFile foto) {
		this.foto = foto;
	}
	@Override
	public String toString() {
		return "FotoRequest [id=" + id + ", nomeArquivo=" + nomeArquivo + ", contentType=" + contentType + ", foto="
				+ foto + "]";
	}
	
	
	
	
	

}
