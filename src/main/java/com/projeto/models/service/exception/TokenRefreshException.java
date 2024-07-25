package com.projeto.models.service.exception;

public class TokenRefreshException extends NegocioException {


	private static final long serialVersionUID = -340673785673634840L;

	public TokenRefreshException(String message) {
		super(message);
	}
	
	public TokenRefreshException(String token, String message) {
		super(String.format("Falha no token [%s]:  %s", token, message ));
	}

}
