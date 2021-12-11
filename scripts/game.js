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
        torches: [
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
        torches: [
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
var currentPosition;

// Мигающий фонарь
var activeTorch;

// Активный ли фонарщик
var isTorchManActive;

// Очки, имя
var score, name;

// div для карты
var map = document.getElementById('Map');

// div для фонарщика
var torchMan = document.getElementById('TorchMan');

// div'ы для фонарей
var torchDivs;

// div для меню
var menu = document.getElementById('Menu');

// div для итогового окна
var status = document.getElementById('Status');

// div для очков
var scoreDiv = document.getElementById('Score');

// div для имени
var nickname = document.getElementById('Nickname');

// div для перехода в menu
var toMenu = document.getElementById('ToMenu');

// Функция постановки уровня на паузу
function pause(){

}

// Функция начала уровня
function startLevel() {

}

// Функция инициализации карты
function generateMap() {

}

// Функция движения фонарщика
function moveTorchMan() {

}

// Зажечь фонарь
function lightTorch() {

}

// Функция создания меню и получение опций
function settings(){
    const
}

settings()