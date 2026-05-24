const form = document.getElementById('quizForm');
const boxResultado = document.getElementById('resultado');
const textoPlacar = document.getElementById('placarFinal');

const gabarito = [
  { id: 1, tipo: 'radio', correta: 'js' }, 
  { id: 2, tipo: 'radio', correta: 'f5' }, 
  { id: 3, tipo: 'checkbox', corretas: ['html', 'css'] },
  { id: 4, tipo: 'checkbox', corretas: ['linux', 'git'] }, 
  { id: 5, tipo: 'dissertativa' } 
];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const containerErro = document.getElementById('erro-validacao-container');
  
  if (containerErro) containerErro.style.display = 'none';

  const dados = new FormData(form);
  
  let questoesNaoRespondidas = [];
  let errosValidacao = [];

  const respostasObjeto = {
    q1: dados.get('p1'),
    q2: dados.get('p2'),
    q3: dados.getAll('p3'),
    q4: dados.getAll('p4'),
    q5: dados.get('p5') ? dados.get('p5').trim() : ""
  };

  if (!respostasObjeto.q1) questoesNaoRespondidas.push(1);
  if (!respostasObjeto.q2) questoesNaoRespondidas.push(2);
  if (respostasObjeto.q3.length === 0) questoesNaoRespondidas.push(3);
  if (respostasObjeto.q4.length === 0) questoesNaoRespondidas.push(4);
  
  if (respostasObjeto.q5 === "") {
    questoesNaoRespondidas.push(5);
  }

  if (questoesNaoRespondidas.length > 0) {
    if (questoesNaoRespondidas.length === 1) {
      errosValidacao.push(`A questão ${questoesNaoRespondidas[0]} não foi respondida.`);
    } else {
      const ultimo = questoesNaoRespondidas.pop();
      errosValidacao.push(`As questões ${questoesNaoRespondidas.join(', ')} e ${ultimo} não foram respondidas.`);
    }
  }

  if (respostasObjeto.q5 !== "") {
    const palavras = respostasObjeto.q5.split(/\s+/).filter(p => p.length > 0);
    if (palavras.length < 3) {
      errosValidacao.push("A questão dissertativa (Questão 5) deve ter, no mínimo, 3 palavras.");
    }
  }

  if (errosValidacao.length > 0) {
    let listaErros = '<h3>Por favor, corrija os seguintes erros:</h3><ul>';
    errosValidacao.forEach(erro => {
      listaErros += `<li>${erro}</li>`;
    });
    listaErros += '</ul>';
    
    if (containerErro) {
      containerErro.innerHTML = listaErros;
      containerErro.style.display = 'block';
    }
    return;
  }

  let pontuacao = 0;

  gabarito.forEach(item => {
    const cardVisual = document.getElementById(`card-q${item.id}`); 
    
    if (item.tipo === 'radio') {
      const respUsuario = respostasObjeto[`q${item.id}`];
      if (respUsuario === item.correta) {
        pontuacao += 2;
        marcarVisual(cardVisual, true);
      } else {
        marcarVisual(cardVisual, false);
      }
    } 
    
    else if (item.tipo === 'checkbox') {
      const respUsuario = respostasObjeto[`q${item.id}`]; 
      
      const acertouTodas = item.corretas.length === respUsuario.length && 
        item.corretas.every(val => respUsuario.includes(val));
      
      if (acertouTodas) {
        pontuacao += 2;
        marcarVisual(cardVisual, true);
      } else {
        marcarVisual(cardVisual, false);
      }
    } 
    
    else if (item.tipo === 'dissertativa') {
      pontuacao += 2; 
    }
  });

  textoPlacar.innerHTML = `Sua pontuação total foi: ${pontuacao} / 10 pontos.`;
  boxResultado.style.display = 'block';

  document.querySelectorAll('#saida').forEach(pre => {
    pre.textContent = JSON.stringify(respostasObjeto, null, 2);
  });
});

function marcarVisual(elemento, IsCorreto) {
  if (!elemento) return;
  if (IsCorreto) {
    elemento.style.borderColor = "#04d361";
    elemento.style.backgroundColor = "#fbfafa";
  } else {
    elemento.style.borderColor = "#ff3b30";
    elemento.style.backgroundColor = "#fff5f5";
  }
}