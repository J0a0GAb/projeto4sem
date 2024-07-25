package com.projeto.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projeto.models.model.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	
	@Query("SELECT r FROM RefreshToken r "
			+ "WHERE r.usuario.id =:id and "
			+ "(r.expirado = false or r.bloqueado = false) ")
	List<RefreshToken> findAllTokenByUsuario(@Param("id") Long id);

	
	
	
}
