package com.projeto.models.service;

import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;
import com.projeto.models.data.UsuarioRoleResponse;


public interface UsuarioService extends GenericService<UsuarioResponse,UsuarioRequest,Long> {

	public UsuarioRoleResponse findUsuarioRoleById(Long id);
}
