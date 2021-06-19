function ticktacktoe() {
    XOs = [];
    let turnX = true;
    let board = document.getElementById("game_board");
    for (let i = 0; i < 3; i++) {
        board.innerHTML += '<tr id="row ' + i + '">';
        let row = document.getElementById("row " + i)
        for (let j = 0; j < 3; j++) {
            if (j === 2) {
                row.innerHTML += '<td class = "cell" id = "coloumn ' + j + '">[  ]</td></tr>';
            }
            else {
                row.innerHTML += '<td class = "cell" id = "coloumn ' + j + '">[  ]</td>';
            }
        }
    }
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].onclick = doTurn;
    }

    function refreshBoard() {
        XOs = [];
        for (let i = 0; i < 3; i++) {
            XOs.push([]);
            for (let j = 0; j < 3; j++) {
                XOs[i].push("");
            }
        }
    }
    refreshBoard();
    function doTurn(eventObj) {
        if (turnX && eventObj.toElement.innerHTML !== "[O]") {
            eventObj.toElement.innerHTML = "[X]"
            turnX = false
            XOs[Number((eventObj.path[1].id).replace(/[^\d]/g, ''))][Number((eventObj.path[0].id).replace(/[^\d]/g, ''))] = "X";
        }
        else if (!turnX && eventObj.toElement.innerHTML !== "[X]") {
            eventObj.toElement.innerHTML = "[O]"
            turnX = true
            XOs[Number((eventObj.path[1].id).replace(/[^\d]/g, ''))][Number((eventObj.path[0].id).replace(/[^\d]/g, ''))] = "O";
        }

        checkWinner();
    }
    
    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (XOs[i][0] === XOs[i][1] && XOs[i][0] === XOs[i][2] && XOs[i][0] !== "") {
                if (XOs[i][0] === "X") {
                    alert("X victory");
                }
                if (XOs[i][0] === "O") {
                    alert("O victory");
                }
                clearAllAndRestart();
                break;
            }
            else if (XOs[0][i] === XOs[1][i] && XOs[0][i] === XOs[2][i] && XOs[0][i] !== "") {
                if (XOs[0][i] === "X") {
                    alert("X victory");
                }
                if (XOs[0][i] === "O") {
                    alert("O victory");
                }
                clearAllAndRestart();
                break;
            }
            else if (XOs[0][0] === XOs[1][1] && XOs[0][0] === XOs[2][2] && XOs[0][0] !== "") {
                if (XOs[0][0] === "X") {
                    alert("X victory"); 
                }
                if (XOs[0][0] === "O") {
                    alert("O victory");
                }
                clearAllAndRestart();
                break;
            }
            else if (XOs[0][2] === XOs[1][1] && XOs[0][2] === XOs[2][0] && XOs[0][2] !== "") {
                if (XOs[0][2] === "X") {
                    alert("X victory");
                }
                if (XOs[0][2] === "O") {
                    alert("O victory");
                }
                clearAllAndRestart();
                break;
            }
            else if (!(XOs[0].includes("") || XOs[1].includes("") || XOs[2].includes(""))) {
                alert("there is no turns");
                clearAllAndRestart();
                break;
            }
        }
    }


    function clearAllAndRestart() {
        refreshBoard();
        board.innerHTML = '';
        ticktacktoe();
    }
}
//сделал всё тяп-ляп, нет времени
ticktacktoe();