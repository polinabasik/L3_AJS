const BASE = 'https://jsonplaceholder.typicode.com';

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function sortPostsByTitleLength(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}


function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
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

async function showPosts() {
  try {
    const posts = await getData(`${BASE}/posts`);
    console.log('--- POSTS (по убыванию длины title) ---');
    console.log(sortPostsByTitleLength(posts));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

async function showComments() {
  try {
    const comments = await getData(`${BASE}/comments`);
    console.log('--- COMMENTS (по имени) ---');
    console.log(sortCommentsByName(comments));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

async function showUsers() {
  try {
    const users = await getData(`${BASE}/users`);
    console.log('--- USERS (только нужные поля) ---');
    console.log(pickUserFields(users));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

async function showTodos() {
  try {
    const todos = await getData(`${BASE}/todos`);
    console.log('--- TODOS (completed: false) ---');
    console.log(filterNotCompletedTodos(todos));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

showPosts();
showComments();
showUsers();
showTodos();