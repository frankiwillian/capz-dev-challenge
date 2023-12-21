const express = require('express');
const search = require('./controllers/search');

const routes = express();

routes.get('/buscar/:termo', search.search);

module.exports = routes;