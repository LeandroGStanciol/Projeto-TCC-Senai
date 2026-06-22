package com.onemonth.backend.service;


import com.onemonth.backend.model.Usuario;
import com.onemonth.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public void validarUsuario(Usuario usuario){

        if(usuario.getNome() == null || usuario.getNome().isBlank()){
            throw new IllegalArgumentException("Campo nome obrigatório!");
        }
        if(usuario.getSenha() == null || usuario.getSenha().isBlank()){
            throw new IllegalArgumentException("Campo senha obrigatório!");
        }
        if(usuario.getSenha() != null && usuario.getSenha().length() <4){
            throw new IllegalArgumentException("Senha muito curta!(Minimo 4 caracteres)");
        }
        if(usuario.getEmail() == null || usuario.getEmail().isBlank()){
            throw new IllegalArgumentException("Campo email obrigatório");
        }
        if(!usuario.getEmail().contains("@")){
            throw new IllegalArgumentException("Email inválido");
        }
        if(usuario.getPerfil() == null){
            throw new IllegalArgumentException("Perfil obrigatório!");
        }
    }

    public void validarExistenciaUsuario(Long id){

        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Usuário não encontrado!");
        }
    }

    public Usuario cadastrarUsuario(Usuario usuario){
        validarUsuario(usuario);

        return repository.save(usuario);
    }

    public List<Usuario> listarUsuarios(){
        return repository.findAll();
    }

    public Usuario buscarPorId(Long id){
        Optional<Usuario> usuario = repository.findById(id);

        if(usuario.isPresent()){
            return usuario.get();
        }

        throw new IllegalArgumentException("Usuário não encontrado");
    }

    public Usuario atualizarUsuario (Usuario usuario){
        validarUsuario(usuario);
        validarExistenciaUsuario(usuario.getId());

        return repository.save(usuario);
    }

    public void deletarUsuario (Long id){

        validarExistenciaUsuario(id);
        repository.deleteById(id);

    }
}
