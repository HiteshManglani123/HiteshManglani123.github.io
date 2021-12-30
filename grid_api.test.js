/* eslint-disable max-len */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Maze = require('../models/maze');
const api = supertest(app);
const generateMaze = require('../utils/for_testing').generateMaze;
const generateEvenMaze = require('../utils/for_testing').generateEvenMaze;
// const axios = require('axios');
// const {DOMAIN, AUDIENCE, CLIENT_ID, CLIENT_SECRET} = require('../utils/config.js');
const axios = require('axios');


const initialMaze = [
  {
    usernameId: 'user1',
    mazeBoard: generateMaze(25, 60),
  },
  {
    usernameId: 'user2',
    mazeBoard: generateEvenMaze(25, 60),
  },
];

beforeEach(async () => {
  await Maze.deleteMany({});
  let mazeObject = Maze(initialMaze[0]);
  await mazeObject.save();
  mazeObject = Maze(initialMaze[1]);
  await mazeObject.save();
});

test('mazes are returned as json', async () => {
  await api
      .get('/api/mazes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
});

test('Initially, there are only 2 mazes', async () => {
  const response = await api.get('/api/mazes');
  expect(response.body.mazes).toHaveLength(initialMaze.length);
});

test('You can save a custom maze', async () => {
  const mazeBoard = generateEvenMaze(25, 60);
  const usernameId = 'user3';

  const mazeObject = Maze({usernameId, mazeBoard});
  await mazeObject.save();

  const response = await api.get('/api/mazes');
  const responseLength = response.body.mazes.length;
  expect(response.body.mazes).toHaveLength(initialMaze.length + 1);
  expect(response.body.mazes[responseLength - 1].usernameId)
      .toBe('user3');
});

test('You can save a custom maze (with token)', async () => {
  const mazeBoard = generateEvenMaze(25, 60);
  const usernameId = 'user4';

  const mazeObject = {
    usernameId: usernameId,
    mazeBoard: mazeBoard,
  };

  const options = {
    method: 'POST',
    url: 'https://dev-e1nofomy.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: '{"client_id":"xFvJo0DlRjxHtEazFlxND90JWrOXmZAK","client_secret":"IqcaadyiE7hb9HAX43xa2IUVscslq53AxdW_SUixYVEabmdHwsLP_0MCsuNMCh69","audience":"https://express.sample","grant_type":"client_credentials"}'};

  const response = await axios.request(options);
  const accessToken = response.data.access_token;

  const responseMaze = await api.post('/api/mazes').send(mazeObject).set('Authorization', `bearer ${accessToken}`).expect(200);

  const savedMaze = responseMaze.body;
  expect(savedMaze.usernameId).toEqual(mazeObject.usernameId);
  expect(savedMaze.mazeBoard).toEqual(mazeObject.mazeBoard);
});

test('You can not save a custom maze without a token', async () => {
  const mazeBoard = generateEvenMaze(25, 60);
  const usernameId = 'user5';

  const mazeObject = {
    usernameId: usernameId,
    mazeBoard: mazeBoard,
  };

  const responseFailed = await api.post('/api/mazes').send(mazeObject);

  expect(responseFailed.res.statusCode).toEqual(401);
  expect(responseFailed.res.statusMessage).toEqual('Unauthorized');
});

test('You can not save a maze with the wrong token', async () => {
  const mazeBoard = generateEvenMaze(25, 60);
  const usernameId = 'user6';

  const mazeObject = {
    usernameId: usernameId,
    mazeBoard: mazeBoard,
  };

  const accessToken = 'Should not work';

  const responseFailed = await api.post('/api/mazes').send(mazeObject).set('Authorization', `bearer ${accessToken}`);

  expect(responseFailed.res.statusCode).toEqual(401);
  expect(responseFailed.res.statusMessage).toEqual('Unauthorized');
});


test('You can receive mazes for a specific person', async () => {
  const usernameId = 'user1';
  const mazes = await Maze.find({'usernameId': usernameId});
  expect(mazes).toHaveLength(1);
  expect(mazes[0].usernameId).toBe(usernameId);
});

test('You can receive mazes for a specific person through the api', async () => {
  const usernameId = 'user1';
  const response = await api.get(`/api/mazes/${usernameId}`);
  const mazes = response.body;
  expect(mazes).toHaveLength(1);
  expect(mazes[0].usernameId).toBe(usernameId);
});

afterAll(() => {
  mongoose.connection.close();
});
