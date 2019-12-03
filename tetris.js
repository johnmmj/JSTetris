// working on spinning the block and making it re-appear

const canvas = document.getElementById('game-layer')
const context = canvas.getContext('2d')

const blockWidth = 25
const blockHeight = 25
const pixel = 25
let rightPressed = false
let rightArleadyPressedOnce = false
let leftPressed = false
let leftArleadyPressedOnce = false
let downPressed = false
let downAlreadyPressedOnce = false
let currentBlock
let currentBlockLocation = [0, 4]
let dPressed = false
let dAlreadyPressedOnce = false
let blockNum = 0
let aAlreadyPressedOnce = false
let aPressed = false
let collision = false

const grid = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
]

const iBlock = []
iBlock[0] = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
]
iBlock[1] = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
iBlock[2] = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
]
iBlock[3] = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

const squareBlock = []
squareBlock[0] = [
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
squareBlock[1] = squareBlock[0]
squareBlock[2] = squareBlock[0]
squareBlock[3] = squareBlock[0]

const lBlock = []
lBlock[0] = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]
lBlock[1] = [
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0]
]
lBlock[2] = [
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]
lBlock[3] = [
  [0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

const zBlock = []
zBlock[0] = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
zBlock[1] = [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]
zBlock[2] = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]
zBlock[3] = [
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0]
]

const backLBlock = []
backLBlock[0] = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]
]
backLBlock[1] = [
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
backLBlock[2] = [
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]
backLBlock[3] = [
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
]

const backZBlock = []
backZBlock[0] = [
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
backZBlock[1] = [
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
]
backZBlock[2] = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]
]
backZBlock[3] = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]

const tBlock = []
tBlock[0] = [
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
tBlock[1] = [
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]
tBlock[2] = [
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]
tBlock[3] = [
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]

const blockList = [
  iBlock, lBlock, backLBlock, zBlock, backZBlock, squareBlock, tBlock
]

function getRandomBlock () {
  return blockList[Math.floor(Math.random() * Math.floor(blockList.length))]
}

function drawBoard () {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 1) {
        context.beginPath()
        context.fillStyle = 'blue'
        context.fillRect(col * blockWidth, row * blockHeight, pixel, blockHeight)
        context.closePath()
      } else if (grid[row][col] === 2) {
        context.beginPath()
        context.fillStyle = 'blue'
        context.fillRect(col * blockWidth, row * blockHeight + 25, blockWidth + pixel, pixel)
        context.closePath()
      } else if (grid[row][col] === 3) {
        context.beginPath()
        context.fillStyle = 'blue'
        context.fillRect(col * blockWidth, row * blockHeight, pixel, blockHeight)
        context.fillRect(col * blockWidth, row * blockHeight + 25, blockWidth, pixel)
        context.closePath()
      } else if (grid[row][col] === 4) {
        context.beginPath()
        context.fillStyle = 'red'
        context.fillRect(col * blockWidth, row * blockHeight + 25, blockWidth, blockHeight)
        context.closePath()
      } else if (grid[row][col] === 5) {
        context.beginPath()
        context.fillStyle = 'brown'
        context.fillRect(col * blockWidth, row * blockHeight + 25, blockWidth, blockHeight)
        context.closePath()
      }
    }
  }
}

function addNewBlock (blockType, xPos, yPos) {
  currentBlock = blockType
  currentBlockLocation = [xPos, yPos]
  for (let row = 0; row < blockType[0].length; row++) {
    for (let col = 0; col < blockType[0][row].length; col++) {
      if (blockType[0][row][col] === 1) {
        if (grid[xPos + row][yPos + col] !== 0) {
          window.alert('Game Over')
          document.location.reload()
          clearInterval()
        }
      }
    }
  }
  for (let row = 0; row < blockType[0].length; row++) {
    for (let col = 0; col < blockType[0][row].length; col++) {
      if (blockType[0][row][col] === 1) {
        grid[xPos + row][yPos + col] = 4
      }
    }
  }
}

function addBlockAt (blockType, xPos, yPos) {
  currentBlock = blockType
  currentBlockLocation = [xPos, yPos]
  for (let row = 0; row < blockType[blockNum].length; row++) {
    for (let col = 0; col < blockType[blockNum][row].length; col++) {
      if (blockType[blockNum][row][col] === 1) {
        if (grid[xPos + row][yPos + col] !== 0) {
          return true
        }
      }
    }
  }
  for (let row = 0; row < blockType[blockNum].length; row++) {
    for (let col = 0; col < blockType[blockNum][row].length; col++) {
      if (blockType[blockNum][row][col] === 1) {
        grid[xPos + row][yPos + col] = 4
      }
    }
  }
  return false
}

function removeBlock () {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 4) {
        grid[row][col] = 0
      }
    }
  }
}

function spinBlockRight () {
  blockNum += 1
  if (blockNum > 3) {
    blockNum = 0
  }
  removeBlock()
  collision = addBlockAt(currentBlock, currentBlockLocation[0], currentBlockLocation[1])
  if (collision) {
    spinBlockLeft()
  }
}

function spinBlockLeft () {
  blockNum -= 1
  if (blockNum < 0) {
    blockNum = 3
  }
  removeBlock()
  collision = addBlockAt(currentBlock, currentBlockLocation[0], currentBlockLocation[1])
  if (collision) {
    spinBlockRight()
  }
}

function blockRight () {
  for (let row = 0; row < grid.length; row++) {
    for (let col = grid[row].length; col >= 0; col--) {
      if (grid[row][col] === 4 && grid[row][col + 1] === 4) {
      } else if (grid[row][col] === 4 && grid[row][col + 1] !== 0) {
        return true
      }
    }
  }
  for (let row = grid.length - 1; row >= 0; row--) {
    for (let col = grid[row].length - 1; col >= 0; col--) {
      if (grid[row][col] === 4) {
        grid[row][col] = 0
        grid[row][col + 1] = 4
      }
    }
  }
  currentBlockLocation[1] += 1
}

function blockLeft () {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 4 && grid[row][col - 1] === 4) {
      } else if (grid[row][col] === 4 && grid[row][col - 1] !== 0) {
        return true
      }
    }
  }
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 4) {
        grid[row][col] = 0
        grid[row][col - 1] = 4
      }
    }
  }
  currentBlockLocation[1] -= 1
}

function blockDown () {
  for (let row = grid.length - 1; row >= 0; row--) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 4 && grid[row + 1][col] === 4) {
      } else if (grid[row][col] === 4 && grid[row + 1][col] !== 0) {
        for (let rows = 0; rows < grid.length; rows++) {
          for (let cols = 0; cols < grid[row].length; cols++) {
            if (grid[rows][cols] === 4) {
              grid[rows][cols] = 5
            }
          }
        }
        for (let tempNum = 0; tempNum < 50; tempNum++) {
          checkRows()
        }
        return addNewBlock(getRandomBlock(), 0, 4)
      }
    }
  }
  for (let row = grid.length - 1; row >= 0; row--) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 4) {
        grid[row][col] = 0
        grid[row + 1][col] = 4
      }
    }
  }
  currentBlockLocation[0] += 1
}

function checkRows () {
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][1] === 5 && grid[row][2] === 5 && grid[row][3] === 5 &&
      grid[row][4] === 5 && grid[row][5] === 5 && grid[row][6] === 5 &&
      grid[row][7] === 5 && grid[row][8] === 5 && grid[row][9] === 5 &&
      grid[row][10] === 5) {
      for (let col = 1; col <= 10; col++) {
        grid[row][col] = 0
      }
    }
  }
  for (let row = grid.length - 2; row >= 0; row--) {
    if (grid[row + 1][1] === 0 && grid[row + 1][2] === 0 && grid[row + 1][3] === 0 &&
      grid[row + 1][4] === 0 && grid[row + 1][5] === 0 && grid[row + 1][6] === 0 &&
      grid[row + 1][7] === 0 && grid[row + 1][8] === 0 && grid[row + 1][9] === 0 &&
      grid[row + 1][10] === 0) {
      for (let col = 1; col <= 10; col++) {
        grid[row + 1][col] = grid[row][col]
        grid[row][col] = 0
      }
    }
  }
}

function controls () {
  if (rightPressed && rightArleadyPressedOnce === false) {
    rightArleadyPressedOnce = true
    blockRight()
  }
  if (leftPressed && leftArleadyPressedOnce === false) {
    leftArleadyPressedOnce = true
    blockLeft()
  }
  if (downPressed && downAlreadyPressedOnce === false) {
    downAlreadyPressedOnce = true
    blockDown()
  }
  if (dPressed && dAlreadyPressedOnce === false) {
    dAlreadyPressedOnce = true
    spinBlockRight()
  }
  if (aPressed && aAlreadyPressedOnce === false) {
    aAlreadyPressedOnce = true
    spinBlockLeft()
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyUpHandler (e) {
  if (e.key === 'ArrowRight') {
    rightPressed = false
    rightArleadyPressedOnce = false
  }
  if (e.key === 'ArrowLeft') {
    leftPressed = false
    leftArleadyPressedOnce = false
  }
  if (e.key === 'ArrowDown') {
    downPressed = false
    downAlreadyPressedOnce = false
  }
  if (e.key === 'd') {
    dPressed = false
    dAlreadyPressedOnce = false
  }
  if (e.key === 'a') {
    aPressed = false
    aAlreadyPressedOnce = false
  }
}
function keyDownHandler (e) {
  if (e.key === 'ArrowRight' && rightPressed === false) {
    rightPressed = true
  } else if (e.key === 'ArrowRight' && rightArleadyPressedOnce === true) {
    rightPressed = false
  }
  if (e.key === 'ArrowLeft' && leftPressed === false) {
    leftPressed = true
  } else if (e.key === 'ArrowLeft' && leftArleadyPressedOnce === true) {
    leftPressed = false
  }
  if (e.key === 'ArrowDown' && downPressed === false) {
    downPressed = true
  } else if (e.key === 'ArrowDown' && downAlreadyPressedOnce === true) {
    downPressed = false
  }
  if (e.key === 'd' && dPressed === false) {
    dPressed = true
  } else if (e.key === 'd' && dAlreadyPressedOnce === true) {
    dPressed = false
  }
  if (e.key === 'a' && aPressed === false) {
    aPressed = true
  } else if (e.key === 'a' && aAlreadyPressedOnce === true) {
    aPressed = false
  }
}

function clearScreen () {
  context.beginPath()
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function draw () {
  clearScreen()
  controls()
  drawBoard()
}

addNewBlock(getRandomBlock(), 0, 4)

setInterval(draw, 10)
setInterval(blockDown, 1000)
