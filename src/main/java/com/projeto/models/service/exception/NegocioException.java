package com.projeto.models.service.exception;

public class NegocioException extends RuntimeException {

	private static final long serialVersionUID = -2088909988468609335L;

	public NegocioException(String message) {
		super(message);
	}

	public NegocioException(String message, Throwable cause) {
		super(message, cause);
		
	}

}
