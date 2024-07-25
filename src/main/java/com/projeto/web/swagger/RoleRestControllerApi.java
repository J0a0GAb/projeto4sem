package com.projeto.web.swagger;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.projeto.models.model.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Role",description = "Endpoints para o gerenciamento dos dados de direitos de acesso")
public interface RoleRestControllerApi {

	
	@Operation(summary = "Listar todos os direitos de acesso ", description = "Listagem dos direitos de acesso",responses = {
	   @ApiResponse(
	       responseCode="200",
	       content = {
	          @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = Role.class)))		 
	   }),
	   @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
	   @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
	   @ApiResponse(description="Not Found", responseCode="404", content=@Content),
	   @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public List<Role> lista();
	
	
	
	
	public Page<Role> listaPaginada();
	
	
	
	public Page<Role> listaPaginadaPorNome(String key);
	
	
	
	
	@Operation(summary = "Busca de direitos de acesso por id ", description = "Busca de direitos de acesso por id",responses = {
		    @ApiResponse(
		        responseCode="200",
		        content = {
	              @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = Role.class)))		 
		    }),
		    @ApiResponse(description="No Content", responseCode="204", content=@Content),
		    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
		    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> buscarRolePorId(
			      @Parameter(description = "id de direitos de acesso",
			      example = "1",
			      required = true)
		          Long id);
	
	
	
	@Operation(summary = "Cadastrar um usuário", description = "Necessita de todos os dados válidos",responses = {
		 @ApiResponse(
	          responseCode="200",
		         content = {
		           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = Role.class)))		 
		     }),
			 @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
			 @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
			 @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> salvarRole(
			@RequestBody(description = "Representação de um direito de acesso",
			required = true)
			Role role);

	
	@Operation(summary = "Alterar dados de direito de acesso por id ", description = "Necessita de todos os dados válidos",responses = {
	   @ApiResponse(
		    responseCode="200",
		    content = {
		         @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = Role.class)))		 
		    }),
		    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
		    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> alterarRole(
			@Parameter(description = "id de um direito de acesso",
			example = "1",
			required = true)
			Long id, 
			@RequestBody(description = "Representação de um direito de acesso existente com dados válidos",
		    required = true)
			Role role);
	
	@Operation(summary = "Excluir um usuário por id ", description = "Necessita de um id válido",responses = {
		    @ApiResponse(
			     responseCode="200",
			     content = {
		            @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = Role.class)))		 
			}),
			@ApiResponse(description="No Content", responseCode="204", content=@Content),
			@ApiResponse(description="Bad Request", responseCode="400", content=@Content),
			@ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
			@ApiResponse(description="Not Found", responseCode="404", content=@Content),
			@ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> excluirRole(
			@Parameter(description = "id de um direito de acesso",
	        example = "1",
	        required = true)
	        Long id);
}