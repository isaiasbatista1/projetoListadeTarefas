// Dark mode...
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
// ...Dark mode

// Adicionar tarefas...
let tarefas = [];
const errorMessage = document.querySelector(".error-message");

document.querySelector(".addbutton").addEventListener("click", adicionarTarefa);
document.querySelector(".to-do").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

function adicionarTarefa() {
  const tarefa = document.querySelector(".to-do").value;

  if (tarefa.trim() === "") {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";
  tarefas.push(tarefa);

  const divTaskBox = document.querySelector(".taskbox").cloneNode(true);
  const paragrafo = document.createElement("p");
  paragrafo.setAttribute("id", "meuId");
  paragrafo.textContent = tarefa;

  const menu = document.createElement("ul");
  menu.classList.add("menu");

  const menuItem = document.createElement("li");
  const menuLink = document.createElement("a");
  menuLink.setAttribute("href", "#");
  const menuDotsIcon = document.createElement("img");
  menuDotsIcon.setAttribute("src", "assets/images/dots-horizontal.svg");
  menuDotsIcon.setAttribute("alt", "");
  menuLink.appendChild(menuDotsIcon);
  menuItem.appendChild(menuLink);

  const subMenu = document.createElement("ul");
  const excluirItem = document.createElement("li");
  const editarItem = document.createElement("li");

  const excluirLink = document.createElement("a");
  excluirLink.classList.add("excluir");
  excluirLink.setAttribute("href", "#");
  excluirLink.textContent = "Excluir";

  const editarLink = document.createElement("a");
  editarLink.classList.add("editar");
  editarLink.setAttribute("href", "#");
  editarLink.textContent = "Editar";

  excluirItem.appendChild(excluirLink);
  editarItem.appendChild(editarLink);

  subMenu.appendChild(excluirItem);
  subMenu.appendChild(editarItem);

  menuItem.appendChild(subMenu);
  menu.appendChild(menuItem);
  // Adicionar tarefas...

  //Inserir data e hora...
  const spanData = document.createElement("span");
  spanData.classList.add("task-date");
  const dataAtual = new Date();
  const dia = dataAtual.toLocaleString("pt-BR", { day: "2-digit" });
  const mes = dataAtual.toLocaleString("pt-BR", { month: "2-digit" });
  const ano = dataAtual.toLocaleString("pt-BR", { year: "numeric" });
  const hora = dataAtual.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  spanData.textContent = `${dia}/${mes}/${ano} - ${hora}`;

  divTaskBox.classList.add("added");
  divTaskBox.setAttribute("draggable", true);

  divTaskBox.querySelector(".task").remove();

  divTaskBox.querySelector(".task-content").appendChild(spanData);
  divTaskBox.querySelector(".task-content").appendChild(menu);
  divTaskBox.querySelector(".task-content").appendChild(paragrafo);


  document.querySelector(".tasks").appendChild(divTaskBox);

  document.querySelector(".to-do").value = "";
}
//Inserir data e hora...

// Mover tarefas...
const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}
// ...Mover tarefas


//Limpar tarefas concluídas
const limparFeitoButton = document.getElementById("clear-all");
limparFeitoButton.addEventListener("click", () => {
  const completedTasksDiv = document.querySelector(".completed-taks");
  completedTasksDiv.textContent = "";
});

//Remover e Editar Tarefa
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest(".taskbox");

  if (targetEl.classList.contains("excluir")) {
    parentEl.remove();
  } else if (targetEl.classList.contains("editar")) {
    const paragrafo = parentEl.querySelector("p#meuId");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = paragrafo.textContent;
    //Remover e Editar Tarefa

    // Substituir o parágrafo pelo input para edição.
    parentEl.querySelector(".task-content").replaceChild(input, paragrafo);

    // Adicionar um evento de tecla para salvar a edição quando pressionar Enter.
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        paragrafo.textContent = input.value;
        parentEl.querySelector(".task-content").replaceChild(paragrafo, input);
      }
    });
  }
});

//Pop-up inicial

window.addEventListener("load", function () {
  setTimeout(
    function open(event) {
      document.querySelector(".popup").style.display = "block";
    },
    1000
  )
});
document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});