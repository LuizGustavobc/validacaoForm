const inputNome = document.getElementById("input_nome");
const inputEmail = document.getElementById("input_email");
const inputSenha = document.getElementById("input_senha");
const inputConfSenha = document.getElementById("input_confSenha");

const erroNome = document.getElementById("erro_nome");
const erroEmail = document.getElementById("erro_email");
const erroSenha = document.getElementById("erro_senha");
const erroConfSenha = document.getElementById("erro_confSenha");

const btnConf = document.getElementById("enviar");
const retorno = document.getElementById("retorno_json");

const regexNome = /^[A-Za-zÀ-Ö]{3,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;

limpaErro();
estdoBtn();

document.addEventListener("keyup", validaCampos);
btnConf.addEventListener("click", preparaDados)

function validaCampos(){
    
    retorno.style.display = 'none';

    let erro = false;
    limpaErro();
    estdoBtn();

    if(!regexNome.test(inputNome.value.trim())){
        erroNome.innerText = "Formato de nome invalido";
        erroNome.style.color = "#FF2F00";
        erroNome.style.textAlign = "center";

        erro = true;
    }else{
        erroNome.innerText = "Formato de nome valido ✅";  
        erroNome.style.color = "#00ff37";
    }

    if(!regexEmail.test(inputEmail.value.trim())){
        erroEmail.innerText = "Formato de E-mail invalido";
        erroEmail.style.color = "#FF2F00";
        erroEmail.style.textAlign = "center";

        erro = true;
    }else{
        erroEmail.innerText = "Formato de E-mail valido ✅";  
        erroEmail.style.color = "#00ff37";
    }

    if(!regexSenha.test(inputSenha.value.trim())){
        erroSenha.innerText = "Formato de senha invalido";
        erroSenha.style.color = "#FF2F00";
        erroSenha.style.textAlign = "center";

        erro = true;
    }else{
        erroSenha.innerText = "Formato de senha valido ✅";  
        erroSenha.style.color = "#00ff37";
    }

    if(inputConfSenha.value.trim() != inputSenha.value.trim() || inputConfSenha.value.trim().length == 0){
        erroConfSenha.innerText = "Senha diferente da anterior";
        erroConfSenha.style.color = "#FF2F00";
        erroConfSenha.style.textAlign = "center";

        erro = true;
    }else{
        erroConfSenha.innerText = "Senha correspondente a anterior ✅";  
        erroConfSenha.style.color = "#00ff37";
    }

    if(!erro){
        btnConf.disabled = false;
        btnConf.style.backgroundColor = "#4a90e2";
    }
}

function preparaDados(){
    event.preventDefault();
    estdoBtn();

    retorno.style.display = 'block';

    let dados = {
        nome: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        senha: "[protegido]"
    }

    retorno.innerHTML = `<h3>Dados enviados...</h3></br><p>${JSON.stringify(dados, null, 2)}</p>`;
    
    limpaCampos();
    limpaErro();
}
function estdoBtn(){
    btnConf.style.backgroundColor = "#99c3f3";
    btnConf.disabled = true;
}
function limpaErro(){
    erroNome.innerText = "";
    erroEmail.innerText = "";
    erroSenha.innerText = "";
    erroConfSenha.innerText = "";
}
function limpaCampos(){
    inputNome.value = "";
    inputEmail.value = "";
    inputSenha.value = "";
    inputConfSenha.value = "";
}