// ==========================================================================
// 1. CONTROLE DE ACESSO E SESSÃO (PROTEÇÃO DA TELA)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se há um usuário logado na sessão
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;

    // Se não tiver ninguém logado, barra o acesso e joga pro login
    if (!usuarioLogado) {
        window.location.href = "login.html";
        return;
    }

    // Altera o nome no perfil do cabeçalho de forma dinâmica
    const nomePerfil = document.querySelector(".perfil span");
    if (nomePerfil && usuarioLogado.nome) {
        nomePerfil.textContent = usuarioLogado.nome;
    }

    // Inicializa as funções da Tela Inicial
    carregarMetricasDinamicas();
    configurarNavegacaoLateral();
    configurarBotaoLogout();
});

// ==========================================================================
// 2. CARREGAMENTO DE MÉTRICAS E LÓGICA DO ESTOQUE CRÍTICO
// ==========================================================================
function carregarMetricasDinamicas() {
    // CORRIGIDO: Garante que se o localStorage estiver vazio, use um array vazio [] para não quebrar o .filter()
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const versoes = JSON.parse(localStorage.getItem("versoes")) || [];
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const estoque = JSON.parse(localStorage.getItem("estoque")) || []; 

    // Seleciona os elementos de texto dos cards na tela
    const cards = document.querySelectorAll(".cardEstatistica p");
    
    if (cards.length >= 3) {
        cards[0].textContent = produtos.length;  // Total de Produtos Cadastrados
        cards[1].textContent = versoes.length;   // Total de Versões Cadastradas
        cards[2].textContent = receitas.length;  // Total de Receitas em Produção
    }

    // --- LÓGICA INTERATIVA DO CARD DE ESTOQUE ---
    const cardEstoque = document.querySelector(".statusEstoque");
    const tituloEstoque = document.getElementById("tituloEstoque");
    const valorEstoque = document.getElementById("valorEstoque");

    if (cardEstoque && tituloEstoque && valorEstoque) {
        
        // Filtra os itens críticos com segurança
        const itensCriticos = estoque.filter(item => {
            return item && typeof item.quantidade === 'number' && typeof item.minimo === 'number' 
                ? item.quantidade < item.minimo 
                : false;
        });

        // Se houver algum item abaixo do limite OU se o estoque estiver totalmente zerado/vazio
        if (itensCriticos.length > 0 || estoque.length === 0) {
            // Cenário: ESTOQUE BAIXO (Abaixo do limite ou sem registros ainda)
            cardEstoque.className = "cardEstatistica statusEstoque estoque-critico";
            tituloEstoque.textContent = "Estoque Baixo";
            valorEstoque.textContent = estoque.length === 0 ? "!" : itensCriticos.length; 
        } else {
            // Cenário: ESTOQUE IDEAL (Tudo abastecido e seguro)
            cardEstoque.className = "cardEstatistica statusEstoque estoque-ideal";
            tituloEstoque.textContent = "Estoque Ideal";
            valorEstoque.textContent = "✓"; 
        }
    }
}

// ==========================================================================
// 3. INTERATIVIDADE DA BARRA LATERAL (MENU ACTIVE)
// ==========================================================================
function configurarNavegacaoLateral() {
    const itensMenu = document.querySelectorAll("aside ul li");

    itensMenu.forEach(item => {
        item.addEventListener("click", () => {
            // Remove a classe 'ativo' de todos os botões do menu
            itensMenu.forEach(i => i.classList.remove("ativo"));
            
            // Adiciona a classe 'ativo' apenas no botão clicado
            item.classList.add("ativo");

            const modulo = item.textContent.trim();
            console.log(`Navegando para o módulo: ${modulo}`);
        });
    });
}

// ==========================================================================
// 4. CONFIGURAÇÃO DO BOTÃO DE LOGOUT (DESLOGAR)
// ==========================================================================
function configurarBotaoLogout() {
    const btnLogout = document.getElementById("btnLogout");

    if (btnLogout) {
        btnLogout.addEventListener("click", function(event) {
            event.preventDefault();

            // Limpa o usuário da sessão 
            localStorage.removeItem("usuarioLogado");

            // Redireciona de volta para a tela de login
            window.location.href = "login.html";
        });
    }
}