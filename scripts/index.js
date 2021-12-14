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
        many: [
            {
                top: 200,
                left: 0
            },
            {
                top: 400,
                left: 270
            },
            {
                top: 20,
                left: 200
            },
            {
                top: 200,
                left: 420
            }
        ],
        points: 50,
        background:'url("./assets/map.svg")'
    },
    {
        start:{
            left: 130,
            top: 200
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
        many: [
            {
                top: 53,
                left: 90
            },
            {
                top: 100,
                left: 400
            },
            {
                top: 100,
                left: 10
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
var prev;
var Notifications = [
    {
        flag: false,
        div: `Нажмите на фонарщика, чтобы выбрать его.`
    },
    {
        flag: false,
        div: `Фонарь гаснет! Зажги его!`
    },
    {
        flag: false,
        div: `Вести фонарщика необходимо постепенно!`
    },
    {
        flag: false,
        div: `Вести фонарщика необходимо исключительно по улицам!`
    },
    {
        flag: false,
        div: `Нажмите два раза на фонарь, чтобы зажечь его`
    },
    {
        flag: false,
        div: `Необходимо подойти к фонарю, чтобы его зажечь!`
    }
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
var score, name, record = 0;

// div для карты
const map = document.getElementById('Map');

// div для фонарщика
const torchMan = document.getElementById('TorchMan');

// div'ы для фонарей
var torchDivs = [];

var town = document.getElementById('Town')

const torchStatus = document.getElementById('TorchStatus')
// div для меню
const menu = document.getElementById('Menu');

// div для итогового окна
const status = document.getElementById('Status');
// div для очков
const scoreDiv = document.getElementById('Score');

const timer = document.getElementById('Timer')

// div для имени
const nickname = document.getElementById('Nickname');
console.log(scoreDiv)
// div для перехода в menu
var toMenu = document.getElementById('ToMenu');

var notification = document.getElementById('Notification')

toMenu.onclick = toMenuFunction

torchMan.onclick = () => {
    console.log(11)
    disableNotification(0, false)
    if(!isTorchManActive && activeTorch === -1)
        interval = setInterval(randomTwinkle, time_to_spawn + 1000)
    isTorchManActive = true
}

torchMan.onmouseenter = () => {
    isTorchManActive?disableNotification(3, false):''
}
let time = 0

var time_interval

function startTimer() {
    time = 0
    time_interval =     setInterval(function () {
        let seconds = time%60
        let minutes = Math.floor(time/60)%60
        let hour = Math.floor(time/60/60)%60
        timer.innerText = `${hour} : ${minutes} : ${seconds}`;
        time++;
    }, 1000)
}


function switchVisibility(element, mode= false){
    element.className = mode?'':'Hidden'
}

function setNotification(index, timeout){
    if(!Notifications[index].flag){
        insertInnerHtml(notification, Notifications[index].div)
        switchVisibility(notification,true)
        if(timeout){
            setTimeout(()=>{
                Notifications[index].flag = true
                switchVisibility(notification)
            }, timeout)
        }
    }
}

function disableNotification(index, flag=true){
    Notifications[index].flag = flag
    switchVisibility(notification)
}

function insertInnerHtml(element, tags= ""){
    element.innerHTML = tags
}

function toMenuFunction() {
    if(Mode === 2){
        if(score > record){
            record = score
            localStorage.setItem('record', record)
        }
    }
    clearInterval(time_interval)
    isTorchManActive = false
    toMenu.className='Hidden'
    status.className='Hidden'
    clearInterval(interval)
    refreshMeta()
    meta()
}

var torchStatusDivs = []

function generateTorchStatus(){
    torchStatus.innerHTML = ""
    torchStatusDivs = []
    for(let i = 0; i < levelStage.length - 1; i++){
        const torchStatusDiv = document.createElement('div')
        torchStatusDiv.className = 'TorchStatusDivInactive'
        torchStatusDivs.push(torchStatusDiv)
        torchStatus.append(torchStatusDiv)
    }
}

// Функция инициализации карты
function generateMap() {
    insertInnerHtml(map)
    map.style.backgroundImage = Stages[Stage].background
    map.prepend(torchMan, toMenu)
    torchMan.className=''
    map.prepend(timer)
    startTimer()
    timer.className=''
    torchMan.style.top = `${Stages[Stage].start.top}px`
    torchMan.style.left = `${Stages[Stage].start.left}px`
    toMenu.className='Button'
    map.prepend(status)
    map.prepend(notification)
    if(Mode === 2){
        map.prepend(scoreDiv)
        scoreDiv.className = ''
        scoreDiv.innerHTML = 0
    }
    menu.className= 'Hidden'
    map.prepend(nickname, menu)


    if(Mode === 0 || Mode === 1){
        map.prepend(torchStatus)
        generateTorchStatus()
    }

    town.onmouseenter = () => {
        isTorchManActive?setNotification(3):''
        console.log(1)
    }
    town.onmouseleave = () => {
        console.log(2)
        isTorchManActive?disableNotification(3, false):''
    }

    roads.forEach((road) =>{
        const roadDiv = document.createElement('div')
        roadDiv.className='Road'
        roadDiv.style.top = `${road.top}px`
        roadDiv.style.left = `${road.left}px`
        roadDiv.style.width = `${road.right - road.left}px`
        roadDiv.style.height = `${road.bottom - road.top}px`
        roadDiv.onmousemove = moveTorchMan
        roadDiv.onmouseenter = () => {
            isTorchManActive?disableNotification(3, false):''
        }
        roadDiv.onmouseleave = () => {
            isTorchManActive?setNotification(3):''
        }
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
    map.prepend(town)
}

// Функция движения фонарщика
function moveTorchMan(event) {
    if(isTorchManActive && Math.abs(currentPosition.top - (event.clientY)) < 60
        && Math.abs(currentPosition.left - (event.clientX)) < 60){
        currentPosition.top = event.clientY
        currentPosition.left = event.clientX
        torchMan.style.top = `${event.clientY - 23}px`
        torchMan.style.left = `${event.clientX - 26}px`
        disableNotification(2, false)
    }
    else if(isTorchManActive){
        setNotification(2)
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

        if(Mode===2){
            currentStage--;
        }
        else{
            levelStage[currentStage] = true
        }

        if(Mode === 0 || Mode === 1){
            torchStatusDivs[currentStage - 1].className='TorchStatusDivActive'
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
    else{
        setNotification(5,5000)
    }
}


function refreshMeta () {
    torchDivs = []
    levelStage = [true, ...torches.map((item) => false), ...torches.map((item) => false)];
    stageEnd = false;
    score = 0;
    isTorchManActive = false;
    activeTorch = -1;
    currentStage = 0;
    currentPosition.top = Stages[Stage].start.top;
    currentPosition.left = Stages[Stage].start.left
}

function nextLevel() {
    switchVisibility(status)
    if(torches.length === Stages[Stage].few.length){
        torches = Stages[Stage].many
    }
    else{
        if(Stage !== Stage.length - 1){
            console.log(1)
            Stage++;
        }
        else{
            console.log(2)
            Stage = 0;
        }
        torches = Stages[Stage].few
        roads = Stages[Stage].roads
    }
    // refreshMeta()
    // generateMap()
    startLevel()
}

function restartLevel() {
    switchVisibility(status)
    startLevel()
    // refreshMeta()
    // generateMap()
}


function finishLevel (result) {
    const statusSet = [
        `<div class="Success">Вы выиграли</div>
    <div onclick="nextLevel()"  class="Button">Следующий уровень</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`,
        `<div class="Error">Вы проиграли</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`,
        `<div class="Success">Новый рекорд!</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`,
        `<div class="Error">Предыдущий рекорд:</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`
    ]

    clearInterval(time_interval)

    toMenu.className='Hidden'
    stageEnd = true;
    switchVisibility(status,true)
    if(result === 0 && (Mode === 0 || Mode === 1)){
        insertInnerHtml(status, statusSet[0])
    }
    else if(result === 1 && (Mode === 0 || Mode === 1)){
        insertInnerHtml(status, statusSet[1])
    }
    else if(Mode === 2 && score > record){
        record = score
        localStorage.setItem('record', record)
        insertInnerHtml(status,`<div class="Success">Новый рекорд!</div>
    <div>${record}</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`)
    }
    else if(Mode === 2 && score <= record){
        insertInnerHtml(status,         `<div class="Error">Предыдущий рекорд:</div>
    <div>${record}</div>
    <div class="Error">Текущие очки:</div>
    <div>${score}</div>
    <div onclick="restartLevel()"  class="Button">Заново</div>
    <div onclick="toMenuFunction()" class="Button">
    В меню
    </div>
`)
    }
    let seconds = time % 60
    let minutes = Math.floor(time / 60) % 60
    let hour = Math.floor(time / 60 / 60) % 60

    status.prepend(`Ваше время: ${hour} : ${minutes} : ${seconds}`)

    clearInterval(interval)
}

function randomTwinkle() {
    if(levelStage[currentStage] && !stageEnd){
        do{
            activeTorch = Math.floor(Math.random() * 100) % torches.length;
        }while(activeTorch === prev)
        prev = activeTorch
        torchDivs[activeTorch].className = 'Torch TorchTwinkling';
        setNotification(1, 4000)
        currentStage++;
        setTimeout(() => {
            if(!levelStage[currentStage] && !stageEnd){
                setNotification(3, 3000)
                finishLevel(1)
            }
        }, time_to_spawn)
    }
}

// Функция начала уровня
function startLevel() {
    clearInterval(interval)
    switchVisibility(menu)
    refreshMeta()
    generateMap()
    if(!Notifications[0].flag) {
        setNotification(0)
    }
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
    levelStage = [true, ...torches.map((item) => false), ...torches.map((item) => false)]
    console.log(levelStage)
    settings(3)
}

function setInterval_(interval_){
    time_to_spawn = interval_;
    settings(4)
}

function clear_() {
    localStorage.clear()
    location.reload();
}

// Сет для меню


// Функция создания меню и получение опций
function settings(step){
    const menuSet = [
        `<div>Текущий рекорд в бесконечном режиме: ${record}</div>
    <div>Режим игры</div>
     <div class="Button" onclick="setMode(0)">Единственный уровень</div>
     <div class="Button" onclick="setMode(1)">Уровни подряд</div>
     <div class="Button" onclick="setMode(2)">Бесконечная игра</div>
         <div>Опции</div>
     <div class="Button" onclick="clear_()">Сменить пользователя</div>
`,

        `<div>Тип карты</div>
     <div class="Button" onclick="setStage(0)">Маленькая</div>
     <div class="Button" onclick="setStage(1)">Большая</div>`,

        `<div>Количество фонарей</div>
     <div class="Button" onclick="setTorches('few')">Мало</div>
     <div class="Button" onclick="setTorches('many')">Много</div>`,

        `<div>Интервал времени</div>
     <div class="Button" onclick="setInterval_(3000)">Малый</div>
     <div class="Button" onclick="setInterval_(5000)">Большой</div>`,

        `<div class="Button" onclick="startLevel()">Начать игру</div>`
    ]
    menu.innerHTML = menuSet[step]
}

function setName(event){
    name = event.target.value
    insertInnerHtml(nickname, name)
    localStorage.setItem('nickname', name)
}

const input = `
        <input onchange="setName(event)" placeholder="введите ваше имя" type="text"/>
        <div class="Button" onclick="settings(0)">Подтвердить</div>
`

function meta(){
    switchVisibility(menu, true)
    name = localStorage.getItem('nickname')
    const rec_ = localStorage.getItem('record')
    record = rec_? rec_ : 0
    if(name == 'null'){
        insertInnerHtml(menu, input)
    }
    else{
        insertInnerHtml(nickname, name)
        settings(0)
    }
}

meta();
