package com.projeto.models.data;

import jakarta.validation.constraints.NotNull;

public class TokenRefreshRequest {
		
	private String access_token;
	private String refresh_token;
	
	@NotNull(message = "Access token não pode ser nulo")
	public String getAccess_token() {
		return access_token;
	}
	
	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}
	
	@NotNull(message = "Refresh token não pode ser nulo")
	public String getRefresh_token() {
		return refresh_token;
	}
	
	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}
	
	
	

}
