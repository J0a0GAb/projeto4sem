package com.projeto.models.data;

public class UsuarioResponse {

	private Long    id;
	private String  username;
	private String  email;
	private String  password; 
	private String  confirmePassword;
	private String  foto;
	private String  contentType;
	private boolean ativo = false;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmePassword() {
		return confirmePassword;
	}

	public void setConfirmePassword(String confirmePassword) {
		this.confirmePassword = confirmePassword;
	}




	
	
	
	
	
	

}
