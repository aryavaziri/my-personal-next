let m, n, a, dir, array2, speed
function setup() {
  array2 = []
  m = 15 // rows
  n = 12 // columns
  dir = 0
  limit = Array(n)
  elempos = Array(n)
  movement = Array(n)
  game = Array(m) //game[m][n]
    .fill()
    .map((entry) => Array(n).fill(0)) // game=new Array(r)
  b = Array(4) //game[m][n]
    .fill()
    .map((entry) => Array(n).fill(0)) // game=new Array(r)

  game2 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1]
  ]
  // console.log(game);
  // frameRate(60);
  createCanvas(windowWidth, 500)
  strokeWeight(3)
  stroke(100)
  frameRate(50)
  background(50, 150, 150)
  noFill()
  lost = 0
  available = 0
  move_available = 1
  rr = 0
  ll = 0
  tempr = 0
  templ = 0
  speed = 2
  speed_var = 1000 / speed
  setInterval(mover, speed_var)
}
// let i2ntervall = keyIsDown(DOWN_ARROW) ? 100 : 1000;
// setInterval(mover, if(keyIsDown(DOWN_ARROW)){100});
// setInterval(mover, 1000);
function draw() {
  // translate(windowWidth/)
  if (keyIsDown(DOWN_ARROW)) {
    if (rr % 2) {
      mover()
    }
    rr++
  }
  // button = createButton("LEFT");
  // button.position(100, 500);
  // button.mousePressed(left);
  // button = createButton("RIGHT");
  // button.position(300, 500);
  // button.mousePressed(right);
  // button = createButton("ROTATE");
  // button.position(200, 500);
  // button.mousePressed(rot);

  // if(keyIsDown(DOWN_ARROW)){console.log("DOWN")}
  background(50, 150, 150)
  noFill()
  push()
  translate(width / 2 - (n * 25) / 2, 50)
  rect(0, 0, n * 25, m * 25)
  if (!available) {
    createRandomObject()
  }
  push()
  translate(0, (1 - lost) * ((millis() % 500) / 20) - 25)
  stroke(30)
  renderGame(b)
  pop()

  stroke(30)
  renderGame(game)
  pop()
  if (lost) {
    lost_f()
  }
}
function lost_f() {
  background(color(0, 0, 0, 150))
  push()
  translate(windowWidth / 2 - 300, 0)
  stroke(100)
  translate(12.5 + sin(millis() / 150) * 10, 100)
  gameOver = [
    [
      0,
      "a",
      "a",
      "a",
      0,
      0,
      "b",
      "b",
      0,
      0,
      "c",
      0,
      0,
      0,
      "c",
      0,
      "d",
      "d",
      "d"
    ],
    ["a", 0, 0, 0, 0, "b", 0, 0, "b", 0, "c", "c", 0, "c", "c", 0, "d"],
    [
      "a",
      0,
      "a",
      "a",
      0,
      "b",
      "b",
      "b",
      "b",
      0,
      "c",
      0,
      "c",
      0,
      "c",
      0,
      "d",
      "d",
      "d"
    ],
    ["a", 0, 0, "a", 0, "b", 0, 0, "b", 0, "c", 0, 0, 0, "c", 0, "d", 0, 0],
    [0, "a", "a", 0, 0, "b", 0, 0, "b", 0, "c", 0, 0, 0, "c", 0, "d", "d", "d"]
  ]
  renderGame(gameOver)
  pop()
  push()
  translate(windowWidth / 2 - 200, 0)
  translate(12.5 - sin(millis() / 150) * 10, 275)
  gameOver2 = [
    [
      0,
      "e",
      "e",
      0,
      0,
      "f",
      0,
      0,
      0,
      "f",
      0,
      "a",
      "a",
      "a",
      0,
      "b",
      "b",
      "b",
      0
    ],
    ["e", 0, 0, "e", 0, "f", 0, 0, 0, "f", 0, "a", 0, 0, 0, "b", 0, 0, "b"],
    ["e", 0, 0, "e", 0, 0, "f", 0, "f", 0, 0, "a", "a", "a", 0, "b", "b", "b"],
    ["e", 0, 0, "e", 0, 0, "f", 0, "f", 0, 0, "a", 0, 0, 0, "b", 0, "b"],
    [0, "e", "e", 0, 0, 0, 0, "f", 0, 0, 0, "a", "a", "a", 0, "b", 0, 0, "b"]
  ]
  renderGame(gameOver2)
  pop()
}
function mover() {
  if (lost) {
    console.log("lost")
  } else {
    // console.log("move");
    if (move_available) {
      move()
    } else {
      createRandomObject()
    }
  }
  checkLine()
}
function checkLine() {
  for (i9 = m - 1; i9 >= 0; i9--) {
    temp = 0
    for (j9 = 0; j9 < n; j9++) {
      if (game[i9][j9]) {
        temp++
      }
      if (temp == n) {
        game.splice(i9, 1)
        game.unshift(Array(n).fill(0))
      }
    }
  }
}

// function moveDown(a){
//   push()
//   translate(0,25)
//   pop()
// }

function move() {
  c = b.map(function (arr) {
    return arr.slice()
  })

  // console.log(c);
  c.unshift(Array(n).fill(0))
  if (c[c.length - 1].equals(Array(n).fill(0))) {
    c.pop()
  }

  iter = 0
  for (i5 = 0; i5 < c.length; i5++) {
    for (j5 = 0; j5 < n; j5++) {
      try {
        if (game[i5][j5] && c[i5][j5]) {
          iter++
          break
        }
      } catch {
        iter++
        break
      }
    }
  }
  if (iter) {
    move_available = 0
    for (i2 = 0; i2 < c.length; i2++) {
      for (j2 = 0; j2 < n; j2++) {
        if (c[i2][j2] != 0) {
          try {
            game[i2 - 1][j2] = c[i2][j2]
            c[j2][j2] = 0
          } catch {
            lost = 1
          }
        }
        move_available = 0
        available = 0
      }
    }
  }
  b = c.map(function (arr) {
    return arr.slice()
  })
}
function createRandomObject() {
  a = []
  dir = 0
  rand = random(7)
  // console.log(parseInt(rand));
  switch (parseInt(rand)) {
    case 0:
      a = [
        ["a", "a", "a", "a"],
        [0, 0, 0, 0]
      ]
      break
    case 1:
      a = [
        ["b", "b", "b", 0],
        ["b", 0, 0, 0]
      ]
      break
    case 2:
      a = [
        ["c", "c", "c", 0],
        [0, "c", 0, 0]
      ]
      break
    case 3:
      a = [
        ["d", "d", "d", 0],
        [0, 0, "d", 0]
      ]
      break
    case 4:
      a = [
        ["e", "e", 0, 0],
        ["e", "e", 0, 0]
      ]
      break
    case 5:
      a = [
        ["f", "f", 0, 0],
        [0, "f", "f", 0]
      ]
      break
    case 6:
      a = [
        [0, "g", "g", 0],
        ["g", "g", 0, 0]
      ]
      break
  }
  a.push([0, 0, 0, 0], [0, 0, 0, 0])
  b = []
  b = Array(2) //game[m][n]
    .fill()
    .map((entry) => Array(n).fill(0)) // game=new Array(r)

  for (i6 = 0; i6 < 4; i6++) {
    b[0][i6 + 3] = a[0][i6]
    b[1][i6 + 3] = a[1][i6]
  }
  move_available = 1
  available = 1
}

function renderGame(game) {
  push()
  for (i7 = 0; i7 < game.length; i7++) {
    for (j7 = 0; j7 < game[0].length; j7++) {
      if (game[i7][j7]) {
        switch (game[i7][j7]) {
          case "a":
            fill(255, 0, 0)
            break
          case "b":
            fill(255, 255, 0)
            break
          case "c":
            fill(0, 255, 0)
            break
          case "d":
            fill(0, 255, 255)
            break
          case "e":
            fill(0, 0, 255)
            break
          default:
            fill(255, 0, 255)
            break
        }

        // stroke(30);
        rect(j7 * 25, i7 * 25, 25, 25)
      }
    }
  }

  pop()
}

function right() {
  temp = 0
  b.map((val, ind) => {
    if (val[n - 1] != 0) {
      temp++
    } else {
      val.map((v, i) => {
        if (v != 0 && game[ind][i + 1]) {
          temp++
        }
      })
    }
  })
  // console.log(temp);
  if (!temp) {
    b.forEach((elementss) => {
      elementss.unshift(0)
      elementss.pop()
      rr++
    })
  }
  // console.log(b);
}
function left() {
  temp = 0
  b.map((val, ind) => {
    if (val[0] != 0) {
      temp++
    } else {
      val.map((v, i) => {
        if (i > 0) {
          if (v != 0 && game[ind][i - 1]) {
            temp++
          }
        }
      })
    }
  })
  // console.log(temp);
  if (!temp) {
    b.forEach((elementss) => {
      elementss.shift()
      elementss.push(0)
      push()
      translate(-25, 0)
      pop()
    })
  }
}
function rot() {
  array2 = b.map(function (arr) {
    return arr.slice()
  })
  // console.log(b);
  // console.log(array2);
  temp2 = []
  if (array2.length >= 4) {
    for (i4 = b.length - 1; i4 >= 0; i4--) {
      temp = 0
      array2[i4].map((v, i) => {
        if (v == 0) {
          temp++
        }
      })
      if (temp == n) {
        array2.splice(i4, 1)
      }
    }

    for (j4 = array2[0].length - 1; j4 >= 0; j4--) {
      temp = 0
      for (k4 = array2.length - 1; k4 >= 0; k4--) {
        if (array2[k4][j4] == 0) {
          temp++
        }
      }
      if (temp == array2.length) {
        for (h4 = array2.length - 1; h4 >= 0; h4--) {
          array2[h4].splice(j4, 1)
        }
      }
    }

    tempppp = array2.map(function (arr) {
      return arr.slice()
    })

    output = rotateN90(tempppp)

    // output = tempppp[0].map((_, colIndex) =>
    //   tempppp.map((row) => row[colIndex])
    // ); //rotated element

    final = Array.from(Array(b.slice().length), () => new Array(n).fill(0))
    temp = 0
    temp2 = 0
    if (b.length >= output.length) {
      for (i8 = b.length - 1; i8 >= b.length - output.length; i8--) {
        for (j8 = 0; j8 < b[0].length; j8++) {
          // console.log(i8,j8)
          if (b[i8][j8] != 0) {
            for (i10 = 0; i10 < output.length; i10++) {
              for (j10 = 0; j10 < output[0].length; j10++) {
                // console.log("-------------------------------");
                // console.log(i8 - i10, j8 + j10, output.length - i10 - 1, j10);
                // console.log((output.length - i10) - 1)
                final[i8 - i10][j8 + j10] = output[output.length - i10 - 1][j10]
                // console.log(output[output.length - i10 - 1])
                // final[i8-i10][j8 + j10] = output[output.length - i10-1][j10];
                temp++
              }
            }
            if (temp) {
              temp2++
              break
            }
          }
          if (temp2) {
            break
          }
        }
      }
    }
    // console.log(final);
    b = final.map(function (arr) {
      return arr.slice()
    })
    // console.log(b);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    right()
  }
  if (keyCode === LEFT_ARROW) {
    left()
  }
  if (keyCode === DOWN_ARROW) {
    move()
  }
  if (keyCode === UP_ARROW) {
    rot()
  }
  if (keyCode === ENTER) {
    createRandomObject()
  }
}

// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  )
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false
  // if the argument is the same array, we can be sure the contents are same as well
  if (array === this) return true
  // compare lengths - can save a lot of time
  if (this.length != array.length) return false

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false })

function rotateN90(a) {
  var temp = new Array(a[0].length) // number of columns
  var i = 0

  for (i = 0; i < temp.length; i++) {
    temp[i] = []
  }

  for (i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      temp[j][i] = a[i][a[i].length - 1 - j]
    }
  }

  return temp
}
