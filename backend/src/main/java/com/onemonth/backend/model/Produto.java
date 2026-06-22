package com.onemonth.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;


    @ManyToOne
    @JoinColumn(name = "idStatus")
    private StatusProduto statusProduto;



    public Produto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public StatusProduto getStatusProduto() {
        return statusProduto;
    }

    public void setStatusProduto(StatusProduto statusProduto) {
        this.statusProduto = statusProduto;
    }
}
