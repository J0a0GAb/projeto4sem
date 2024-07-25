package com.projeto.models.service.security;

import java.io.IOException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.projeto.models.service.JwtTokenServiceProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenFilter extends OncePerRequestFilter {
    
	@Autowired
	private JwtTokenServiceProvider token;
	
	public JwtTokenFilter() {
		
	}
			
	@Override
	protected void doFilterInternal(
			HttpServletRequest request, 
			HttpServletResponse response, 
			FilterChain filterChain)
			throws ServletException, IOException {
	
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String email;
		
		if (request.getServletPath().contains("/rest/login")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwt = authHeader.substring(7);
		
		email = token.getEmail(jwt);
		
		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			if (token.validateToken(jwt)) {
				Authentication auth = token.getAuthentication(jwt);
				if (!Objects.isNull(auth)) {
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
			}
		}
		
		filterChain.doFilter(request, response);
	}

}
