var uri ='https://open.data.amsterdam.nl/Activiteiten.json';
var section = document.querySelector('main section');
var button = document.querySelector('main button');
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


        var card = document.createElement('div');
        card.classList.add('card-inner');
        var front = document.createElement('div');
        front.classList.add('card-front');
        var back = document.createElement('div');
        back.classList.add('card-back');

        if (activiteiten[i].media[0]) {
            var url = activiteiten[i].media[0].url;
            back.style.backgroundImage = `url('${url}')`;
        }
        else {
            console.log('geenfoto');
            back.style.backgroundImage = 'url(../images/geen-foto.png)';

        }

        var icon = document.createElement('span');
        icon.innerHTML='IMG';
        icon.classList.add('img-button');

        icon.classList.add('icon-picture');
        icon.addEventListener('mouseover', function(e) {
            e.target.parentElement.classList.add('card-flip');
        });
        icon.addEventListener('mouseout', function(e) {
            e.target.parentElement.classList.remove('card-flip');
        });


        var locationString = activiteiten[i].location.adress + ' ' + activiteiten[i].location.city;

        var activiteitenlocation = document.createElement('button');        
        activiteitenlocation.textContent = locationString;

        var iframe = document.createElement('iframe');

        var encodedLocationString = encodeURIComponent(locationString);

        iframe.setAttribute('data-src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAEarKJHNB2GDCLWgRabpVBSq6b9iJWVbw&q=' + locationString);

        front.appendChild(iframe);
        front.appendChild(activiteitenTitel);    
        front.appendChild(activiteitenDetails);  
        front.appendChild(activiteitenlocation); 
        card.appendChild(front);
        card.appendChild(back); 
        article.appendChild(card);
        article.appendChild(icon);
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

            this.parentElement.firstElementChild.classList.toggle('vershcijnen');
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








