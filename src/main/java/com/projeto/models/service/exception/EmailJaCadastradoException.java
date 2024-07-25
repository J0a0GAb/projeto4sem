package com.projeto.models.service.exception;

public class EmailJaCadastradoException extends NegocioException {

	private static final long serialVersionUID = -5119380553546921842L;

	public EmailJaCadastradoException(String message) {
		super(message);
	}

	public EmailJaCadastradoException(String message, Throwable cause) {
		super(message, cause);
	}

}
