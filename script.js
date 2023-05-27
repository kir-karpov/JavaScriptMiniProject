"use strict";

class Employee {
  constructor(name, age, position, children) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.children = children;
  }
}

class Engineer extends Employee {
  constructor(name, age, position, children, specialization) {
    super(name, age, position, children);
    this.specialization = specialization;
  }
}

function deleteEntity(index) {
  entities.splice(index, 1);
  renderTable();
  saveToLocalStorage();
}

function renderTable() {
  const tableBody = document.querySelector("#entityTable tbody");
  tableBody.innerHTML = "";

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = entity.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = entity.age;
    row.appendChild(ageCell);

    const positionCell = document.createElement("td");
    positionCell.textContent = entity.position;
    row.appendChild(positionCell);

    const childrenCell = document.createElement("td");
    childrenCell.textContent = entity.children ? "Да" : "Нет";
    row.appendChild(childrenCell);

    const creatorClassCell = document.createElement("td");
    creatorClassCell.textContent = entity.constructor.name;
    row.appendChild(creatorClassCell);

    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
      deleteEntity(i);
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell);

    tableBody.appendChild(row);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("entities", JSON.stringify(entities));
}

function loadFromLocalStorage() {
  const entitiesData = localStorage.getItem("entities");
  if (entitiesData) {
    entities = JSON.parse(entitiesData);
    renderTable();
  }
}

document.querySelector("#entityForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;
  const position = document.querySelector("#position").value;
  const children = document.querySelector("#children").checked;
  const creatorClass = document.querySelector("#creatorClass").value;

  let newEntity;

  if (creatorClass === "employee") {
    newEntity = new Employee(name, age, position, children);
  } else if (creatorClass === "engineer") {
    const specialization = prompt("Введите специализацию инженера:");
    newEntity = new Engineer(name, age, position, children, specialization);
  }

  if (newEntity) {
    entities.push(newEntity);
    renderTable();
    saveToLocalStorage();
    document.querySelector("#entityForm").reset();
  }
});

let entities = [];

loadFromLocalStorage();
