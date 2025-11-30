const botao = document.querySelector("button");
const campo = document.getElementById("tarefa");
const lista = document.getElementById("lista");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.feita ? "feita" : "";

    li.innerHTML = `
      <span onclick="marcar(${i})">${t.texto}</span>
      <div class="botoes">
        <button onclick="editar(${i})">Editar</button>
        <button onclick="remover(${i})">X</button>
      </div>  
    `;

    lista.appendChild(li);
  });
}


function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  renderizar();
}

botao.onclick = function() {
  const texto = campo.value;

  if (texto !== "") {
    tarefas.push({ texto: texto, feita: false });
    campo.value = "";
    salvar();
  }
};

renderizar();

function marcar(i) {
  tarefas[i].feita = !tarefas[i].feita;
  salvar();
}

function remover(i) {
  tarefas.splice(i, 1);
  salvar();
}

function editar(i) {
  const novo = prompt("Editar tarefa:", tarefas[i].texto);
  if (novo) {
    tarefas[i].texto = novo;
    salvar();
  }
}
