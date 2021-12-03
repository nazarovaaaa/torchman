const Stages = [
    {
        start:{
          left: 250,
          top: 250
        },
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
        background:'url("./assets/map.svg")'
    },
    {
        start:{
            left: 250,
            top: 250
        },
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
    },
]

let Stage = 0;

var torches = Stages[Stage].torches
var roads = Stages[Stage].roads

let levelStage = [true, false, false, false]
let currentStage = 0, stageEnd = false

let currentPosition = {
    top: 250,
    left: 250
}

var activeTorch = -1
var isTorchManActive = false

const status = document.getElementById('Status')

let map = document.getElementById('Map')

console.log(Stages[Stage].background)

map.style.backgroundImage = Stages[Stage].background

const torchMan = document.getElementById('TorchMan')

torchMan.onclick = () => {
    isTorchManActive = !isTorchManActive
}

function restartLevel(){
    levelStage = [true, false, false, false]
    currentStage = 0
    stageEnd = false
    status.className = 'Hidden'
    torchDivs[activeTorch].className = 'Torch'
    activeTorch = -1
    currentPosition.top = Stages[Stage].start.top
    currentPosition.left = Stages[Stage].start.left
    torchMan.style.top = `${Stages[Stage].start.top - 23}px`
    torchMan.style.left = `${Stages[Stage].start.left- 26}px`
}

function nextLevel(){
    Stage++
    levelStage = [true, false, false, false]
    map.style.backgroundImage = Stages[Stage].background
    torches = Stages[Stage].torches
    roads = Stages[Stage].roads
    generateMap()
    currentStage = 0
    stageEnd = false
    status.className = 'Hidden'
    activeTorch != -1 ? torchDivs[activeTorch].className = 'Torch': ''
    activeTorch = -1
    currentPosition.top = Stages[Stage].start.top
    currentPosition.left = Stages[Stage].start.left
    torchMan.style.top = `${Stages[Stage].start.top - 23}px`
    torchMan.style.left = `${Stages[Stage].start.left- 26}px`
}

function torchLight(key) {
    const torch = torches[key]
    if( Math.abs(torch.top + 45 - (currentPosition.top - 23)) < 100
        && Math.abs(torch.left + 30 - (currentPosition.left - 26)) < 100 && activeTorch === key && !stageEnd){
        levelStage[currentStage] = true
        torchDivs[key].className = 'Torch'
        activeTorch = -1
        if(levelStage[currentStage] && currentStage === (levelStage.length - 1)){
            stageEnd = true
            status.className = 'Success'
            status.innerHTML = "<div>Вы выиграли</div><div onclick='nextLevel()' class='Button'>Следующий уровень</div>"
        }
    }
}


function move(event) {
    if(isTorchManActive && Math.abs(currentPosition.top - (event.clientY)) < 60
        && Math.abs(currentPosition.left - (event.clientX)) < 60){
        currentPosition.top = event.clientY
        currentPosition.left = event.clientX
        torchMan.style.top = `${event.clientY - 23}px`
        torchMan.style.left = `${event.clientX - 26}px`
    }
}

function generateMap(){
    map.innerHTML=""
    map.prepend(torchMan)
    map.prepend(status)
    roads.forEach((road, key) => {
        const roadDiv = document.createElement('div')
        roadDiv.className='Road'
        roadDiv.style.top = `${road.top}px`
        roadDiv.style.left = `${road.left}px`
        roadDiv.style.width = `${road.right - road.left}px`
        roadDiv.style.height = `${road.bottom - road.top}px`
        roadDiv.onmousemove = move
        map.prepend(roadDiv)
    })

// const roads_ = document.getElementsByClassName('Road')
// roads_.forEach(item => {
//     item.onmousemove = move
// })


    torches.forEach((torch, key) => {
        const torchDiv = document.createElement('div')
        torchDiv.className='Torch'
        torchDiv.style.top = `${torch.top}px`
        torchDiv.style.left = `${torch.left}px`
        torchDiv.ondblclick = () => torchLight(key)
        map.append(torchDiv)
    })
}

generateMap()

var torchDivs = document.getElementsByClassName('Torch')

let time_to_spawn = 3000

function randomTwinkle() {
    if(levelStage[currentStage] && !stageEnd){
        activeTorch = Math.floor(Math.random() * 10) % torches.length
        torchDivs[activeTorch].className = 'Torch TorchTwinckling'
        currentStage++
        setTimeout(() => {
            if(!levelStage[currentStage] && !stageEnd){
                stageEnd = true
                status.className = 'Error'
                status.innerText = "Вы обосрались"
                status.innerHTML = "<div>Вы проиграли</div><div onclick='restartLevel()' class='Button'>Заново</div>"
            }
        }, time_to_spawn)
    }
}


setInterval(randomTwinkle, time_to_spawn + 1000)