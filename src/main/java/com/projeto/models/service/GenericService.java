package com.projeto.models.service;

import java.util.List;

import org.springframework.data.domain.Page;

public interface GenericService<D,O,ID> {

	D save(O entity);
	D update(ID id, O entity);
	void delete(ID id);
	D read(ID id);
	List<D> list();
	Page<D> listPaginationWithKey(String key, Integer page, Integer pageSize, String dir, String props);
	Page<D> listPagination(Integer page, Integer pageSize, String dir, String props);
	
}
