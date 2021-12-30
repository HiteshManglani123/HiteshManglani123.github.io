# Pathfinding visualizer backend
Node.js backend for fullstack application using React, Node.js, Express and MongoDB
Its tested using a combination of jest and supertest

# Frontend [https://github.com/HiteshManglani123/pathfinding-frontend](https://github.com/HiteshManglani123/pathfinding-frontend)


This is a pathfinding visualizer to visualize how each sort of pathfinding algorithm works. Currently I only have the A* alogrithm with the Manhattan heuristic and dijkstras implemented but I am looking to extend that to multiple visualizers and heuristics in the future f.e breath first search, depth first search, swarm and etc. As a user you can also save mazes for future viewing.

# Installation

To run and view this application you need to:

Go to terminal and run the following commands:

1. Clone this repository
```
git clone https://github.com/HiteshManglani123/pathfinding-backend.git
```
2. Navigate to the correct directory
```
cd pathfinding-backend
```
3. Open up terminal and install dependencies: npm install
```
npm install
```
4. Start the server in development mode with hot reload
```
npm run dev
```
5. Go to one of the routes (found in controller) f.e: localhost:5001/api/grids


# Contributions
All the possible contributions can be found in the github projects section
The coding standards are available in the eslint file
After updating/adding a feature, a pull request should be made with the following:
1. The code changed you made
2. Unit tests for the code changes
3. Proper documentation for the code changes


MIT License

Copyright (c) 2021 Hitesh Manglani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
