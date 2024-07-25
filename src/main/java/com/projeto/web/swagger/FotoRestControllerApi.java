package com.projeto.web.swagger;

import org.springframework.http.ResponseEntity;

import com.projeto.models.data.FotoRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

public interface FotoRestControllerApi {
	
	@Operation(summary = "Upload de Foto", description = "Necessita de uma foto válida",responses = {
			 @ApiResponse(
		          responseCode="200",
			         content = {
			           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = FotoRequest.class)))		 
			     }),
				 @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
				 @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
				 @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> uploadFoto(@RequestBody(description = "Representação de uma foto",
			                            required = true)
	                                    FotoRequest fotoRequest);
	
	@Operation(summary = "Excluir uma foto", description = "Precisa de um identificador de foto válido",responses = {
			 @ApiResponse(
		          responseCode="200",
			         content = {
			           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = FotoRequest.class)))		 
			     }),
				 @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
				 @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
				 @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public ResponseEntity<?> excuirFoto(@RequestBody(description = "Representação de uma foto",
										required = true)
	                                    FotoRequest fotoRequest);
	
	
	@Operation(summary = "Buscar uma foto pelo nome", description = "Necessita de uma foto válida",responses = {
			 @ApiResponse(
		          responseCode="200",
			         content = {
			           @Content( mediaType = "application/json",array = @ArraySchema( schema=@Schema(implementation = FotoRequest.class)))		 
			     }),
				 @ApiResponse(description="Bad Request", responseCode="400", content=@Content),
				 @ApiResponse(description="Unauthorized", responseCode="401", content=@Content),
				 @ApiResponse(description="Internal Error", responseCode="500", content=@Content),  
	})
	public byte[] recuperarFoto(@Parameter(description = "Nome da foto válida",
	                                    example="foto.jpg" ) 
	                                    String nomeFoto);
}
