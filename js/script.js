'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = function () {
  todoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];
};
todoData();

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';
  localStorage.setItem('todoData', JSON.stringify(todoData));

  todoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    btnTodoRemove.addEventListener('click', function () {
      todoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if (newTodo.value != '') {
    todoData.push(newTodo);
  } else {
    alert('Введите название задачи!');
  }

  render();
});

render();
