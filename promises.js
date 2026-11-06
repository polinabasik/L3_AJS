const BASE = 'https://jsonplaceholder.typicode.com';

function getData(url) {
  return fetch(url).then((response) => response.json());
}


function pickUserFields(users) {
  return users.map(({ id, name, username, email, phone }) => ({
    id,
    name,
    username,
    email,
    phone,
  }));
}

function filterNotCompletedTodos(todos) {
  return todos.filter((todo) => todo.completed === false);
}


function showUsers() {
  getData(`${BASE}/users`)
    .then((users) => {
      console.log('--- USERS (только нужные поля) ---');
      console.log(pickUserFields(users));
    })
    .catch((err) => console.error('Ошибка:', err));
}


function showTodos() {
  getData(`${BASE}/todos`)
    .then((todos) => {
      console.log('--- TODOS (completed: false) ---');
      console.log(filterNotCompletedTodos(todos));
    })
    .catch((err) => console.error('Ошибка:', err));
}

showUsers();
showTodos();