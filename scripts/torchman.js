const roads = [
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
]

const torches = [
    {
        top: 200,
        left: 0
    },
    {
        top: 400,
        left: 270
    }
]

let levelStage = [true, false, false, false]
let currentStage = 0, stageEnd = false

let currentPosition = {
    top: 250,
    left: 250
}

var activeTorch = -1
var isTorchManActive = false

const status = document.getElementById('Status')

const map = document.getElementById('Map')

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
}

function nextLevel(){
    levelStage = [true, false, false, false]
    currentStage = 0
    stageEnd = false
    status.className = 'Hidden'
    torchDivs[activeTorch].className = 'Torch'
    activeTorch = -1
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