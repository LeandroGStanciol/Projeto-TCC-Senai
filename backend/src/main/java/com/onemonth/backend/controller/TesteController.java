package com.onemonth.backend.controller;


import com.onemonth.backend.model.Teste;
import com.onemonth.backend.service.TesteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teste")
public class TesteController {

    private final TesteService service;

    public TesteController(TesteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Teste> listarTestes(){
        return service.listarTestes();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Teste> buscarPorId(@PathVariable Long id){

        Teste teste = service.buscarPorId(id);
        return ResponseEntity.ok(teste);
    }

    @PostMapping
    public Teste cadastrarTeste(@RequestBody Teste teste){
        return service.cadastrarTeste(teste);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teste> atualizarTeste(@PathVariable Long id, @RequestBody Teste testeAtualizado){

        testeAtualizado.setId(id);
        Teste teste = service.atualizarTeste(testeAtualizado);

        return ResponseEntity.ok(teste);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTeste(@PathVariable Long id){

        service.deletarTeste(id);
        return ResponseEntity.noContent().build();

    }
}
