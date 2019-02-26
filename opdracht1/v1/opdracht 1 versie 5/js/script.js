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


function versaceSong() {
    if (versacePlay.classList.value == '' ) {
        versace.play();
    }
    else {
        versace.pause();
    }
}

function crazySong() {
    if (crazyPlay.classList.value == '' ) {
        crazy.play();
    }
    else {
        crazy.pause();
    }
}

function japanSong() {
    if (japanPlay.classList.value == '' ) {
        japan.play();
    }
    else {
        japan.pause();
    }
}

function wallSong() {
    if (wallPlay.classList.value == '' ) {
        wall.play();
    }
    else {
        wall.pause();
    }
}

function beautifulSong() {
    if (beautifulPlay.classList.value == '' ) {
        beautiful.play();
    }
    else {
        beautiful.pause();
    }
}

function girlsSong() {
    if (girlsPlay.classList.value == '' ) {
        girls.play();
    }
    else {
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
        playButton[i].addEventListener('click', function(){
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
            e.stopPropagation();
            if (dragEl === e.target) return;
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
    var firstDim = first.getBoundingClientRect();
    var secondDim = second.getBoundingClientRect();
    var distance = firstDim.height - firstDim.top - (secondDim.height - secondDim.top);
    console.log(distance);
    first.style.transition = '0.3s';
    first.style.transform = "translateY(" + distance + "px)";

    let listener = first.addEventListener('transitionend', () => {
        first.style.transition = 'none';
        !after ? first.parentNode.insertBefore(first, second) : first.parentNode.insertBefore(second, first);
        first.style.transform = "translateY(0px)";
        first.removeEventListener('transitionend', listener);
    });
}

init();

//Bron:
//BY Parminder Singh

