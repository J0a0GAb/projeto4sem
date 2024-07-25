package com.projeto.models.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.models.model.Role;
import com.projeto.models.repository.RoleRepository;
import com.projeto.models.service.RoleService;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public Role save(Role entity) {
		return roleRepository.save(entity);
	}

	@Override
	public Role update(Long id, Role entity) {
	    Role roleCadastrada = this.read(id);
	    roleCadastrada.setNome(entity.getNome());
		return roleRepository.save(roleCadastrada);
	}

	@Override
	public void delete(Long id) {
		roleRepository.deleteById(id);

	}

	@SuppressWarnings("deprecation")
	@Override
	public Role read(Long id) {
		return roleRepository.getById(id);
	}

	@Override
	public List<Role> list() {
		return roleRepository.findAll();
	}

	@Override
	public Page<Role> listPaginationWithKey(String key, Integer page, Integer pageSize, String dir, String props) {
		return null;
	}

	@Override
	public Page<Role> listPagination(Integer page, Integer pageSize, String dir, String props) {
		// TODO Auto-generated method stub
		return null;
	}

}
