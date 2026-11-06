const https = require('https');

const BASE = 'https://jsonplaceholder.typicode.com';

function getData(url, callback) {
  https
    .get(url, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          callback(null, JSON.parse(body));
        } catch (err) {
          callback(err);
        }
      });
    })
    .on('error', (err) => callback(err));
}

function sortPostsByTitleLength(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}

function showPosts() {
  getData(`${BASE}/posts`, (err, posts) => {
    if (err) {
      console.error('Ошибка:', err);
      return;
    }
    console.log('--- POSTS (по убыванию длины title) ---');
    console.log(sortPostsByTitleLength(posts));
  });
}

function showComments() {
  getData(`${BASE}/comments`, (err, comments) => {
    if (err) {
      console.error('Ошибка:', err);
      return;
    }
    console.log('--- COMMENTS (по имени) ---');
    console.log(sortCommentsByName(comments));
  });
}

showPosts();
showComments();