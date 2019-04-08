var uri = 'https://open.data.amsterdam.nl/Activiteiten.json';
var section = document.querySelector('main section');
var button = document.querySelector('main button');
var loaderElement = document.querySelector('main span');
var nightVision = document.querySelector('body header button');
var body = document.querySelector('body');
var infoOne = document.querySelector('body header span p');
console.log(infoOne);
var status = 1;

(function request() {   
    fetch(uri)    .then(function (response) {       
        return response.json()   
    })    .then(function (data) {       
        showData(data)   
    })
})()


function showData(jsonObj) {

        
    var activiteiten = jsonObj;    
    console.log(activiteiten);    
    for (var i = 0; i < activiteiten.length; i++) {
        var article = document.createElement('article');
        article.focus();
        article.setAttribute('tabIndex',i);
        var activiteitenTitel = document.createElement('h2');        
        activiteitenTitel.textContent = activiteiten[i].title;        
        var activiteitenDetails = document.createElement('p');        
        activiteitenDetails.textContent = activiteiten[i].details.nl.shortdescription;        
        var activiteitenlocation = document.createElement('p');        
        activiteitenlocation.textContent = activiteiten[i].location.adress + ' ' + activiteiten[i].location.city;
  
        article.appendChild(activiteitenTitel);    
        article.appendChild(activiteitenDetails);    
        article.appendChild(activiteitenlocation);

            
        section.appendChild(article);    
    }
}


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

nightVision.addEventListener('click', function () {
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

function inView() {
    var element = document.querySelectorAll("main section article");
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var scrollPosition = scrollY + windowHeight;
    for (var i = 0; i < element.length; i++) {
        var elementPosition = element[i].getBoundingClientRect().top + scrollY + element[i].clientHeight;
        if (scrollPosition > elementPosition) {
            element[i].classList.add('show');
        }
    }
}

inView();
document.addEventListener('scroll', inView);
