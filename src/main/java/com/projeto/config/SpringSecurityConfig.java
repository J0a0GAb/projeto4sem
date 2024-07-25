package com.projeto.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.projeto.models.service.components.CriptografarSenha;
import com.projeto.models.service.security.JwtTokenFilter;
import com.projeto.models.service.security.UsuarioDetailsService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
	
	@Autowired
	private CriptografarSenha crypt;
	
	@Autowired
	private UsuarioDetailsService userDetailService;
	
	@Bean
	JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter();
	}
	
	@Bean
	protected SecurityFilterChain filterChainSecurity(HttpSecurity http)throws Exception {
		
		http.csrf(csrf->csrf.disable())
		    .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		    .securityMatcher("/**")
		    .authorizeHttpRequests(configurer ->
		         configurer.requestMatchers(ConfigProjeto.WHITE_LIST_URL).permitAll()
		                   .requestMatchers(HttpMethod.POST,"/rest/login").permitAll() 
		                   .requestMatchers(HttpMethod.POST,"/rest/registrar").permitAll() 
		                   .requestMatchers(HttpMethod.POST,"/rest/logout").hasRole("USUARIO")
		                   .requestMatchers(HttpMethod.POST,"/rest/refreshtoken").hasRole("USUARIO")
		                   .requestMatchers(HttpMethod.POST,"/rest/validartoken").hasRole("USUARIO")
		                 
		                   .requestMatchers(HttpMethod.GET,"/rest/usuario/listaPaginada").hasRole("USUARIO")
		                   .requestMatchers(HttpMethod.GET,"/rest/usuario/listaPaginadaPorNome").hasRole("USUARIO")
		                   .requestMatchers(HttpMethod.GET,"/rest/usuario/buscar/**").hasRole("USUARIO")
		                   .requestMatchers(HttpMethod.GET,"/rest/usuario/**/roles").hasRole("USUARIO")
			               .requestMatchers(HttpMethod.POST,"/rest/usuario/salvar").hasAnyRole("ADMINISTRADOR","USUARIO","VENDEDOR")
		                   .requestMatchers(HttpMethod.POST,"/rest/usuario/alterar/**").hasAnyRole("ADMINISTRADOR","USUARIO","VENDEDOR")
		                   .requestMatchers(HttpMethod.POST,"/rest/usuario/excluir/**").hasAnyRole("ADMINISTRADOR","USUARIO")
		                   
		                   .anyRequest().authenticated()
		   		
		    		);
		
		http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		
		http.cors(Customizer.withDefaults());
		
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		
		var builder = http.getSharedObject(AuthenticationManagerBuilder.class);
		builder.userDetailsService(userDetailService)
		       .passwordEncoder(crypt.passwordEncoder()); 
		
		return builder.build();
	}

}


