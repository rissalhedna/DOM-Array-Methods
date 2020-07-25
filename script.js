const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')
const doubleBtn = document.getElementById('double')

let data = []

//fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }
    addData(newUser)
    console.log('got it')
}

function addData(obj){
    data.push(obj)
    updateDOM()
}

function updateDOM(providedData = data){
    main.innerHTML ='<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach(function(item){
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> $${item.money}`
        main.appendChild(element)
    })
}
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortByRichest)
showMillionairesBtn.addEventListener('click',showMillionaires)
calculateWealthBtn.addEventListener('click',calculateWealth)


function calculateWealth(){
    const wealth = data.reduce((acc,user)=>(acc+=user.money),0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${wealth}</strong></h3>`
    main.appendChild(wealthEl)
}
function showMillionaires(){
    data = data.filter(user => user.money>1000000)
    updateDOM()
}
function sortByRichest(){
    data.sort(function(a,b){
        return b.money-a.money
    })
    updateDOM()
}

function doubleMoney(){
    data = data.map((user)=>{
        return {...user, money: user.money*2}
    })
    updateDOM()
}

getRandomUser()
getRandomUser()
getRandomUser()

