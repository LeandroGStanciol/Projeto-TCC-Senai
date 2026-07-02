// ==========================================================================
// 1. CONTROLE DE ACESSO E INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Garante proteção da tela
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;
    if (!usuarioLogado) {
        window.location.href = "login.html";
        return;
    }

    const nomePerfil = document.querySelector(".perfil span");
    if (nomePerfil && usuarioLogado.nome) {
        nomePerfil.textContent = usuarioLogado.nome;
    }

    // Inicializa as funções da tela
    inicializarModal();
    renderizarTabelaProdutos();
    configurarFormulario();
});

// ==========================================================================
// 2. CONTROLE DO MODAL (ABRIR / FECHAR)
// ==========================================================================
function inicializarModal() {
    const modal = document.getElementById("modalCadastro");
    const btnAbrir = document.getElementById("btnAbrirModal");
    const btnFechar = document.getElementById("btnFecharModal");

    if (modal && btnAbrir && btnFechar) {
        // Abre o modal ao clicar no botão principal
        btnAbrir.addEventListener("click", () => {
            modal.classList.add("ativo");
            document.getElementById("formProduto").reset(); // Limpa dados anteriores
            document.getElementById("prodNome").focus();    // Coloca o cursor no primeiro campo
        });

        // Fecha o modal ao clicar no X
        btnFechar.addEventListener("click", () => {
            modal.classList.remove("ativo");
        });

        // Fecha o modal se o usuário clicar na área escura de fora
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("ativo");
            }
        });
    } else {
        console.error("Erro: Um ou mais botões do modal não foram encontrados no HTML.");
    }
}

// ==========================================================================
// 3. EXIBIR PRODUTOS NA TABELA
// ==========================================================================
function renderizarTabelaProdutos() {
    const tbody = document.getElementById("tabelaProdutosBody");
    if (!tbody) return;

    // Busca os produtos ou cria dados iniciais mockados se o banco local estiver vazio
    let produtos = JSON.parse(localStorage.getItem("produtos"));
    
    if (!produtos || produtos.length === 0) {
        produtos = [
            { id: 1001, lote: "LT-PR-2026-01", nome: "Pão Francês", categoria: "Panificação", minimo: 50 },
            { id: 1002, lote: "LT-CF-2026-04", nome: "Bolo de Cenoura", categoria: "Confeitaria", minimo: 10 }
        ];
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    tbody.innerHTML = ""; // Limpa linhas velhas

    produtos.forEach((produto, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>#${produto.id}</td>
            <td><strong>${produto.lote}</strong></td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.minimo} un</td>
            <td>
                <button class="btn-acao editar" onclick="editarProduto(${index})" title="Editar Produto">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn-acao excluir" onclick="excluirProduto(${index})" title="Excluir Produto">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================================================
// 4. SALVAR O NOVO PRODUTO NO LOCALSTORAGE
// ==========================================================================
function configurarFormulario() {
    const form = document.getElementById("formProduto");
    const modal = document.getElementById("modalCadastro");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o reload da página

            const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

            // Captura os dados dos inputs
            const novoProduto = {
                id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1001,
                lote: document.getElementById("prodLote").value.trim(),
                nome: document.getElementById("prodNome").value.trim(),
                categoria: document.getElementById("prodCategoria").value,
                minimo: parseInt(document.getElementById("prodMinimo").value)
            };

            produtos.push(novoProduto);
            localStorage.setItem("produtos", JSON.stringify(produtos)); // Grava no banco

            modal.classList.remove("ativo"); // Esconde o modal
            renderizarTabelaProdutos();      // Recarrega a tabela na hora
        });
    }
}

// ==========================================================================
// 5. AÇÕES (EXCLUIR / EDITAR)
// ==========================================================================
function excluirProduto(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    if (confirm(`Deseja realmente remover o produto "${produtos[index].nome}"?`)) {
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        renderizarTabelaProdutos();
    }
}

function editarProduto(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    console.log("Item selecionado para futura edição:", produtos[index]);
}