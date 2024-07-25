package com.projeto.models.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;

import com.projeto.config.ConfigProjeto;
import com.projeto.models.data.FotoRequest;
import com.projeto.models.data.FotoResponse;
import com.projeto.models.model.Foto;
import com.projeto.models.model.Usuario;
import com.projeto.models.repository.UsuarioRepository;
import com.projeto.models.service.LocalFotoStorageService;
import com.projeto.models.service.exception.EntityNotFoundException;
import com.projeto.models.service.exception.FileStorageException;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;


@Service
@Transactional
public class LocalFotoStorageServiceImpl implements LocalFotoStorageService {

	
	private Path diretorioFotos;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public LocalFotoStorageServiceImpl() {
		try {
			diretorioFotos = Paths.get(ConfigProjeto.DIRETORIO_FOTOS)
					              .toAbsolutePath()
					              .normalize();
			Files.createDirectories(diretorioFotos);
		} catch (IOException e) {
			throw new FileStorageException("Não foi possível criar o diretório de fotos ",e);
		}
		
	}

	
	@Override
	public FotoResponse armazenar(FotoRequest fotoRequest) {
		
		Usuario usuario = null;
		var fotoResponse = new FotoResponse();
		var foto = new Foto();
		
		if (!"".equals(fotoRequest.getId())) {
			foto.setId(Long.valueOf(fotoRequest.getId()));
			usuario = usuarioRepository.findById(foto.getId())
					        .orElseThrow(()-> new EntityNotFoundException("Entidade não localizada!")  );
			if ((!Objects.isNull(usuario)) && 
			    (!Objects.isNull(usuario.getFoto())&& 
			    (!usuario.getFoto().isBlank()))) {
				remover(usuario.getFoto());
				
			}
			
		}
	
		try {
		    foto.setNomeArquivo(fotoRequest.getFoto().getOriginalFilename());
			foto.setInputStream(fotoRequest.getFoto().getInputStream());
			foto.setContentType(fotoRequest.getFoto().getContentType());
		} catch (IOException e) {
			throw new FileStorageException("Não foi possível processar o arquivo da foto!!! ",e);
		}
		
		String nomeFoto = gerarNomeArquivo(foto.getNomeArquivo());
		
		Path arquivoPath = getArquivoPath(nomeFoto);
		
		try {
			FileCopyUtils.copy(foto.getInputStream(), Files.newOutputStream(arquivoPath));
			Thumbnails.of(arquivoPath.toString())
			          .size(50,78)
			          .toFiles(Rename.PREFIX_DOT_THUMBNAIL);
		    
			fotoResponse.setNomeArquivo(nomeFoto);
			fotoResponse.setContentType(foto.getContentType());
			
			if (!Objects.isNull(usuario)) {
				usuarioRepository.updateFotoUsuario(usuario.getId(), nomeFoto);
				fotoResponse.setId(Long.toString(usuario.getId()));
			}
			
			return fotoResponse;
		} catch (IOException e) {
			throw new FileStorageException("Não foi possível gravar o arquivo da foto!!! ",e);
		}

	}

	@Override
	public FotoResponse excluirFoto(FotoRequest fotoRequest) {
		
		String nomeFoto = null;
		
		Usuario usuario = null;
		
		var fotoResponse = new FotoResponse();
		
		if (!"".equals(fotoRequest.getId()) && !fotoRequest.getId().equals("0")) {
			usuario = usuarioRepository.findById(Long.valueOf(fotoRequest.getId()))
			        .orElseThrow(()-> new EntityNotFoundException("Entidade não localizada!"));
		}
		
		nomeFoto = Objects.isNull(usuario) ? fotoRequest.getNomeArquivo() : usuario.getFoto();
		
		if ( remover(nomeFoto )) {
			if (!Objects.isNull(usuario)) {
				usuarioRepository.updateFotoUsuario(usuario.getId(),"");
			}
			fotoResponse.setNomeArquivo("");
		}
		
		return fotoResponse;
	}

	@Override
	public boolean remover(String nomeFoto) {
		String thumbnail = "thumbnail."+nomeFoto;
		
		if (!nomeFoto.isEmpty()) {
			try {
				Path arquivoNomeFoto = getArquivoPath(nomeFoto);
				Files.deleteIfExists(arquivoNomeFoto);
				
				Path arquivoThumbnail = getArquivoPath(thumbnail);
				Files.deleteIfExists(arquivoThumbnail);
				
				return true;
			} catch (IOException e) {
				throw new FileStorageException("Erro na exclusão da foto", e);
			}
			
		}
		return false;
	}

	@Override
	public InputStream recuperar(String nomeArquivo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] recuperarFoto(String nomeArquivo) {
		try {
			return Files.readAllBytes(getArquivoPath(nomeArquivo));
		} catch (IOException e) {
			throw new FileStorageException("Erro na leitura do arquivo da foto solicitada ");
		} 
	}
	
	private String gerarNomeArquivo(String nomeArquivo) {
		return UUID.randomUUID().toString()+"_"+nomeArquivo;
	}
	
	private Path getArquivoPath(String nomeFoto) {
		return diretorioFotos.resolve(Paths.get(nomeFoto));
	}

}
