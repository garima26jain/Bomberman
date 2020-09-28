let arr;
document.addEventListener("DOMContentLoaded", () => {
  let grid = document.querySelector(".grid");
  let width = 9;
  function createBoard(rows, cols) {
    arr = new Array(); //array to store the bomb position
    let bombCount = 15;
    for (let i = 0; i < rows; i++) {
      let temp = new Array();
      for (let j = 0; j < cols; j++) {
        temp.push(0);
      }
      arr.push(temp);
    }

    bomb = new Array();
    for (let i = 0; i < 15; i++) {
      var x = Math.floor(Math.random() * (rows - 1 - 0 + 1));
      var y = Math.floor(Math.random() * (cols - 1 - 0 + 1));
      bomb.push([x, y]);
    }

    for (let i = 0; i < bomb.length; i++) {
      arr[bomb[i][0]][bomb[i][1]] = -1;
    }

    var container = document.createElement("div");
    container.id = "main";
    container.className = "container";

    for (i = 0; i < rows; i += 1) {
      var row = document.createElement("div");
      row.className = "row";
      row.id = "row" + i;

      for (k = 0; k < cols; k += 1) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i + k;
        box.addEventListener("click", (e) => {
          document.getElementById(e.target.id).style.background = "#ff9a76"; //box01
          let i = e.target.id.charAt(3);
          let j = e.target.id.charAt(4);
          if (checkcell(e.target.id, i, j)) {
            for (let x = 0; x < bomb.length; x++) {
              let idstr = "box" + bomb[x][0] + bomb[x][1];
              document.getElementById(idstr).innerText = "💣";
            }

            setTimeout(() => {
              window.location.reload();
            }, 3000);
            return;
          }
          let cb = countBomb(e.target.id, i, j);
          document.getElementById(e.target.id).innerText = cb;
        });
        row.appendChild(box);
      }
      container.appendChild(row);
    }
    grid.appendChild(container);
  }
  createBoard(9, 9);

  function countBomb(boxid, i, j) {
    let total = 0;
    // console.log("id1", i);
    // console.log("id2", j);
    let n1 = parseInt(i);
    let n2 = parseInt(j);
    let count = 0;
    try {
      if (arr[i - 1][j] === -1) {
        count++; //top
      }
    } catch (err) {}
    try {
      if (arr[i - 1][j - 1] === -1) {
        count++; //top left
      }
    } catch (err) {}
    try {
      if (arr[i][j - 1] === -1) {
        count++; //left
      }
    } catch (err) {}
    try {
      if (arr[i + 1][j - 1] === -1) {
        count++; //bottom left
      }
    } catch (err) {}
    try {
      if (arr[i + 1][j] === -1) {
        count++; //bottom
      }
    } catch (err) {}
    try {
      if (arr[i + 1][j + 1] === -1) {
        count++; //bottom right
      }
    } catch (err) {}
    try {
      if (arr[i][j + 1] === -1) {
        count++; //right
      }
    } catch (err) {}
    try {
      if (arr[i - 1][j + 1] === -1) {
        count++; //top right
      }
    } catch (err) {}

    return count;
  }

  function checkcell(id, i, j) {
    if (arr[i][j] == -1) {
      return true;
    }
    return false;
  }
});
