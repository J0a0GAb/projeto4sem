package com.projeto.models.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;

@Entity
@Table(name = "TAB_USUARIO")
public class Usuario implements Serializable, UserDetails {

	private static final long serialVersionUID = -2374616540565822199L;
    
	private Long    id;
	private String  username;
	private String  email;
	private String  password; 
	private String  confirmePassword;
	private String  foto;
	private String  contentType;
	private Integer falhaLogin;
	private Date    dataVencimentoSenha;  
	
	private Set<Role> roles;
	
	private Set<RefreshToken> tokens;
	
	private boolean ativo = false;
	
	public Usuario() {
		roles = new HashSet<Role>();
		tokens = new HashSet<RefreshToken>();
	}
	
	
    public Usuario(String username, String email, String password, String confirmePassword, String foto,
			String contentType, Integer falhaLogin, Date dataVencimentoSenha, boolean ativo) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.confirmePassword = confirmePassword;
		this.foto = foto;
		this.contentType = contentType;
		this.falhaLogin = falhaLogin;
		this.dataVencimentoSenha = dataVencimentoSenha;
		this.ativo = ativo;
		roles = new HashSet<Role>();
	}

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_USUARIO")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "USERNAME", length = 100, nullable = false) 
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

    @Column(name = "EMAIL", length = 100, nullable = false) 
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

    @Column(name = "ATIVO", length = 1, nullable = false) 
	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	
    @Column(name = "PASSWORD", length = 100, nullable = false) 
	public String getPassword() {
		return password;
	}

   
	public void setPassword(String password) {
		this.password = password;
	}

	@Transient
	public String getConfirmePassword() {
		return confirmePassword;
	}

	public void setConfirmePassword(String confirmePassword) {
		this.confirmePassword = confirmePassword;
	}

	@Column(length = 100, nullable = true) 
	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

    @Column(length = 50, nullable = true) 
	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

    @Column(name = "FALHA_LOGIN", nullable = true) 
	public Integer getFalhaLogin() {
		return falhaLogin;
	}

	public void setFalhaLogin(Integer falhaLogin) {
		this.falhaLogin = falhaLogin;
	}

	@DateTimeFormat(pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.DATE)
    @Column(name = "DATA_VENCIMENTO", columnDefinition = "DATE", nullable =  true) 
	public Date getDataVencimentoSenha() {
		return dataVencimentoSenha;
	}

	public void setDataVencimentoSenha(Date dataVencimentoSenha) {
		this.dataVencimentoSenha = dataVencimentoSenha;
	}
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "TAB_USUARIO_ROLE",
		joinColumns = { @JoinColumn(name="USUARIO_ID", referencedColumnName = "ID_USUARIO") },
    	inverseJoinColumns = { @JoinColumn(name="ROLE_ID", referencedColumnName = "ID_ROLE") } )
	public Set<Role> getRoles() {
		return roles;
	}


	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	
	@OneToMany(mappedBy = "usuario")	
	public Set<RefreshToken> getTokens() {
		return tokens;
	}


	public void setTokens(Set<RefreshToken> tokens) {
		this.tokens = tokens;
	}


	@Transient
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		List<GrantedAuthority> autoridades = new ArrayList<GrantedAuthority>();
		for (Role role:this.getRoles()) {
			autoridades.add(new SimpleGrantedAuthority("ROLE_"+role.getNome().toUpperCase()));
		}
		return autoridades;
	}

	@Transient
	@Override
	public boolean isAccountNonExpired() {
		return ativo;
	}

	@Transient
	@Override
	public boolean isAccountNonLocked() {
		return ativo;
	}

	@Transient
	@Override
	public boolean isCredentialsNonExpired() {
		return ativo;
	}

	@Transient
	@Override
	public boolean isEnabled() {
		return ativo;
	}
	
	


	@Override
	public String toString() {
		return "Usuario [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", confirmePassword=" + confirmePassword + ", foto=" + foto + ", contentType=" + contentType
				+ ", falhaLogin=" + falhaLogin + ", dataVencimentoSenha=" + dataVencimentoSenha + ", ativo=" + ativo
				+ "]";
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(id, other.id);
	}


	
	
	
	
	

}
