package com.projeto.models.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projeto.models.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	@Query("SELECT u FROM Usuario u WHERE u.username =:key")
	List<Usuario> findByUserName(@Param("key") String key);

	@Query("SELECT u FROM Usuario u "
			+ "LEFT JOIN FETCH u.roles "
			+ "WHERE u.email =:email ")
	Optional<Usuario> findUsuarioByEmail(@Param("email") String email);

	@Query(value = "SELECT u FROM Usuario u",
			countQuery = "SELECT count(u) FROM Usuario u")
	Page<Usuario> findAllPagination(Pageable pagina);
	
	@Query(value="SELECT u FROM Usuario u "
			+ "WHERE u.id LIKE(CONCAT('%',:key,'%')) "
			+ "OR u.username LIKE(CONCAT('%',:key,'%')) "
			+ "OR u.email LIKE(CONCAT('%',:key,'%')) ", 
			countQuery="SELECT count(u) FROM Usuario u")
	Page<Usuario> findAllPaginationWithKey(@Param("key") String key, Pageable pagina);
	
	
	
	
	@Modifying
    @Query(value="UPDATE Usuario u SET u.foto=:nomeFoto WHERE u.id =:id")
    void updateFotoUsuario(@Param("id") Long id, @Param("nomeFoto")String nomeFoto);
	
	@Query(value="SELECT * FROM tab_usuario as u "
			+ "LEFT JOIN tab_usuario_role as ur "
			+ "ON u.id_usuario = ur.usuario_id "
			+ "LEFT JOIN tab_role as r "
			+ "ON ur.role_id = r.id_role "
			+ "WHERE u.id_usuario =:id ", nativeQuery = true)
	Optional<Usuario> findUsuarioRoleById(@Param("id") Long id);
	
}
