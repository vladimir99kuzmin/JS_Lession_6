//сделал всё тяп-ляп, нет времени, прошу прощения
//крестики-нолики из практикума
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

ticktacktoe();

//магазин
class catalogItemCreator {
    constructor(id, price, name) {
        return {
            id: id,
            price: price,
            name: name
        }
    }
}

var items = [];
var cartItems = [];
var catalog = document.getElementById("catalog");
var cart = document.getElementById("cart");

for (let i = 0; i < (Math.random() * 8) + 2; i++) {
    itemToPush = new catalogItemCreator(i, (Math.random() * 100).toFixed(2), "Item " + i);
    items.push(itemToPush);
    catalog.innerHTML += '<div class="item catalogItem" data-id="' + itemToPush.id + '">' + itemToPush.name + '<br>' + itemToPush.price + '$' + '<br>ClickOnMe!' +  '</div>';
}

var backupCart = cart.innerHTML;
var backupCatalog = catalog.innerHTML;

document.onclick = event => {
    if (event.target.getAttribute('data-id') !== null) {
        if (event.target.classList.contains("catalogItem")) {
            items.forEach(elem => {
                if (elem.id == event.target.getAttribute('data-id')) {
                    if (addItemToCart(elem)) {
                        event.target.remove();
                        countTotal();
                    }
                }
            });
        }
        else if (event.target.classList.contains("cartItem")) {
            items.forEach(elem => {
                if (elem.id == event.target.getAttribute('data-id')) {
                    if (removeItemFromCart(elem)) {
                        event.target.remove();
                        countTotal();
                    }
                }
            });
        }

    }
}

function addItemToCart(elem) {
    current = '<div class="item cartItem" data-id="' + elem.id + '">' + elem.name + '<br>' + elem.price + '$' + '<br>ClickOnMe!' + '</div>';
    if (!cart.innerHTML.includes(current)) {
        cartItems.push(elem);
        cart.innerHTML = current + cart.innerHTML;
        return true;
    }
    else return false;
}

function removeItemFromCart(elem) {
    current = '<div class="item catalogItem" data-id="' + elem.id + '">' + elem.name + '<br>' + elem.price + '$' + '<br>ClickOnMe!' + '</div>';
    if (!catalog.innerHTML.includes(current)) {
        let index = cartItems.findIndex(el => el.name == elem);
        cartItems.splice(index, 1);
        catalog.innerHTML = current + catalog.innerHTML;
        return true;
    }
    else return false;
}

function countTotal() {
    let total = document.getElementById("totalCost");
    let totalCost = 0;
    for (let elem of cartItems) {
        totalCost += Number(elem.price);
    }
    total.innerHTML = totalCost.toFixed(2);
}

function removeAll() {
    cartItems = [];
    cart.innerHTML = backupCart;
    catalog.innerHTML = backupCatalog;
}
