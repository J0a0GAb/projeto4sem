package com.projeto.web.response;

import org.springframework.stereotype.Component;

@Component
public class MensagemSistema<T> {

	private Integer status;
	private String mensagem;
	private T objeto;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

	public T getObjeto() {
		return objeto;
	}

	public void setObjeto(T objeto) {
		this.objeto = objeto;
	}
	
	
	public MensagemSistema<T> showMensagem(
			String mensagem,
			Integer status,
			T objeto
			){
		
		this.setMensagem(mensagem);
		this.setObjeto(objeto);
		this.setStatus(status);
		
		return this;
	}
	

}
