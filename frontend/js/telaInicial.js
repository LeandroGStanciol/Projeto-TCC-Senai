// ==========================================================================
// 1. CONTROLE DE ACESSO, SESSÃO E MENU MOBILE (PROTEÇÃO DA TELA)
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

    // --- LOGICA DE ACESSIBILIDADE E CLIQUES DO MENU MOBILE ---
    const btnMenuMobile = document.getElementById("btnMenuMobile");
    const menuLateral = document.getElementById("menuLateral");

    if (btnMenuMobile && menuLateral) {
        btnMenuMobile.addEventListener("click", () => {
            // Alterna a classe que faz a gaveta deslizar no CSS
            const estaAberto = menuLateral.classList.toggle("aberto");
            
            // Atualiza os leitores de ecrã dinamicamente se está aberto ou fechado
            btnMenuMobile.setAttribute("aria-expanded", estaAberto);
            btnMenuMobile.setAttribute("aria-label", estaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
        });
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
    // Busca os dados do localStorage (ou assume um array vazio [] se não existirem)
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const versoes = JSON.parse(localStorage.getItem("versoes")) || [];
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const estoque = JSON.parse(localStorage.getItem("estoque")) || []; 

    // Seleciona a tag <p> de dentro de cada um dos 4 cards de estatística
    const cards = document.querySelectorAll(".cardEstatistica p");
    
    // Alimenta os valores de forma direta e sem quebrar ou alterar cores do CSS
    if (cards.length >= 4) {
        cards[0].textContent = produtos.length;  // Total de Produtos
        cards[1].textContent = versoes.length;   // Total de Versões
        cards[2].textContent = receitas.length;  // Total de Receitas
        
        // Apenas calcula quantos itens estão abaixo do mínimo e joga o número no 4º card
        const itensCriticos = estoque.filter(item => {
            return item && typeof item.quantidade === 'number' && typeof item.minimo === 'number' 
                ? item.quantidade < item.minimo 
                : false;
        });
        
        cards[3].textContent = itensCriticos.length; // Exibe a quantidade de itens em falta (começa em 0)
    }
}

// ==========================================================================
// 3. INTERATIVIDADE DA BARRA LATERAL (MENU ACTIVE)
// ==========================================================================
function configurarNavegacaoLateral() {
    const itensMenu = document.querySelectorAll("aside ul li");

    itensMenu.forEach(item => {
        // 1. Ação ao clicar com o Rato
        item.addEventListener("click", () => aplicarSelecaoMenu(item, itensMenu));
        
        // 2. ACESSIBILIDADE: Ação ao pressionar Enter ou Espaço usando o Teclado
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Evita scroll indesejado ao carregar no Espaço
                aplicarSelecaoMenu(item, itensMenu);
            }
        });
    });
}

// Função auxiliar para gerir o estado ativo de forma limpa e acessível
function aplicarSelecaoMenu(itemClicado, todosItens) {
    todosItens.forEach(i => {
        i.classList.remove("ativo");
        i.removeAttribute("aria-current"); 
    });
    
    itemClicado.classList.add("ativo");
    itemClicado.setAttribute("aria-current", "page"); 

    // FECHA A GAVETA MOBILE CASO ESTEJA ABERTA
    const menuLateral = document.getElementById("menuLateral");
    const btnMenuMobile = document.getElementById("btnMenuMobile");
    if (menuLateral && btnMenuMobile) {
        menuLateral.classList.remove("aberto");
        btnMenuMobile.setAttribute("aria-expanded", "false");
        btnMenuMobile.setAttribute("aria-label", "Abrir menu de navegação");
    }

    const modulo = itemClicado.textContent.trim();
    console.log(`Navegando de forma acessível para o módulo: ${modulo}`);
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