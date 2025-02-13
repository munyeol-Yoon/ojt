
let todo = JSON.parse(localStorage.getItem('todo')) || [];
const todoList = document.querySelector('#todo-list');

function handleGetTodo() {

  todoList.innerHTML = '';

  todo.map((item, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <div>${item}</div>
      <div>
        <button class="delete-button" data-index='${index}'>Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleClickDeleteTodo);
  });
}

function handleClickDeleteTodo(event) {
  const index = event.target.getAttribute('data-index');

  todo.splice(index, 1);

  localStorage.setItem('todo', JSON.stringify(todo));

  handleGetTodo();
}

function handleClickAddTodo() {
  const _insertTodoText = document.querySelector('#todo-text').value;

  todo.push(_insertTodoText);

  localStorage.setItem('todo', JSON.stringify(todo));

  document.querySelector('#todo-text').value = '';

  handleGetTodo();
}

handleGetTodo();
document.querySelector('#add-button').addEventListener('click', handleClickAddTodo);