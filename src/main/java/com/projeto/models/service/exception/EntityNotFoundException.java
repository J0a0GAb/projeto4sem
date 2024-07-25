package com.projeto.models.service.exception;

public class EntityNotFoundException extends NegocioException {

	private static final long serialVersionUID = -427130034889307218L;

	public EntityNotFoundException(String message) {
		super(message);
	}

	public EntityNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
