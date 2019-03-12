var el = document.getElementById("list");
var items = document.querySelectorAll("li");
var playButton = document.querySelectorAll('li button');
var versacePlay = document.querySelector('li:nth-of-type(1) > button');
var crazyPlay = document.querySelector('li:nth-of-type(2) > button');
var japanPlay = document.querySelector('li:nth-of-type(3) > button');
var wallPlay = document.querySelector('li:nth-of-type(4) > button');
var beautifulPlay = document.querySelector('li:nth-of-type(5) > button');
var girlsPlay = document.querySelector('li:nth-of-type(6) > button');
var versace = document.querySelector('body audio:nth-of-type(1)');
var crazy = document.querySelector('body audio:nth-of-type(2)');
var japan = document.querySelector('body audio:nth-of-type(3)');
var wall = document.querySelector('body audio:nth-of-type(4)');
var beautiful = document.querySelector('body audio:nth-of-type(5)');
var girls = document.querySelector('body audio:nth-of-type(6)');
var range = document.querySelector('body section:nth-of-type(2) input');
var songTitel = document.querySelectorAll('body section:nth-of-type(1) ul li p');
var fontSize = document.querySelector('body section:nth-of-type(2) > span:nth-of-type(2) p');
var nightButton = document.querySelector('body section:nth-of-type(2) span:nth-of-type(1) button');
var body = document.querySelector('body');
var infoOne = document.querySelector('body section:nth-of-type(2) span p:nth-of-type(2)');
console.log(infoOne);
var status = 1;

range.addEventListener("input", function () {
    for (var i = 0; i < songTitel.length; i++) {
        songTitel[i].style.fontSize = this.value + 'px';
    }
    fontSize.innerText = range.value + ' px';
});


window.addEventListener("keydown", function (e) {
    if (e.code == "ArrowRight" || e.code == "ArrowLeft") {
        range.focus();
    }
    console.log(e);
    for (var i = 0; i < songTitel.length; i++) {
        songTitel[i].style.fontSize = this.value + 'px';
    }
    fontSize.innerText = range.value + ' px';
}, true);

window.addEventListener("keydown", function (e) {
    if (e.code == "KeyN") {
        body.classList.toggle('night');
        if (status == 1) {
            infoOne.innerHTML = 'You can use the N button to return to day vision';
            status = 2;
            return status;
        } else if (status == 2) {
            infoOne.innerHTML = 'You can use the N button for night vision';
            status = 1;
            return status;
        }
    }
}, true);

nightButton.addEventListener('click', function () {
    body.classList.toggle('night');
    if (status == 1) {
        infoOne.innerHTML = 'You can click the N button to return to day vision';
        status = 2;
        return status;
    } else if (status == 2) {
        infoOne.innerHTML = 'You can use the N button for night vision';
        status = 1;
        return status;
    }
});


function versaceSong() {
    if (versacePlay.classList.value == '') {
        versace.play();
    } else {
        versace.pause();
    }
}

function crazySong() {
    if (crazyPlay.classList.value == '') {
        crazy.play();
    } else {
        crazy.pause();
    }
}

function japanSong() {
    if (japanPlay.classList.value == '') {
        japan.play();
    } else {
        japan.pause();
    }
}

function wallSong() {
    if (wallPlay.classList.value == '') {
        wall.play();
    } else {
        wall.pause();
    }
}

function beautifulSong() {
    if (beautifulPlay.classList.value == '') {
        beautiful.play();
    } else {
        beautiful.pause();
    }
}

function girlsSong() {
    if (girlsPlay.classList.value == '') {
        girls.play();
    } else {
        girls.pause();
    }
}

versacePlay.addEventListener('click', versaceSong);
crazyPlay.addEventListener('click', crazySong);
japanPlay.addEventListener('click', japanSong);
wallPlay.addEventListener('click', wallSong);
beautifulPlay.addEventListener('click', beautifulSong);
girlsPlay.addEventListener('click', girlsSong);


for (var i = 0; i < playButton.length; i++) {
    playButton[i].addEventListener('click', function () {
        this.classList.toggle('pause');
    });
}


function isBefore(a, b) {
    if (a.parentNode === b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    } else {
        return false;
    }
}

function init() {
    var dragEl;
    items.forEach(function (item) {
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", function (e) {
            dragEl = e.target;
            e.dataTransfer.effectAllowed = 'move';
            e.target.classList.add("dragging");
        });
        item.addEventListener("dragenter", function (e) {
            //The stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases.
            e.stopPropagation();
            //als het op dezelfde element is dan gebeurt niks, Propagation means bubbling up to parent elements or capturing down to child elements.


            if (dragEl === e.target) {
                return;
            }
            var self = e.target;
            if (isBefore(self, dragEl)) {
                moveElements(self, dragEl);
            } else {
                moveElements(self, dragEl, true);
            }
        });
        item.addEventListener("dragend", function (e) {
            e.target.classList.remove("dragging");
        });
    });
}

function moveElements(first, second, after = false) {
    //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    var firstDim = first.getBoundingClientRect();
    var secondDim = second.getBoundingClientRect();
    var distance = firstDim.height - firstDim.top - (secondDim.height - secondDim.top);
    console.log(distance);
    first.style.transition = '0.3s';
    first.style.transform = "translateY(" + distance + "px)";

    let listener = first.addEventListener('transitionend', () => {
        first.style.transition = 'none';
        //een manier om if else te schrijven
        //The Node.insertBefore() method inserts a node before the reference node as a child of a specified parent node. If the given child is a reference to an existing node in the document, insertBefore() moves it from its current position to the new position (there is no requirement to remove the node from its parent node before appending it to some other node).
        !after ? first.parentNode.insertBefore(first, second) : first.parentNode.insertBefore(second, first);
        first.style.transform = "translateY(0px)";
        first.removeEventListener('transitionend', listener);
    });
}

init();

//Bron:
//BY Parminder Singh
