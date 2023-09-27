const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Adicionar tarefas .....
const tarefas = [];

document.querySelector(".addbutton").addEventListener("click", () => {
  const tarefa = document.querySelector(".input1").value;

  tarefas.push(tarefa);

  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa;

  document.querySelector(".taskbox").appendChild(paragrafo);

  document.querySelector(".input1").value = "";
});
// .....Adicionar tarefas 