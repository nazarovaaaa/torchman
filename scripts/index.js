const Stages = [
    {
        start:{
            left: 250,
            top: 250
        },
        time: 3000,
        roads:[
            {
                top: 200,
                left: 0,
                bottom: 250,
                right: 480
            },
            {
                top: 0,
                left: 240,
                bottom: 480,
                right: 270
            },
        ],
        few: [
            {
                top: 200,
                left: 0
            },
            {
                top: 400,
                left: 270
            }
        ],
        points: 50,
        background:'url("./assets/map.svg")'
    },
    {
        start:{
            left: 250,
            top: 100
        },
        time: 5000,
        points: 100,
        roads:[
            {
                top: 380,
                left: 0,
                bottom: 420,
                right: 250
            },
            {
                top: 410,
                left: 230,
                bottom: 450,
                right: 440
            },
            {
                top: 280,
                left: 150,
                bottom: 385,
                right: 180
            },
            {
                top: 177,
                left: 135,
                bottom: 283,
                right: 218
            },
            {
                top: 100,
                left: 200,
                bottom: 173,
                right: 224
            },
            {
                top: 50,
                left: 200,
                bottom: 105,
                right: 385
            },
            {
                top: 100,
                left: 355,
                bottom: 195,
                right: 385
            },
            {
                top: 120,
                left: 385,
                bottom: 258,
                right: 430
            },
            {
                top: 220,
                left: 210,
                bottom: 240,
                right: 350
            },
            {
                top: 340,
                left: 315,
                bottom: 410,
                right: 410
            },
            {
                top: 200,
                left: 350,
                bottom: 340,
                right: 390
            },
            {
                top: 165,
                left: 0,
                bottom: 195,
                right: 130
            },
            {
                top: 0,
                left: 60,
                bottom: 160,
                right: 85
            },
        ],
        few: [
            {
                top: 53,
                left: 90
            },
            {
                top: 392,
                left: 377
            },
            {
                top: 347,
                left: 0
            }
        ],
        background:'url("./assets/map_3.svg")'
    }
]

// 0 - Двигайтесь по дороге
// 1 - Фонари необходимо зажигать
// 2 - Вы пропустили фонарь
var Notifications = [
    false,
    false,
    false
];

// Тип игры, карта,
var Mode, Stage, SubStage;

// Дороги, фонари, используемые уровнем
var roads, torches;

// Чекпоинты, текущий чекпоинт, окончание игры
var levelStage, currentStage, stageEnd;

// Время для нового фонаря, setInterval (для clearInterval)
var time_to_spawn, interval;

// Текущая позиция
var currentPosition = {};

// Мигающий фонарь
var activeTorch;

// Активный ли фонарщик
var isTorchManActive;

// Очки, имя, предыдущий/текущий рекорд
var score, name, record;

// div для карты
const map = document.getElementById('Map');

// div для фонарщика
const torchMan = document.getElementById('TorchMan');

// div'ы для фонарей
var torchDivs = [];

// div для меню
const menu = document.getElementById('Menu');

// div для итогового окна
const status = document.getElementById('Status');
console.log(status)
// div для очков
const scoreDiv = document.getElementById('Score');

// div для имени
const nickname = document.getElementById('Nickname');
console.log(scoreDiv)
// div для перехода в menu
var toMenu = document.getElementById('ToMenu');

torchMan.onclick = () => {
    console.log(11)
    isTorchManActive = !isTorchManActive
}


function switchVisibility(element, mode= false){
    element.className = mode?'':'Hidden'
}

function insertInnerHtml(element, tags= ""){
    element.innerHTML = tags
}


// Функция инициализации карты
function generateMap() {
    insertInnerHtml(map)
    map.style.backgroundImage = Stages[Stage].background
    map.prepend(torchMan, toMenu)
    map.prepend(status)
    if(Mode === 2){
        map.prepend(scoreDiv)
    }
    map.prepend(nickname, menu)

    roads.forEach((road) =>{
        const roadDiv = document.createElement('div')
        roadDiv.className='Road'
        roadDiv.style.top = `${road.top}px`
        roadDiv.style.left = `${road.left}px`
        roadDiv.style.width = `${road.right - road.left}px`
        roadDiv.style.height = `${road.bottom - road.top}px`
        roadDiv.onmousemove = moveTorchMan
        map.prepend(roadDiv)
    })

    torches.forEach((torch, key) => {
        const torchDiv = document.createElement('div')
        torchDiv.className='Torch'
        torchDiv.style.top = `${torch.top}px`
        torchDiv.style.left = `${torch.left}px`
        torchDiv.ondblclick = () => torchLight(key)
        map.append(torchDiv)
        torchDivs.push(torchDiv)
    })
}

// Функция движения фонарщика
function moveTorchMan(event) {
    if(isTorchManActive && Math.abs(currentPosition.top - (event.clientY)) < 60
        && Math.abs(currentPosition.left - (event.clientX)) < 60){
        currentPosition.top = event.clientY
        currentPosition.left = event.clientX
        torchMan.style.top = `${event.clientY - 23}px`
        torchMan.style.left = `${event.clientX - 26}px`
    }
}

function animateScore(){
    scoreDiv.innerHTML = score
    scoreDiv.style.color = 'green'
    setTimeout(()=>{
        scoreDiv.style.color = 'white'
    }, 750)
}

// Зажечь фонарь
function torchLight(key) {
    const torch = torches[key]
    if( Math.abs(torch.top + 45 - (currentPosition.top - 23)) < 100
        && Math.abs(torch.left + 30 - (currentPosition.left - 26)) < 100 && activeTorch === key && !stageEnd){

        if(Mode===1){
            currentStage--;
        }
        else{
            levelStage[currentStage] = true
        }

        torchDivs[key].className = 'Torch'
        activeTorch = -1

        if(levelStage[currentStage] && currentStage === (levelStage.length - 1)){
            finishLevel(0)
        }
        if(Mode === 2){
            score += Stages[Stage].points
            animateScore()
            localStorage.setItem('score', score)
        }
    }
}



function refreshMeta () {
    torchDivs = []
    levelStage = [true, ...torches.map((item) => false)];
    stageEnd = false;
    score = 0;
    activeTorch = -1;
    currentStage = 0;
    currentPosition.top = Stages[Stage].start.top;
    currentPosition.left = Stages[Stage].start.left
}

// Функция постановки уровня на паузу
function pause() {

}

const statusSet = [
    `<div class="Success">Вы выиграли</div>`,
    `<div class="Error">Вы проиграли</div>`,
    `<div class="Success">Новый рекорд!</div>`,
    `<div class="Error">Предыдущий рекорд:</div>`
]

function finishLevel (result) {
    stageEnd = true;
    switchVisibility(status,true)
    if(result === 0 && (Mode === 0 || Mode === 1)){
        insertInnerHtml(status, statusSet[0])
    }
    if(result === 1 && (Mode === 0 || Mode === 1)){
        insertInnerHtml(status, statusSet[1])
    }
    if(result === 0 && Mode === 1){
        insertInnerHtml(status, statusSet[2])
    }
    if(result === 1 && Mode === 1){
        insertInnerHtml(status, statusSet[3])
    }
    clearInterval(interval)
}

function randomTwinkle() {
    if(levelStage[currentStage] && !stageEnd){
        activeTorch = Math.floor(Math.random() * 10) % torches.length;
        torchDivs[activeTorch].className = 'Torch TorchTwinkling';
        currentStage++;
        setTimeout(() => {
            if(!levelStage[currentStage] && !stageEnd){
                finishLevel(1)
            }
        }, time_to_spawn)
    }
}

// Функция начала уровня
function startLevel() {
    switchVisibility(menu)
    refreshMeta()
    generateMap()
    interval = setInterval(randomTwinkle, time_to_spawn + 1000)
}

function setMode(mode_){
    Mode = mode_;
    settings(1)
}

function setStage(stage_){
    Stage = stage_;
    roads = Stages[Stage].roads;
    currentPosition.left = Stages[Stage].start.left
    currentPosition.top = Stages[Stage].start.top
    settings(2)
}

function setTorches(torches_){
    torches = Stages[Stage][torches_];
    levelStage = [true, ...torches.map((item) => false)]
    console.log(levelStage)
    settings(3)
}

function setInterval_(interval_){
    time_to_spawn = interval_;
    settings(4)
}

// Сет для меню
const menuSet = [
    `<div>Режим игры</div>
     <div onclick="setMode(0)">Определенный уровень</div>
     <div onclick="setMode(1)">Уровни подряд</div>
     <div onclick="setMode(2)">Бесконечная игра</div>`,

    `<div>Тип карты</div>
     <div onclick="setStage(0)">Маленькая</div>
     <div onclick="setStage(1)">Большая</div>`,

    `<div>Количество фонарей</div>
     <div onclick="setTorches('few')">Мало</div>
     <div onclick="setTorches('many')">Много</div>`,

    `<div>Интервал времени</div>
     <div onclick="setInterval_(3000)">Малый</div>
     <div onclick="setInterval_(5000)">Большой</div>`,

    `<div onclick="startLevel()">Начать игру</div>`
]

// Функция создания меню и получение опций
function settings(step){
    menu.innerHTML = menuSet[step]
}

const input = `
        <input placeholder="введите ваше имя" type="text"/>
        <div onclick="settings(0)">Подтвердить</div>
`

function meta(){
    switchVisibility(menu, true)
    insertInnerHtml(menu, input)
}

meta();
