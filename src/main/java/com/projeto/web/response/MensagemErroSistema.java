package com.projeto.web.response;

import java.util.Date;
import java.util.List;

public class MensagemErroSistema {

	private Integer status;
	private Date data;
	private String mensagem;
	private String descricao;
	private boolean error;
	private List<Fields> fields;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public boolean isError() {
		return error;
	}

	public void setError(boolean error) {
		this.error = error;
	}

	public List<Fields> getFields() {
		return fields;
	}

	public void setFields(List<Fields> fields) {
		this.fields = fields;
	}
	
	public static Builder builder() {
		return new Builder();
	}
	
	
	public static class Builder {
		
		private MensagemErroSistema mensagem;

		public Builder() {
			this.mensagem = new MensagemErroSistema();
		}
		
	    	
		public Builder addStatus(int status) {
		    this.mensagem.status = status;	
			return this;
		}
		
		public Builder addData(Date data) {
			this.mensagem.data = data;
			return this;
		}
		
		public Builder addMensagem(String mensagem)  {
			this.mensagem.mensagem = mensagem;
			return this;
		}
	
		
        public Builder addDescricao(String descricao) {
        	this.mensagem.descricao = descricao;
        	return this;
        }
	
        public Builder addError(boolean error) {
        	this.mensagem.error = error;
        	return this;
        }
        
    
        public Builder addFields(List<Fields> fields) {
        	this.mensagem.fields = fields;
        	return this;
        }
      
        
        public MensagemErroSistema build() {
        	return this.mensagem;
        }
        
        
	}



}
