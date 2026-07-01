// Seleção dos elementos

const formLogin = document.getElementById("formLogin");

const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");

const erroUsuario = document.getElementById("erroUsuario");
const erroSenha = document.getElementById("erroSenha");

const toggleSenha = document.getElementById("toggleSenha");
const botao = document.querySelector("button");


// Funções auxiliares

function limparErros() {

    erroUsuario.style.display = "none";
    erroSenha.style.display = "none";

    usuario.parentElement.classList.remove("erroCampo", "sucesso");
    senha.parentElement.classList.remove("erroCampo", "sucesso");

}

function mostrarErro(elementoMensagem, input, texto) {

    elementoMensagem.style.display = "block";
    elementoMensagem.textContent = texto;

    input.parentElement.classList.remove("sucesso");
    input.parentElement.classList.add("erroCampo");

}

function mostrarSucesso(input) {

    input.parentElement.classList.remove("erroCampo");
    input.parentElement.classList.add("sucesso");

}




// Mostrar/Ocultar senha

toggleSenha.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";

        toggleSenha.classList.remove("fa-eye");
        toggleSenha.classList.add("fa-eye-slash");

    } else {

        senha.type = "password";

        toggleSenha.classList.remove("fa-eye-slash");
        toggleSenha.classList.add("fa-eye");

    }

});


// Validação do usuário

usuario.addEventListener("input", () => {

    const valor = usuario.value.trim();

    if (valor.length === 0) {

        erroUsuario.style.display = "none";
        usuario.parentElement.classList.remove("erroCampo", "sucesso");

    } else if (valor.length < 3) {

        mostrarErro(
            erroUsuario,
            usuario,
            "O usuário deve possuir pelo menos 3 caracteres."
        );

    } else {

        erroUsuario.style.display = "none";
        mostrarSucesso(usuario);

    }

});

// Validação da senha

senha.addEventListener("input", () => {

    const valor = senha.value.trim();

    if (valor.length === 0) {

        erroSenha.style.display = "none";
        senha.parentElement.classList.remove("erroCampo", "sucesso");

    } else if (valor.length < 6 || valor.length > 12) {

        mostrarErro(
            erroSenha,
            senha,
            "A senha deve possuir entre 6 e 12 caracteres."
        );

    } else {

        erroSenha.style.display = "none";
        mostrarSucesso(senha);

    }

});


// Envio do formulário

formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    limparErros();

    let formularioValido = true;


    // Usuário

    if (usuario.value.trim().length < 3) {

        mostrarErro(
            erroUsuario,
            usuario,
            "O usuário deve possuir pelo menos 3 caracteres."
        );

        formularioValido = false;

    }


    // Senha

    if (
        senha.value.trim().length < 6 ||
        senha.value.trim().length > 12
    ) {

        mostrarErro(
            erroSenha,
            senha,
            "A senha deve possuir entre 6 e 12 caracteres."
        );

        formularioValido = false;

    }


    // Se houver erro, não continua

    if (!formularioValido) {

        return;

    }


    // Simulação de login

    botao.disabled = true;
    botao.textContent = "Entrando...";

    setTimeout(() => {

        localStorage.setItem("usuarioLogado", usuario.value);
        localStorage.setItem("logado", "true");

        window.location.href = "telaInicial.html";

    }, 1500);

});