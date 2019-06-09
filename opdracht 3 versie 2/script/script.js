var uri ='https://open.data.amsterdam.nl/Attracties.json';
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
        article.setAttribute('tabIndex', i);
        var activiteitenTitel = document.createElement('h2');        
        activiteitenTitel.textContent = activiteiten[i].title;        
        var activiteitenDetails = document.createElement('p');        
        activiteitenDetails.textContent = activiteiten[i].details.nl.shortdescription;        

        var locationString = activiteiten[i].location.adress + ' ' + activiteiten[i].location.city;

        var activiteitenlocation = document.createElement('button');        
        activiteitenlocation.textContent = locationString;

        var iframe = document.createElement('iframe');

        var encodedLocationString = encodeURIComponent(locationString);

        iframe.setAttribute('data-src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAEarKJHNB2GDCLWgRabpVBSq6b9iJWVbw&q=' + locationString);

        article.appendChild(iframe);
        article.appendChild(activiteitenTitel);    
        article.appendChild(activiteitenDetails);    
        article.appendChild(activiteitenlocation);
        section.appendChild(article);    
    }

    var locatie = document.querySelectorAll('section article button:last-of-type');
    var iframes = document.querySelectorAll('iframe');
    console.log(locatie, 'hiiiiiiii');

    for (var i = 0; i < locatie.length; i++){
        const myI = i;
        locatie[i].addEventListener('click', function(){
            console.dir(this, 'hello');

            console.log('iframes',iframes,i,iframes[myI]);
            if(!iframes[myI].getAttribute('src')){
                console.log('setting src');
                iframes[myI].setAttribute('src', iframes[myI].getAttribute('data-src'));
            }

            this.parentElement.firstElementChild.classList.add('vershcijnen');
        });
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





