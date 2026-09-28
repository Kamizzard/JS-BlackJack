let player = {
    name: "Kami",
    chips: 500,
    bet: document.getElementById("bet-el").value
}

let cards = []
let sum = 0
let won = false
let isAlive = false
let standing = false
let message = ""
let dealerCards = []
let dealerSum = 0

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

updatePlayerDetails()

function updatePlayerDetails(){
playerEl.textContent = player.name + ": $" + player.chips + " Bet: $" + player.bet
}

function startGame() {
    if (player.chips >= player.bet && (!isAlive || won)){
        player.chips -= player.bet
        updatePlayerDetails()
        isAlive = true
        standing = false
        won = false
        cards.push(getRandomCard())
        cards.push(getRandomCard())
        sum = cards[0] + cards[1]
        dealerDraw()
        renderGame()

    }else if(player.chips < player.bet && (!isAlive || won)){
        message = "You're out of chips!"
        messageEl.textContent = message
    }else{}
}

function renderGame() {
    displayPlayerCards()
    sumEl.textContent = "Sum: " + sum
    
    if (sum < 21 && !standing) {
        message = "What is your move?"
    } 
    else if (sum > 21 || (dealerSum < 22 && sum < dealerSum) ) {
        message = "You lost!"
        isAlive = false
        clearGame()
    }
    else if (sum === dealerSum){
        player.chips += Number(player.bet)
        won = true
        message = "Push!"
        clearGame()
    } 
    else{
        player.chips += (player.bet * 2) 
        won = true
        message = "You won!"
        clearGame()
    }
    messageEl.textContent = message
    updatePlayerDetails()

}

function clearGame() {
    cards = []
    dealerCards = []
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

function newCard() {
    if (isAlive === true && won === false) {
        let card = getRandomCard() 
        cards.push(card) 
        sum += card
        renderGame()        
    }
}

function stand() {
    if (isAlive === true && won === false) {
        standing = true
        renderGame()        
    }    
}

function dealerDraw() {
    dealerCards.push(getRandomCard())
    dealerCards.push(getRandomCard())
    dealerSum = dealerCards[0] + dealerCards[1]

    while (dealerSum < 17){
        card = getRandomCard()
        dealerCards.push(card)
        dealerSum += card
    }
    console.log(dealerSum)
}

function displayPlayerCards() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
}
