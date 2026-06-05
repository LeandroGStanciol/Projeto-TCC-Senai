package com.onemonth.backend.controller;


import com.onemonth.backend.model.Produto;

import com.onemonth.backend.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping("/produtos")
    public List<Produto> listarProdutos(){
        return  service.listarProdutos();
    }

    @GetMapping("/produtos/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {

        Produto produto = service.buscarPorId(id);
        return ResponseEntity.ok(produto);

    }

    @PostMapping("/produtos")
    public Produto cadastrarProduto(@RequestBody Produto produto){
        return service.cadastrarProduto(produto);
    }


    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id){

        service.deletarProduto(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado){

        produtoAtualizado.setId(id);

        Produto produto = service.atualizarProduto(produtoAtualizado);

        return ResponseEntity.ok(produto);

    }
}
