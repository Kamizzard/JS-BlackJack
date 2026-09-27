let player = {
    name: "Kami",
    chips: 1000,
    bet: 50
}

let cards = []
let sum = 0
let bet = 50
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

updatePlayerDetails()

function updatePlayerDetails(){
playerEl.textContent = player.name + ": $" + player.chips + " Bet: $" + player.bet
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips >= player.bet && (!isAlive || hasBlackJack)){
        player.chips -= player.bet
        updatePlayerDetails()
        isAlive = true
        hasBlackJack = false
        cards.push(getRandomCard())
        cards.push(getRandomCard())
        cards = [cards[0], cards[1]]
        sum = cards[0] + cards[1]
        renderGame()
    }
    else {
        message = "You're out of chips!"
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += (player.bet * 2) 
        updatePlayerDetails()
    } else {
        message = "You're out of the game!"
        isAlive = false
        updatePlayerDetails()
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
