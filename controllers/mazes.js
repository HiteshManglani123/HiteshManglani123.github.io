/* eslint-disable new-cap */
const mazeRouter = require('express').Router();
const Maze = require('../models/Maze');
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
    typeOfAlgorithm: body.typeOfAlgorithm,
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

mazeRouter.get('/stats/:id', async (request, response) => {
  const id = request.params.id;
  const mazes = await Maze.find({'usernameId': id});
  const dijkstraMazes = mazes.filter((maze) =>
    maze.typeOfAlgorithm === 'Dijkstras');
  const aStarMazes = mazes.filter((maze) => maze.typeOfAlgorithm === 'aStar');

  response.json({totalMazes: mazes.length, dijkstraMazes: dijkstraMazes.length,
    aStarMazes: aStarMazes.length});
});

module.exports = mazeRouter;
