// Returns neighboring nodes according to how the corresponding
// chess piece moves. Call with a node, the grid, and the pieceType.
// pieceType is a string, one of the following:
// Knight, Rook, King, Bishop, Queen

//simple helper to return distance between two nodes
//used in dijkstra/A* algorithms
export function dist(a, b) {
  let x = a.row - b.row;
  let y = a.col - b.col;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function getNeighbors(node, grid, pieceType) {
  let neighbors = [];
  let r = node.row;
  let c = node.col;
  if (pieceType === "Knight") {
    //two in one direction, one in another
    //only eight possible moves, so brute-forcing
    if (r > 0 && c > 1) neighbors.push(grid[r - 1][c - 2]);
    if (r > 0 && c < grid[0].length - 2) neighbors.push(grid[r - 1][c + 2]);
    if (r > 1 && c > 0) neighbors.push(grid[r - 2][c - 1]);
    if (r > 1 && c < grid[0].length - 1) neighbors.push(grid[r - 2][c + 1]);

    if (r < grid.length - 1 && c > 1) neighbors.push(grid[r + 1][c - 2]);
    if (r < grid.length - 1 && c < grid[0].length - 2)
      neighbors.push(grid[r + 1][c + 2]);
    if (r < grid.length - 2 && c > 0) neighbors.push(grid[r + 2][c - 1]);
    if (r < grid.length - 2 && c < grid[0].length - 1)
      neighbors.push(grid[r + 2][c + 1]);
  }
  if (pieceType === "Rook") {
    //everything in the same row/column, stop if there's an obstacle
    //rows:
    for (let i = r + 1; i < grid.length; i++) {
      if (grid[i][c].isWall) break;
      neighbors.push(grid[i][c]);
    }
    for (let i = r - 1; i >= 0; i--) {
      if (grid[i][c].isWall) break;
      neighbors.push(grid[i][c]);
    }
    //cols:
    for (let i = c + 1; i < grid[r].length; i++) {
      if (grid[r][i].isWall) break;
      neighbors.push(grid[r][i]);
    }
    for (let i = c - 1; i >= 0; i--) {
      if (grid[r][i].isWall) break;
      neighbors.push(grid[r][i]);
    }
  }
  if (pieceType === "King") {
    //every immediately adjacent square within the grid boundaries
    let numRows = grid.length;
    let numCols = grid[0].length;
    // up/down/left/right
    if (r > 0) neighbors.push(grid[r - 1][c]);
    if (c > 0) neighbors.push(grid[r][c - 1]);
    if (r < numRows - 1) neighbors.push(grid[r + 1][c]);
    if (c < numCols - 1) neighbors.push(grid[r][c + 1]);
    //diagonals
    if (r > 0 && c > 0) neighbors.push(grid[r - 1][c - 1]);
    if (r > 0 && c < numCols - 1) neighbors.push(grid[r - 1][c + 1]);
    if (r < numRows - 1 && c > 0) neighbors.push(grid[r + 1][c - 1]);
    if (r < numRows - 1 && c < numCols - 1) neighbors.push(grid[r + 1][c + 1]);
  }
  if (pieceType === "Bishop") {
    //two diagonal directions, have to break if there's a wall

    //diagonal direction 1:
    let lower = Math.min(r, c);
    let upper = Math.min(grid.length - 1 - r, grid[0].length - 1 - c);
    for (let i = 1; i <= upper; i++) {
      if (grid[r + i][c + i].isWall) break;
      neighbors.push(grid[r + i][c + i]);
    }
    for (let i = -1; i >= -lower; i--) {
      if (grid[r + i][c + i].isWall) break;
      neighbors.push(grid[r + i][c + i]);
    }
    //diagonal direction 2:
    lower = Math.min(r, grid[0].length - 1 - c);
    upper = Math.min(grid.length - 1 - r, c);
    for (let i = 1; i <= upper; i++) {
      if (grid[r + i][c - i].isWall) break;
      neighbors.push(grid[r + i][c - i]);
    }
    for (let i = -1; i >= -lower; i--) {
      if (grid[r + i][c - i].isWall) break;
      neighbors.push(grid[r + i][c - i]);
    }
  }
  if (pieceType === "Queen") {
    //just copying code from rook + bishop
    //there won't be any overlap between the two

    //Rook: everything in the same row/column
    //rows:
    for (let i = r + 1; i < grid.length; i++) {
      if (grid[i][c].isWall) break;
      neighbors.push(grid[i][c]);
    }
    for (let i = r - 1; i >= 0; i--) {
      if (grid[i][c].isWall) break;
      neighbors.push(grid[i][c]);
    }
    //cols:
    for (let i = c + 1; i < grid[r].length; i++) {
      if (grid[r][i].isWall) break;
      neighbors.push(grid[r][i]);
    }
    for (let i = c - 1; i >= 0; i--) {
      if (grid[r][i].isWall) break;
      neighbors.push(grid[r][i]);
    }

    //Bishop: two diagonal directions
    //diagonal direction 1:
    let lower = Math.min(r, c);
    let upper = Math.min(grid.length - 1 - r, grid[0].length - 1 - c);
    for (let i = 1; i <= upper; i++) {
      if (grid[r + i][c + i].isWall) break;
      neighbors.push(grid[r + i][c + i]);
    }
    for (let i = -1; i >= -lower; i--) {
      if (grid[r + i][c + i].isWall) break;
      neighbors.push(grid[r + i][c + i]);
    }
    //diagonal direction 2:
    lower = Math.min(r, grid[0].length - 1 - c);
    upper = Math.min(grid.length - 1 - r, c);
    for (let i = 1; i <= upper; i++) {
      if (grid[r + i][c - i].isWall) break;
      neighbors.push(grid[r + i][c - i]);
    }
    for (let i = -1; i >= -lower; i--) {
      if (grid[r + i][c - i].isWall) break;
      neighbors.push(grid[r + i][c - i]);
    }
  }

  if (pieceType === "Pawn") {
    for (let i = r - 1; i >= 0; i--) {
      if (grid[i][c].isWall) break;
      neighbors.push(grid[i][c]);
    }
  }

  return neighbors;
}
