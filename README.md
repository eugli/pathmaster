# 🛤️ Pathmaster
[Pathmaster](https://pathmaster.rocks/)  is an innovative web app designed to visualize pathfinding concepts through chess pieces, aiming to make learning and understanding pathfinding fun and interactive. Developed as a part of COP3530: Data Structures and Algorithms at the University of Florida, Pathmaster won 1st place. 🏆

## 🌟 Introduction
Pathmaster utilizes React to create a rich, user-friendly experience, helping users delve deep into the world of pathfinding, bridging the gap between theory and practice. It presents a unique approach to understanding complex algorithms, by leveraging the familiarity and structural intricacies of chess.

## 🚀 Getting Started
To set up Pathmaster locally, follow these steps:
1. Clone the repository: `git clone <https://github.com/eugli/Pathmaster.git>`
2. Navigate to the project directory: `cd Pathmaster`
3. Install dependencies: `npm install` 
4. Run the development server: `npm run start` 
5. Open your browser and go to `http://localhost:3000` to access the application.

### Prerequisites
- Ensure that Node.js is installed. If not, download it from [Node.js](https://nodejs.org/).
- Any additional setups or installations required should be listed here.

## 💻 Usage
Pathmaster offers various functionalities and settings:
- **1**: Navigate to 'http://localhost:3000'.
- **2**: Select a chess piece you would like to visualize.
- **3**: Select an algorithm you would like to visualize.
- **4**: Draw obstacles by holding down the left-click button on a mouse or holding down on the trackpad.
- **5**: Click run to simulate the algorithm.
- **6**: Click reset if you would like to try out other algorithms or chess pieces.

## 🤝 Contribution Guidelines
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b <branch-name>`.
3. Make your changes and commit them: `git commit -m '<commit-message>'`
4. Push the branch: `git push origin <branch-name>`
5. Create a pull request.

Please adhere to this project’s coding conventions and standards. For major changes, open an issue first to discuss what you would like to change.

## 📜 License
Pathmaster is licensed under MIT. For more information, please refer to the [LICENSE](<https://github.com/zhengiy/Pathmaster/blob/main/LICENSE>) file.




## Todo
- [x] fix button animation
- [x] fix reset button
- [x] change node component to behave like an actual component
- [ ] better dynamic placement of header, grid, and footer (make it fullscreen)
- [x] make grid into its own component
- [ ] avoid holes when highlighting fast
- [x] dynamic grid sizing based on size of screen
- [x] add animation when inserting wall and removing wall
- [ ] add movable start and finish nodes
- [ ] add more algorithms (is A* weighted bugged)--bidirectional, DFS/IDS?
- [x] optimize code to only update relevant nodes, not the entire grid!!!!!!!!!!!! (might need to refactor everything)
- [ ] add further optimizations to make it run like butter
- [x] implement pawn easter egg
- [x] slow down animation a little bit
- [ ] add hidden tribute to Aman (over the heart in the footer)
- [ ] add indication for no path found
- [ ] pause animation when not on screen
- [ ] add little chess piece to path visualization (remove filling in every square in between and just have the piece jump node to node)
- [ ] create logo and favicon
- [ ] redesign header UI to have minimal text
- [ ] add an info modal that gives a tutorial / explains what the different colors mean / what the controls are
- [ ] ability to change between preset wall patterns (random walls, preset maze, cool patterns)
- [ ] ability to change between different board themes (dark mode, very important)
- [ ] redraft UI and color scheme (remove "select" text)
- [ ] fix all the CSS to be dynamic and flexible
- [ ] add modal explaining control and choices (could be a sort of key)
- [ ] write readme
- [ ] comment code
- [x] make video demo and other documentation for project submission
- [x] fix styling of run and reset buttons
- [ ] make header and footer much smaller
- [ ] option to speed up animation
- [ ] keyboard shortcuts (r for run? c for reset / clear?)
- [ ] reorder pieces to be in chess piece value
- [ ] hover over piece to see how it moves modal 
- [ ] experiment with Bellman Ford algorithm
