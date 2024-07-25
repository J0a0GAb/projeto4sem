package com.projeto.models.service.impl;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.projeto.config.ConfigProjeto;
import com.projeto.models.model.Usuario;
import com.projeto.models.service.JwtTokenServiceProvider;
import com.projeto.models.service.exception.InvalidJwtAuthenticationException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenServiceProviderImpl implements JwtTokenServiceProvider {

	private long TOKEN_MILLI_SECONDS = System.currentTimeMillis()+1000;
	
	private long REFRESH_TOKEN_MILLI_SECONDS = System.currentTimeMillis() + 10 * 60 * 6000;
	
	@Autowired
	private UserDetailsService userDetailsService;
		
	@Override
	public String createAccessToken(Usuario usuario) {

		Claims claims = Jwts.claims();
		claims.put("roles", usuario.getRoles());
		claims.put("foto", usuario.getFoto());
		claims.put("nome", usuario.getUsername());
		claims.put("email", usuario.getEmail());
		return generateAccessToken(claims, usuario.getEmail());
	}

	@Override
	public String createRefreshToken(Usuario usuario) {
		Claims claims = Jwts.claims();
		claims.put("roles", usuario.getRoles());
		claims.put("foto", usuario.getFoto());
		claims.put("nome", usuario.getUsername());
		claims.put("email", usuario.getEmail());
		return generateRefreshToken(claims, usuario.getEmail());
	}

	@Override
	public boolean validateToken(String token) {
		
		try {
			Date dateExpiration = getDateExpiration(token);
			
			if (dateExpiration.before(new Date())) {
				return false;
			}
			
		}catch (JwtException | IllegalArgumentException e) {
			throw new InvalidJwtAuthenticationException("Token inválido ou expirado! ");
		}
		return true;
	}

	@Override
	public Authentication getAuthentication(String token) {
		UserDetails usuario = findUsuarioByToken(token);
		return new UsernamePasswordAuthenticationToken(usuario, "", usuario.getAuthorities());
	}

	@Override
	public String getEmail(String token) {
		return Jwts.parserBuilder()
				   .setSigningKey(getSignKey())
				   .build()
				   .parseClaimsJws(token)
				   .getBody()
				   .getSubject();
	}

	@Override
	public Date getDateExpiration(String token) {
		return Jwts.parserBuilder()
				   .setSigningKey(getSignKey())
				   .build()
				   .parseClaimsJws(token)
				   .getBody()
				   .getExpiration();
	}

	@Override
	public boolean isTokenValid(String token) {
		UserDetails usuario = findUsuarioByToken(token);
		Claims claims = getClaims(token);
	    String nome = claims.get("nome").toString();
		return (usuario.getUsername().equals(nome)) && !validateToken(token);
	}
	
	
	private Claims getClaims(String token) {
		return Jwts.parserBuilder()
				   .setSigningKey(getSignKey())
				   .build()
				   .parseClaimsJws(token)
				   .getBody();
	}



	private String generateAccessToken(Claims claims, String email) {
		return Jwts.builder()
				   .setClaims(claims)
				   .setSubject(email)
				   .setIssuedAt(new Date())
				   .setExpiration(new Date((new Date()).getTime() + TOKEN_MILLI_SECONDS))
				   .signWith(getSignKey(),SignatureAlgorithm.HS256)
				   .compact();
	}
	
	private String generateRefreshToken(Claims claims, String email) {
		return Jwts.builder()
				   .setClaims(claims)
				   .setSubject(email)
				   .setIssuedAt(new Date())
				   .setExpiration(new Date((new Date()).getTime() + REFRESH_TOKEN_MILLI_SECONDS))
				   .signWith(getSignKey(),SignatureAlgorithm.HS256)
				   .compact();
	}

	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(ConfigProjeto.SECRETKEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	private UserDetails findUsuarioByToken(String token) {
        UserDetails usuario = userDetailsService.loadUserByUsername(getEmail(token)); 
		return usuario;
	}


}
