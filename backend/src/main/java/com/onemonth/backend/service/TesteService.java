package com.onemonth.backend.service;


import com.onemonth.backend.model.Teste;
import com.onemonth.backend.repository.TesteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TesteService {

    private final TesteRepository repository;

    public TesteService(TesteRepository repository) {
        this.repository = repository;
    }

    public void validarTeste (Teste teste){
        if(teste.getResultado() == null || teste.getResultado().isBlank()){
            throw new IllegalArgumentException("Resultado obrigatório!");
        }
        if(teste.getUsuario() == null){
            throw new IllegalArgumentException("Usuário obrigatório!");
        }
        if(teste.getVersaoReceita() == null){
            throw new IllegalArgumentException("Versão receita obrigatória!");
        }
    }

    public void validarExistenciaTeste(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Teste não encontrado!");
        }
    }

    public Teste cadastrarTeste(Teste teste){
        validarTeste(teste);
        teste.setData_teste(LocalDateTime.now());

        return repository.save(teste);
    }

    public List<Teste> listarTestes(){
        return repository.findAll();
    }

    public Teste buscarPorId(Long id){
        Optional<Teste> teste = repository.findById(id);
        if(teste.isPresent()){
            return teste.get();
        }

        throw new IllegalArgumentException("Teste não encontrado!");
    }

    public Teste atualizarTeste(Teste teste){
        validarTeste(teste);
        validarExistenciaTeste(teste.getId());

        Teste testeExistente = buscarPorId(teste.getId());

        testeExistente.setResultado(teste.getResultado());
        testeExistente.setUsuario(teste.getUsuario());
        testeExistente.setVersaoReceita(teste.getVersaoReceita());
        testeExistente.setData_teste(LocalDateTime.now());

        return repository.save(testeExistente);
    }

    public void deletarTeste(Long id){

        validarExistenciaTeste(id);
        repository.deleteById(id);
    }

}
