package com.onemonth.backend.service;


import com.onemonth.backend.model.Historico;
import com.onemonth.backend.repository.HistoricoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class HistoricoService {

    private final HistoricoRepository repository;

    public HistoricoService(HistoricoRepository repository) {
        this.repository = repository;
    }

    public void validarHistorico(Historico historico){
        if(historico.getAcao() == null || historico.getAcao().isBlank()){
            throw new IllegalArgumentException("Ação obrigatória!");
        }
        if(historico.getUsuario() == null){
            throw new IllegalArgumentException("Usuário obrigatório!");
        }
        if(historico.getProduto() == null){
            throw new IllegalArgumentException("Produto obrigatório!");
        }
    }

    public void validarExistenciaHistorico(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Histórico não encontrado!");
        }
    }

    public Historico cadastrarHistorico(Historico historico){
        validarHistorico(historico);
        historico.setData_historico(LocalDateTime.now());

        return repository.save(historico);
    }

    public List<Historico> listarHistoricos(){
        return repository.findAll();
    }

    public Historico buscarPorId(Long id){
        Optional<Historico> historico = repository.findById(id);
        if(historico.isPresent()){
            return historico.get();
        }

        throw new IllegalArgumentException("Histórico não encontrado!");
    }

    public Historico atualizarHistorico(Historico historico){
        validarHistorico(historico);
        validarExistenciaHistorico(historico.getId());

        Historico historicoExistente = buscarPorId(historico.getId());

        historicoExistente.setAcao(historico.getAcao());
        historicoExistente.setUsuario(historico.getUsuario());
        historicoExistente.setProduto(historico.getProduto());
        historicoExistente.setData_historico(LocalDateTime.now());

        return repository.save(historicoExistente);
    }

    public void deletarHistorico(Long id){

        validarExistenciaHistorico(id);
        repository.deleteById(id);
    }
}
