// ======================================================
// ELEMENTOS
// ======================================================

const formCadastro = document.getElementById("formCadastro");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroUsuario = document.getElementById("erroUsuario");
const erroSenha = document.getElementById("erroSenha");
const erroConfirmarSenha = document.getElementById("erroConfirmarSenha");
const erroTipoUsuario = document.getElementById("erroTipoUsuario");

const barraForca = document.getElementById("barraForca");
const textoForca = document.getElementById("textoForca");

const toggleSenha = document.getElementById("toggleSenha");
const toggleConfirmar = document.getElementById("toggleConfirmar");

const btnCadastrar = document.getElementById("btnCadastrar");

const tipoUsuario = document.getElementsByName("tipoUsuario");


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function limparErro(elemento){

    elemento.textContent = "";
    elemento.style.display = "none";

}

function mostrarErro(elemento,input,mensagem){

    elemento.textContent = mensagem;
    elemento.style.display = "block";

    input.parentElement.classList.remove("sucesso");
    input.parentElement.classList.add("erroCampo");

}

function mostrarSucesso(input){

    input.parentElement.classList.remove("erroCampo");
    input.parentElement.classList.add("sucesso");

}

function limparCampo(input){

    input.parentElement.classList.remove("erroCampo");
    input.parentElement.classList.remove("sucesso");

}


// ======================================================
// MOSTRAR SENHA
// ======================================================

toggleSenha.addEventListener("click",()=>{

    if(senha.type==="password"){

        senha.type="text";

        toggleSenha.classList.replace("fa-eye","fa-eye-slash");

    }else{

        senha.type="password";

        toggleSenha.classList.replace("fa-eye-slash","fa-eye");

    }

});


toggleConfirmar.addEventListener("click",()=>{

    if(confirmarSenha.type==="password"){

        confirmarSenha.type="text";

        toggleConfirmar.classList.replace("fa-eye","fa-eye-slash");

    }else{

        confirmarSenha.type="password";

        toggleConfirmar.classList.replace("fa-eye-slash","fa-eye");

    }

});


// ======================================================
// VALIDAÇÃO NOME
// ======================================================

function validarNome(){

    limparErro(erroNome);

    const valor = nome.value.trim();

    if(valor==""){

        limparCampo(nome);

        return false;

    }

    if(valor.length<3){

        mostrarErro(
            erroNome,
            nome,
            "O nome deve possuir pelo menos 3 letras."
        );

        return false;

    }

    mostrarSucesso(nome);

    return true;

}


// ======================================================
// EMAIL
// ======================================================

function validarEmail(){

    limparErro(erroEmail);

    const valor = email.value.trim();

    if(valor==""){

        limparCampo(email);

        return false;

    }

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(valor)){

        mostrarErro(
            erroEmail,
            email,
            "Digite um e-mail válido."
        );

        return false;

    }

    mostrarSucesso(email);

    return true;

}


// ======================================================
// USUÁRIO
// ======================================================

function validarUsuario(){

    limparErro(erroUsuario);

    const valor = usuario.value.trim();

    if(valor==""){

        limparCampo(usuario);

        return false;

    }

    if(valor.length<4){

        mostrarErro(
            erroUsuario,
            usuario,
            "O usuário deve possuir pelo menos 4 caracteres."
        );

        return false;

    }

    if(valor.length>20){

        mostrarErro(
            erroUsuario,
            usuario,
            "Máximo de 20 caracteres."
        );

        return false;

    }

    mostrarSucesso(usuario);

    return true;

}


// ======================================================
// SENHA
// ======================================================

function validarSenha(){

    limparErro(erroSenha);

    const valor = senha.value;

    if(valor==""){

        limparCampo(senha);

        barraForca.style.width="0%";
        textoForca.textContent="";

        return false;

    }

    let forca=0;

    if(valor.length>=8)forca++;

    if(/[A-Z]/.test(valor))forca++;

    if(/[0-9]/.test(valor))forca++;

    if(/[^A-Za-z0-9]/.test(valor))forca++;

    switch(forca){

        case 1:

            barraForca.style.width="25%";
            barraForca.style.background="#dc3545";
            textoForca.textContent="Senha fraca";

            break;

        case 2:

            barraForca.style.width="50%";
            barraForca.style.background="#ffc107";
            textoForca.textContent="Senha média";

            break;

        case 3:

            barraForca.style.width="75%";
            barraForca.style.background="#0dcaf0";
            textoForca.textContent="Senha boa";

            break;

        case 4:

            barraForca.style.width="100%";
            barraForca.style.background="#198754";
            textoForca.textContent="Senha forte";

            break;

    }

    if(valor.length<8){

        mostrarErro(
            erroSenha,
            senha,
            "A senha deve possuir pelo menos 8 caracteres."
        );

        return false;

    }

    if(!/[A-Z]/.test(valor)){

        mostrarErro(
            erroSenha,
            senha,
            "Inclua uma letra maiúscula."
        );

        return false;

    }

    if(!/[0-9]/.test(valor)){

        mostrarErro(
            erroSenha,
            senha,
            "Inclua um número."
        );

        return false;

    }

    mostrarSucesso(senha);

    return true;

}


// ======================================================
// CONFIRMAR SENHA
// ======================================================

function validarConfirmarSenha(){

    limparErro(erroConfirmarSenha);

    if(confirmarSenha.value==""){

        limparCampo(confirmarSenha);

        return false;

    }

    if(confirmarSenha.value!==senha.value){

        mostrarErro(
            erroConfirmarSenha,
            confirmarSenha,
            "As senhas não coincidem."
        );

        return false;

    }

    mostrarSucesso(confirmarSenha);

    return true;

}


// ======================================================
// TIPO DE USUÁRIO
// ======================================================

function validarTipoUsuario(){

    limparErro(erroTipoUsuario);

    for(const radio of tipoUsuario){

        if(radio.checked){

            return true;

        }

    }

    erroTipoUsuario.style.display="block";
    erroTipoUsuario.textContent="Selecione um tipo de usuário.";

    return false;

}


// ======================================================
// EVENTOS
// ======================================================

nome.addEventListener("input",validarNome);

email.addEventListener("input",validarEmail);

usuario.addEventListener("input",validarUsuario);

senha.addEventListener("input",()=>{

    validarSenha();

    validarConfirmarSenha();

});

confirmarSenha.addEventListener("input",validarConfirmarSenha);


// ======================================================
// SUBMIT
// ======================================================

formCadastro.addEventListener("submit",(event)=>{

    event.preventDefault();

    const valido =

        validarNome() &&
        validarEmail() &&
        validarUsuario() &&
        validarSenha() &&
        validarConfirmarSenha() &&
        validarTipoUsuario();

    if(!valido){

        return;

    }

    let usuarios = JSON.parse(

        localStorage.getItem("usuarios")

    ) || [];

    const existe = usuarios.find(

        u=>u.usuario===usuario.value.trim()

    );

    if(existe){

        mostrarErro(
            erroUsuario,
            usuario,
            "Este usuário já está cadastrado."
        );

        return;

    }

    usuarios.push({

        nome:nome.value.trim(),

        email:email.value.trim(),

        usuario:usuario.value.trim(),

        senha:senha.value,

        tipoUsuario:document.querySelector(
            'input[name="tipoUsuario"]:checked'
        ).value

    });

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

    btnCadastrar.disabled=true;

    btnCadastrar.textContent="Cadastrando...";

    setTimeout(()=>{

        alert("Cadastro realizado com sucesso!");

        window.location.href="login.html";

    },1200);

});