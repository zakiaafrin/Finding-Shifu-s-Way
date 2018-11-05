var btn = document.getElementById('start');
var anime = document.getElementById('anime');
var matrix = document.getElementById('matrix');
var path = document.getElementById('copoint');
var pathX = new Array();
var pathY = new Array();

var [S, E] = ['S', 'E'];
var arrTable = [
    [S, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, E]
];

function createTable() {
    var tableBody = document.getElementById("matrix");
    tableBody.innerHTML = "";

    arrTable.forEach(function (row) {
        var newRow = document.createElement("tr");
        tableBody.appendChild(newRow);

        if (row instanceof Array) {
            row.forEach(function (cell) {
                var newCell = document.createElement("td");
                if (cell == 1 || cell == S || cell == E) {
                    newCell.style.backgroundColor = '#00FA9A';
                }
                if (cell == 0) {
                    newCell.style.background = "url('./img/wall.jpg'), 58px 55px, no-repeat, center center";
                }
                newCell.textContent = cell;
                newRow.appendChild(newCell);
            });
        } else {
            newCell = document.createElement("td");
            newCell.textContent = row;
            newRow.appendChild(newCell);
        }
    });
}
createTable(arrTable);

function findPath() {
    var element;
    var done = false;
    for (var i = 0; i < arrTable.length && !done; i++) {
        for (var j = 0; j < arrTable[i].length; j++) {
            element = arrTable[i][j];


            if (element === S) {
                pathX[0] = i;
                pathY[0] = j;
                done = true;
                break;
            }
        }
    }
    var x, y;
    var m, n;
    while (element !== E) {
        x = pathX[pathX.length - 1];
        y = pathY[pathY.length - 1];
        m = pathX[pathX.length - 2];
        n = pathY[pathY.length - 2];
        point({ i: parseInt(x), j: parseInt(y) },
            { i: parseInt(m), j: parseInt(n) });
        x = pathX[pathX.length - 1];
        y = pathY[pathY.length - 1];
        element = arrTable[x][y];
    }
}

function point(pos, last) {
    if (arrTable[pos.i][pos.j] === E) {
        pathX.push([pos.i]);
        pathY.push([pos.j]);
        return true;
    }
    if (pos.i < arrTable.length - 1 && arrTable[pos.i + 1][pos.j] && !(pos.i + 1 === last.i && pos.j === last.j)) {
        pathX.push([pos.i + 1]);
        pathY.push([pos.j]);
        return true;
    }
    if (pos.j < arrTable[0].length - 1 && arrTable[pos.i][pos.j + 1] && !(pos.i === last.i && pos.j + 1 === last.j)) {
        pathX.push([pos.i]);
        pathY.push([pos.j + 1]);
        return true;
    }
    if (pos.i > 0 && arrTable[pos.i - 1][pos.j] && !(pos.i - 1 === last.i && pos.j === last.j)) {
        pathX.push([pos.i - 1]);
        pathY.push([pos.j]);
        return true;
    }
    if (pos.j > 0 && arrTable[pos.i][pos.j - 1] && !(pos.i === last.i && pos.j - 1 === last.j)) {
        pathX.push([pos.i]);
        pathY.push([pos.j - 1]);
        return true;
    }
}

function start() {
    var result = '';
    findPath();
    for (var i = 0; i < pathX.length; i++) {
        result += '(' + pathX[i] + ',' + pathY[i] + ')' + '<br/>';
    }
    path.innerHTML = result;
}
function showImage() {
    var tableBody = document.getElementById("matrix");
    tableBody.innerHTML = "";

    arrTable.forEach(function (row) {
        var newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        if (row instanceof Array) {
            row.forEach(function (cell) {
                var newCell = document.createElement("td");
                if (cell == 1 || cell == S || cell == E) {
                    newCell.style.backgroundColor = '#00FA9A';
                    newCell.style.backgroundImage = "url('./img/hima.png')";
                    newCell.style.backgroundSize = "58px 58px";
                    newCell.style.backgroundRepeat = "no-repeat";
                    newCell.style.backgroundposition = "center center";
                }
                if (cell == 0) {
                    newCell.style.background = "url('./img/wall.jpg'), 58px 55px, no-repeat, center center";
                }
                newCell.textContent = cell;
                newRow.appendChild(newCell);
            });
        }
    });
}

btn.addEventListener('click', function (e) {
    start();
})
anime.addEventListener('click', function (e) {
    showImage();
})