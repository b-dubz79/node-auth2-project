const express = require('express')

const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')
const authenticator = require('../auth/authenticator')
const server = express();

server.use(express.json());

server.use('/api/users', authenticator, usersRouter)
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
  }); //What does this server.get do?
  
  module.exports = server;