/* eslint-disable new-cap */
const mazeRouter = require('express').Router();
const Maze = require('../models/maze');
const {checkJwt} = require('../authz/check-jwt');
// const mongoose = require('mongoose');

// returns all the mazes in a json format
mazeRouter.get('/', async (request, response) => {
  const mazes = await Maze.find({});
  response.json({mazes});
});

// receives a maze and saves it in the database
mazeRouter.post('/', checkJwt, (request, response) => {
  const body = request.body;
  if (body == undefined) {
    return response.status(400).json({error: 'content-missing'});
  }

  const maze = new Maze({
    usernameId: body.usernameId,
    mazeBoard: body.mazeBoard,
  });

  maze.save();

  response.json(maze);
});

// gets all mazes that belongs to a specific id
mazeRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const mazes = await Maze.find({'usernameId': id});

  response.json(mazes);
});

module.exports = mazeRouter;
