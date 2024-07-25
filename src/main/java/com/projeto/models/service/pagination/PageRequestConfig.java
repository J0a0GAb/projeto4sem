package com.projeto.models.service.pagination;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageRequestConfig {

	public static Pageable gerarPagina(Integer page, Integer pageSize, String dir, String props) {
		return PageRequest.of(page, pageSize, getSortDirection(dir, props));
	}
	
	private static Sort getSortDirection(String dir, String props) {
		Sort sort = dir.equalsIgnoreCase(Sort.Direction.ASC.name())
				? Sort.by(props).ascending()
				: Sort.by(props).descending();
		return sort;
	}

}
