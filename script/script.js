//предзагрузчик, запускаем видео, аудио при загрузке страницы
const video = document.querySelector("video");
const audio = [...document.querySelectorAll("audio")];

document.body.onload = function(){
    setTimeout(function(){
        let areaForLoader = document.getElementById('areaForLoader');
        if (areaForLoader.classList !== "hide"){
            areaForLoader.classList.add('hide');
            video.play();
            audio.forEach((elem)=> elem.play());
            soundOffIfTabletMob();
        }
    }, 5000);
};


//функция для остановки/воспроизведения видео
const buttonPause = document.querySelector('#first_page__mediaControllers_pause');
buttonPause.addEventListener('click', videoStopPlay);
const buttonPlay = document.querySelector('#first_page__mediaControllers_play');
buttonPlay.addEventListener('click', videoStopPlay);

function videoStopPlay(){
    if(video.paused){
        video.play();
        buttonPlay.style.visibility = "hidden";
        buttonPause.style.visibility = "visible";
    }
    else {
        video.pause();
        buttonPlay.style.visibility = "visible";
        buttonPause.style.visibility = "hidden";
        audioStopPlay();
    }
};


//функция для остановки/воспроизведения звука
const buttonSoundOn = document.querySelector('#first_page__mediaControllers_soundOn');
buttonSoundOn.addEventListener('click', audioStopPlay);
const buttonSoundOff = document.querySelector('#first_page__mediaControllers_soundOff');
buttonSoundOff.addEventListener('click', audioStopPlay);

function audioStopPlay(){
    let arrOfAudio = [...audio];
    for(i=0; i<arrOfAudio.length; i++){
        if(arrOfAudio[i].paused){
            arrOfAudio[i].play();
            buttonSoundOn.style.visibility = "visible";
            buttonSoundOff.style.visibility = "hidden";
        }
        else {
            arrOfAudio[i].pause();
            buttonSoundOn.style.visibility = "hidden";
            buttonSoundOff.style.visibility = "visible";
        }
    }
};

//функция для выключения звука при переходе на разрешение окна браузера меньше 1020px
window.addEventListener('resize', soundOffIfTabletMob);

function soundOffIfTabletMob(){
    if(window.innerWidth < 1020){
        audio.forEach((elem)=> elem.pause());
    }
};

// замена логотипа img на логотип gif
const logoArea = document.querySelector("#header__menu>a");
const img = document.querySelector("#logo_stat");
logoArea.addEventListener('mouseover', animateLogo);
    
function animateLogo(){
    logoArea.onmouseover = function(){ 
        document.querySelector("#logo_gif").style.visibility = "visible";
        img.style.visibility = "hidden";
    }
    logoArea.onmouseout = function(){ 
        img.style.visibility = "visible";
        document.querySelector("#logo_gif").style.visibility = "hidden";  
    }
};

//функция для вызова формы регистрации
const buttonEnter = document.querySelectorAll(".enterButton");
let arrOfButtonEnter = [...buttonEnter];
arrOfButtonEnter.forEach((elem)=>elem.addEventListener('click', openForm));

function openForm(){
    let win = window.open("./registrationForm.html", "_blank");
};

//функция для повяления информационной карточки по клику на точке на карте
//появление метки геотега и информационной карточки при клике
let points = document.querySelectorAll('.geoteg');
let allPoints = [...points];
const map = document.querySelector('#contacts__map');
allPoints.forEach(function(el){
    el.addEventListener('click', function(){ 
        showInfoCard(el); 
    });
});

//массивы с информацией для информационных карточек
const arrOfPicForCard = ['0','./img/volontee/1vitebskDobrik.png','./img/volontee/2vitebskIrina.png','./img/volontee/3vitebskVetCentr.png','./img/volontee/4minskzooch.png','./img/volontee/5mogilevman.png','./img/volontee/6minskKsenya.png','./img/volontee/7mogilevcentr.png','./img/volontee/8grodnoSeredce.png','./img/volontee/9mogilevOlga.png','./img/volontee/10bresrDobr.png','./img/volontee/11gomel.png'];
const arrOfNamesForCard = ['0','Приют "Добрик"','Ирина. Волонтер','Ветеринарный центр доктора Базылевского А. А','Зоошанс','Дмитрий. Волонтер','Ксения. Волонтер','Ветзооцентр','Преданное сердце','Ольга. Волонтер','Приют "Доброта"','"Подари им шанс"'];
const arrOfDescripForCard = ['0','г. Витебск, Старобабинический тракт 29. <span>тел. +375(33)336-78-77</span>','Помощь в финансирования медицинских расходов на лечение животных в Витебске.<span>тел. +375(29)345-67-09</span>','г. Витебск, ул. Чкалова, 68.<span>тел. +375(29)344-56-78</span>','г. Минск, ул. Якуба Коласа 50/1. <span>тел. +375(29)191-10-92</span>','помощь в поиске волонтеров для временной передержки животных в Могилеве.<span>тел. +375(29)191-10-92</span>','помощь с кормом для животных в Минске.<span>тел. +375(29)345-65-43</span> ','г.Могилев, ул. Королёва 8<span>тел. +375(29)191-10-92</span>','predannoeserdce.by, г. Гродно','Организация медицинской помощи животным в Могилеве.<span>тел. +375(44)453-78-77</span> ','г. Брест, Ковельская улица 1.<span>тел. +375(16)295-81-30</span>','instagram: podari_im_shans_gomel'];

function showInfoCard(el){
//убираем все значки геотега, если они есть
    returnPoint();
//появление геотега по клику
    let pointId = el.id;
    console.log(pointId);
    let diVector = document.getElementById(pointId);
    let vector = document.getElementById(pointId).firstElementChild;
    vector.remove();
    let geoTeg = document.createElement('img');
    geoTeg.setAttribute('src', './img/geotegI.png'); // задаем атрибут src
    geoTeg.setAttribute('width', '100%'); // задаем атрибут width
    geoTeg.id= 'geoteg1';
    geoTeg.style.transform = "translateX(-1vw) translateY(-2.5vw)"; // задаем атрибут width
    diVector.appendChild(geoTeg);
    
//появление информационной карты
    let contactsInfoCard = document.querySelector('#contacts__card');
    contactsInfoCard.style.opacity = '1';
    let solidLine = document.querySelector('#solid_line');
    solidLine.style.opacity = '1';
    contactsInfoCard.addEventListener('mouseout', function(){geoTeg.style.opacity = '1'});
//выбор из массивов нужной информации для карточки
    let arrOfLetters = pointId.split('');
    let indexNumber = 0;
    if(arrOfLetters.length == 6){
        indexNumber = arrOfLetters.pop();
    }
    else{
        indexNumber = arrOfLetters.splice(5,6).join('');
        console.log(indexNumber);
    }
    let cardsImg = document.querySelector('#contacts__card_info>div>img');
    cardsImg.setAttribute('src', arrOfPicForCard[indexNumber]);

    let cardsName = document.querySelector('#contacts__card_info_title');
    cardsName.textContent = arrOfNamesForCard[indexNumber];

    let cardsDescr = document.querySelector('#contacts__card_info_descr');
    cardsDescr.innerHTML = arrOfDescripForCard[indexNumber];
};

//функция проверки есть ли метка геотега на карте и замена ее на точку + убираем линию от карты к инфокарте
function returnPoint(){
    let contactsDives = document.querySelectorAll('#contacts__points>div');
    let arrOfContactsDiv = [...contactsDives];
    for(i=0; i<arrOfContactsDiv.length; i++){
        if(arrOfContactsDiv[i].firstElementChild == 'svg'){
            return;
        }
        else{
            arrOfContactsDiv[i].firstElementChild.remove();
            let dot = document.createElement('img');
            dot.setAttribute('src', './img/dot.png');
            dot.setAttribute('width', '100%');
            arrOfContactsDiv[i].appendChild(dot);}
        };
    let contactsInfoCard = document.querySelector('#contacts__card');
    let solidLine = document.querySelector('#solid_line');
    if(contactsInfoCard.style.opacity == '1'){
        contactsInfoCard.style.opacity = '0';
        solidLine.style.opacity = '0';
    }
};

//убираем геотег когда прокидаем область карты
const allMapArea = document.querySelector('#contacts__allAboutMap')
allMapArea.addEventListener('mouseleave', returnPoint);

//работа карты в мобильной версии
let cities = [...document.querySelectorAll('#points_for_mobile>ul>li')];
cities.forEach(function(el){
    el.addEventListener('click', function() { 
        showInfoMob(el); 
    });
});

function showInfoMob(el){
    if(document.querySelector('#infoMob')){
        document.querySelector('#infoMob').remove();
    }
    let cityId = el.id;
    let number = el.id.split('').at(-1);
    let infoMob = document.createElement('div');
    infoMob.id = "infoMob";
    let cross = document.createElement('img');
    cross.setAttribute('src', './img/cross.png');
    cross.id = "infoMobCross";
    cross.addEventListener('click', function(){
        infoMob.style.visibility = 'hidden';
    });
    infoMob.appendChild(cross);
    let infoMobText = document.createElement('p');
        
    switch (number) {
        case '1':
        infoMobText.innerHTML = "<a href=\"https://www.instagram.com/podari_im_shans_gomel/\">"+arrOfNamesForCard[11]+"</a>";
        break;

        case '2':
        infoMobText.innerHTML = "<a href=\"https://dobrik.by\">"+arrOfNamesForCard[1]+"</a>" + "," + "<br/>" + "<p>"+arrOfNamesForCard[2] + "," +arrOfDescripForCard[2]+ "</p>" + "<a href=\"https://minsk.vet-centre.by\">"+arrOfNamesForCard[3]+"</a>";
        break;

        case '3':
        infoMobText.innerHTML = "<a href=\"https://www.instagram.com/priutdobrota/\">"+arrOfNamesForCard[10]+"</a>";
        break;

        case '4':
        infoMobText.innerHTML = "<a href=\"https://predannoeserdce.by\">"+arrOfNamesForCard[8]+"</a>";
        break;

        case '5':
        infoMobText.innerHTML = "<a href=\"https://zooshans.by\">"+arrOfNamesForCard[4]+"</a>" + "," + "<br/>" + "<p>"+arrOfNamesForCard[6]+ "," +arrOfDescripForCard[6]+ "</p>";
        break;

        case '6':
        infoMobText.innerHTML = "<p>"+arrOfNamesForCard[5]+ ", " +arrOfDescripForCard[5]+ "</p>" + "<br/>" + "<a href=\"https://www.instagram.com/vetzoocentr/\">"+arrOfNamesForCard[7]+"</a>" + "," + "<br/>" + "<p>"+arrOfNamesForCard[9]+ ", " +arrOfDescripForCard[9]+ "</p>";
        break;
    }

    infoMob.appendChild(infoMobText);
    document.getElementById('contacts__allAboutMap').appendChild(infoMob);
};

//функция для новостного слайдера
//создаем массив объектов - каждый объект содержит отдельную новость

let arrOfNews = [
    {
    img: './img/newsimg1.png',
    title: 'Домики для животных',
    width: '100%',
    alt: 'Домики для животных'
},
    {
    img: './img/newsimg2.png',
    title: 'Наши волонтеры',
    width: '100%',
    alt: 'Волонтеры'
},
    {
    img: './img/newsim3.png',
    title: 'История Кузи',
    width: '100%',
    alt: 'Рыжий кот'
},
    {
    img: './img/newsimg4.png',
    title: 'Вет клиники',
    width: '100%',
    alt: 'Кот на руках у доктора'
},
    {
    img: './img/newsimg5.png',
    title: 'Ваши питомцы',
    width: '100%',
    alt: 'Кот и собакаы'
}
];

let nIndex = 0;
let slider = document.querySelector('#allNews__news_slider');

function initSlider(){
    fillGrid(slider, arrOfNews);
}; 

//заполняем сетку слайдера новостями, используя цикл for
function fillGrid(slider, arrOfNews){
    slider.innerHTML = '';
    for (let i = 0; i < arrOfNews.length; i++){
//создаем первую новость
        let gridItem = document.createElement("div");
        gridItem.className = 'grid_item';
        let gridImg = document.createElement("img");
        gridImg.src = arrOfNews[(nIndex+i) % arrOfNews.length].img;
        gridImg.alt = arrOfNews[(nIndex+i) % arrOfNews.length].alt;
        gridImg.style.width = arrOfNews[(nIndex+i) % arrOfNews.length].width;
        let gridTitle = document.createElement("h4");
        gridTitle.className = 'news_title';
        gridTitle.textContent = arrOfNews[(nIndex+i) % arrOfNews.length].title;
        gridItem.appendChild(gridImg);
        gridItem.appendChild(gridTitle);
        slider.appendChild(gridItem);
    }
};

const arrowRight = document.querySelector('#arrow_right');
arrowRight.addEventListener('click', function(){
    nIndex++;
    initSlider(); 
}
);

const arrowLeft = document.querySelector('#arrow_left');
arrowLeft.addEventListener('click', function(){
    nIndex--;
    nIndex = (nIndex + arrOfNews.length) % arrOfNews.length;
initSlider();
}
);
       
initSlider();

//функция для раскрытия бургер меню в мобильной версии
document.querySelector('#header__menu_mobile>svg').addEventListener('click', menuBurgerOpen);
document.querySelector('#burger_menu_head>svg').addEventListener('click', closeBurgerMenu);

//следование выпадающего меню за иконкой "меню"
let burgerMenuLabel = document.querySelector('#header__menu_mobile>svg');

function menuBurgerOpen(){
let hiddenMenu = document.querySelector('#burger_menu');
//получаем координаты иконки "меню"
let coords = burgerMenuLabel.getBoundingClientRect();
hiddenMenu.style.top = coords.top-70 + scrollY + "px";
hiddenMenu.style.left = "0px";
};

function closeBurgerMenu(){
    const burgerMenu = document.querySelector('#burger_menu');
    burgerMenu.style.left = "-500px";
}

//закрытие бургер меню при переходе по ссылке из этого меню
const burgerMenuRef = [...document.querySelectorAll("#burger_menu>ul>li")];
burgerMenuRef.forEach((elem)=> elem.addEventListener('click',closeBurgerMenu));

//закрытие бургер-меню при скорлле страницы, клике вне страницы
window.addEventListener('scroll', closeBurgerMenu);







    
