package com.onemonth.backend.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico")
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(columnDefinition = "TEXT")
    private String acao;


    @Column(name = "data_historico")
    private LocalDateTime data_historico;


    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;


    @ManyToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    public Historico() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcao() {
        return acao;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }

    public LocalDateTime getData_historico() {
        return data_historico;
    }

    public void setData_historico(LocalDateTime data_historico) {
        this.data_historico = data_historico;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
