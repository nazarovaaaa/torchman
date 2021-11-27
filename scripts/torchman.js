const roads = [
    {
        top: 50,
        left: 50,
        bottom: 100,
        right: 250
    },
    {
        top: 50,
        left: 50,
        bottom: 300,
        right: 100
    },
    {
        top: 250,
        left: 50,
        bottom: 300,
        right: 300
    }
]

const torches = [
    {
        top: 50,
        left: 0
    },
    {
        top: 230,
        left: 290
    }
]


var activeTorch = -1

const map = document.getElementById('Map')

let currentPosition = {
    top: 70,
    left: 70
}

function torchLight(key) {
    const torch = torches[key]
    if( Math.abs(torch.top + 45 - (currentPosition.top - 23)) < 100
        && Math.abs(torch.left + 30 - (currentPosition.left - 26)) < 100 && activeTorch === key){
        torchDivs[key].className = 'Torch'
        console.log('aaaaaaaaa')
        activeTorch = -1
    }
}


function move(event) {
    if(Math.abs(currentPosition.top - (event.clientY)) < 40
        && Math.abs(currentPosition.left - (event.clientX)) < 40){
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
    map.append(roadDiv)
})


torches.forEach((torch, key) => {
    const torchDiv = document.createElement('div')
    torchDiv.className='Torch'
    torchDiv.style.top = `${torch.top}px`
    torchDiv.style.left = `${torch.left}px`
    torchDiv.ondblclick = () => torchLight(key)
    map.append(torchDiv)
})

var torchDivs = document.getElementsByClassName('Torch')


function randomTwinkle() {
    if(activeTorch === -1){
        activeTorch = Math.floor(Math.random() * 10) % torches.length
        torchDivs[activeTorch].className = 'Torch TorchTwinckling'
        setTimeout(()=>{
            if(activeTorch != -1){
                map.innerText = "ВЫ ЕБЛАН АХАХАХА"
            }
        }, 3000)
    }
}


const torchMan = document.getElementById('TorchMan')
setInterval(randomTwinkle, 6000)