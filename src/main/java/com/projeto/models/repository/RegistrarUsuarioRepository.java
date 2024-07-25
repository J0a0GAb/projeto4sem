package com.projeto.models.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.models.model.Usuario;

public interface RegistrarUsuarioRepository extends JpaRepository<Usuario, Long>{

}
