package com.onemonth.backend.service;


import com.onemonth.backend.model.Estoque;
import com.onemonth.backend.repository.EstoqueRepository;
import com.onemonth.backend.repository.ProdutoRepository;
import org.hibernate.boot.model.source.spi.EmbeddableSource;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {

    private final EstoqueRepository repository;
    private final ProdutoRepository produtoRepository;

    public EstoqueService(EstoqueRepository repository, ProdutoRepository produtoRepository) {
        this.repository = repository;
        this.produtoRepository = produtoRepository;
    }

    public void validarEstoque(Estoque estoque){

        if(estoque.getDataAtualizacao() == null){
            throw new IllegalArgumentException("Data de atualização obrigatória!");
        }
        if(estoque.getQtdMinima() <= 0 || estoque.getQuantidade() <= 0){
            throw new IllegalArgumentException("Quantidade inválida!");
        }
        if(estoque.getProduto()== null){
            throw new IllegalArgumentException("Produto obrigatório!");
        }
    }

    public void validarExistenciaEstoque(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Estoque não encontrado!");
        }
    }

    public Estoque cadastrarEstoque(Estoque estoque){
        validarEstoque(estoque);

        estoque.setDataAtualizacao(LocalDateTime.now());

        return repository.save(estoque);
    }

    public List<Estoque> listarEstoques(){
        return repository.findAll();
    }

    public Estoque buscarPorId(Long id){
        Optional<Estoque> estoque = repository.findById(id);

        if(estoque.isPresent()){
            return estoque.get();
        }

        throw new IllegalArgumentException("Estoque não encontrado!");
    }

    public Estoque atualizarEstoque (Estoque estoque){
        validarEstoque(estoque);
        validarExistenciaEstoque(estoque.getId());

        return repository.save(estoque);
    }

    public void deletarEstoque(Long id){

        validarExistenciaEstoque(id);
        repository.deleteById(id);
    }
}
