package com.projeto.web.swagger;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.projeto.models.data.UsuarioRequest;
import com.projeto.models.data.UsuarioResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;  

@Tag(name = "Usuário",description = "Endpoints para o gerenciamento dos dados do usuário")
public interface UsuarioRestControllerApi {
	
	@Operation(summary = "Listar todos os usuários ", description = "Listagem de usuários",responses = {
	    @ApiResponse(
	        responseCode="200",
	        content = {
	           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
	    }),
	    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
	    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
	    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
	    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public List<UsuarioResponse> lista();

	@Operation(summary = "Lista paginada de todos os usuários ", description = "Listagem por página de usuários")
	public Page<UsuarioResponse> listaPaginada(
			   Integer page,
			   Integer pageSize,
			   String  dir,
			   String  props);
	            
	
	@Operation(summary = "Lista paginada de todos os usuários por busca personalizada ", description = "Listagem por página de usuários por busca personalizadas")
	public ResponseEntity<?> listaPaginadaPorNome(
			    String key,
			    Integer page,
				Integer pageSize,
				String  dir,
				String  props);
	
	@Operation(summary = "Busca de usuários por id ", description = "Busca de usuários por id",responses = {
		    @ApiResponse(
		        responseCode="200",
		        content = {
	              @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
		    }),
		    @ApiResponse(description="No Content", responseCode="204", content=@Content),
		    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
		    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> buscarUsuarioPorId(
			@Parameter(description = "id de um usuário",
					   example = "1",
					   required = true) 
	        		   Long id);
	
	
	@Operation(summary = "Busca de usuários por id ", description = "Busca de usuários por id",responses = {
		    @ApiResponse(
		        responseCode="200",
		        content = {
	              @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
		    }),
		    @ApiResponse(description="No Content", responseCode="204", content=@Content),
		    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
		    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> buscarUsuarioRolePorId(
				@Parameter(description = "id de um usuário",
			    example = "1", required = true) Long id); 

	@Operation(summary = "Cadastrar um usuário", description = "Necessita de todos os dados válidos",responses = {
		 @ApiResponse(
			        responseCode="200",
			        content = {
			           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
			    }),
		 @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		 @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		 @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> salvarUsuario(
					   @RequestBody(description = "Representação de um usuário",
					   required = true)
					   UsuarioRequest usuario);
	
	@Operation(summary = "Alterar um usuário por id ", description = "Necessita de todos os dados válidos",responses = {
	    @ApiResponse(
	        responseCode="200",
		        content = {
		           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
		    }),
		    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
		    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
		    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
		    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> alterarUsuario(
					   @Parameter(description = "id de um usuário",
					   example = "1",
					   required = true)
					   Long id, 
					   @RequestBody(description = "Representação de um usu[ario existente com dados válidos",
					   required = true)
					   UsuarioRequest usuario);
	
	@Operation(summary = "Excluir um usuário por id ", description = "Necessita de um id válido",responses = {
		    @ApiResponse(
			        responseCode="200",
			        content = {
		              @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = UsuarioResponse.class)))		 
			    }),
			    @ApiResponse(description="No Content", responseCode="204", content=@Content),
			    @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
			    @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
			    @ApiResponse(description="Not Found", responseCode="404", content=@Content),
			    @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> excluirUsuario(
			   		   @Parameter(description = "id de um usuário",
			           example = "1",
			           required = true)
			           Long id);
	
}
