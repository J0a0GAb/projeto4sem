package com.projeto.models.data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UsuarioRequest  {

    private Long    id;
	private String  username;
	private String  email;
	private String  password; 
	private String  confirmePassword;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotBlank(message = "Campo obrigatório ")
	@NotNull(message = "Campo obrigatório")
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@NotBlank
	@NotNull
	@Email
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
	@NotBlank
	@NotNull
    public String getPassword() {
		return password;
	}

   
	public void setPassword(String password) {
		this.password = password;
	}

	@NotBlank
	@NotNull
	public String getConfirmePassword() {
		return confirmePassword;
	}

	public void setConfirmePassword(String confirmePassword) {
		this.confirmePassword = confirmePassword;
	}

	@Override
	public String toString() {
		return "UsuarioRequest [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", confirmePassword=" + confirmePassword + "]";
	}

     
	
	
	
	
	

}
