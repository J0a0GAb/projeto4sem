package com.projeto.models.service.exception;

public class PasswordDiferenteConfirmePasswordException extends NegocioException {


	private static final long serialVersionUID = -1857186800858437932L;

	public PasswordDiferenteConfirmePasswordException(String message) {
		super(message);
	}

	public PasswordDiferenteConfirmePasswordException(String message, Throwable cause) {
		super(message, cause);
	}

}
