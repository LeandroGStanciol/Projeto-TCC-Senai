package com.onemonth.backend.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "estoque")
public class Estoque {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    @Column(name = "qtd_minima", nullable = false)
    private int qtdMinima;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;


    @OneToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    public Estoque() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualzacao) {
        this.dataAtualizacao = dataAtualzacao;
    }

    public int getQtdMinima() {
        return qtdMinima;
    }

    public void setQtdMinima(int qtdMinima) {
        this.qtdMinima = qtdMinima;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
