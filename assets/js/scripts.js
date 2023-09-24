//Dark mode...
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
//...Dark mode

// Adicionar tarefas...
let tarefas = [];
const errorMessage = document.querySelector(".error-message");

document.querySelector(".addbutton").addEventListener("click", () => {
  adicionarTarefa();
});

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
  paragrafo.textContent = tarefa;

  divTaskBox.classList.add("added");
  divTaskBox.setAttribute("draggable", true);

  divTaskBox.querySelector(".task").remove();
  divTaskBox.querySelector(".task-content").appendChild(paragrafo);

  document.querySelector(".tasks").appendChild(divTaskBox);

  document.querySelector(".to-do").value = "";
}
// ...Adicionar tarefas


//Mover tarefas...
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
//...Mover tarefas
//choose color
document.querySelector('#colorButton1').addEventListener('click', function(){
  let colorPicker = document.querySelector("#colorPicker1");
  toogleColorPicker(colorPicker);
})
document.querySelector('#colorButton2').addEventListener('click', function(){
  let colorPicker = document.querySelector("#colorPicker2");
  toogleColorPicker(colorPicker);
})
document.querySelector('#colorButton3').addEventListener('click', function(){
  let colorPicker = document.querySelector("#colorPicker3");
  toogleColorPicker(colorPicker);
})
function toogleColorPicker(colorPicker) {
  if(colorPicker.style.display === 'none'){
    colorPicker.style.display = 'flex';
    colorPicker.innerHTML = `
      <div class="colorOption" style="background-color: red;"></div>
      <div class="colorOption" style="background-color: #ff7c00;"></div>
      <div class="colorOption" style="background-color: orange;"></div>
      <div class="colorOption" style="background-color: #e5ec00;"></div>
      <div class="colorOption" style="background-color: yellow;"></div>
      <div class="colorOption" style="background-color: #91fd00;"></div>
      <div class="colorOption" style="background-color: green;"></div>
      <div class="colorOption" style="background-color: #00ec7a;"></div>
      <div class="colorOption" style="background-color: blue;"></div>
      <div class="colorOption" style="background-color: #6d00e6;"></div>
      <div class="colorOption" style="background-color: purple;"></div>
      <div class="colorOption" style="background-color: #8B0000;"></div>`
    ;
    let colorOptions = colorPicker.getElementsByClassName('colorOption');
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].addEventListener('click', function(e){
        let buttonId = colorPicker.id.replace('colorPicker', 'colorButton');
        document.getElementById(buttonId).style.backgroundColor = e.target.style.backgroundColor;
        colorPicker.style.display = 'none';
      });
    }
  }else{
    colorPicker.style.display = 'none';
  }
}
//choose color