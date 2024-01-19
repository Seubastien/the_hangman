let tableWords = ["balade", "chanson", "anniversaire", "elephant"]
let word = document.querySelector('#word')
let randomWord;
let keyBoard = document.querySelector('#kbd')
let hanged = document.querySelector('#hangedMan')
let main = document.querySelector('#mainContainer')
let endGame = document.createElement('div')
let image = document.createElement('img')
let alphaTab = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
    ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

]
let hiddenWord = ""
let hangedCount = 0


// fonction générer mot aléatoirement
let generWord = () => {
    randomNbr = randomize(0, tableWords.length - 1)

    randomWord = tableWords[randomNbr]
}
generWord()

//Fonction petit trait
let generSmallLine = (wo) => {
    for (let i = 0; i < wo.length; i++) {
        hiddenWord += "_"
    }
    document.querySelector('#smallLine').innerHTML = hiddenWord
}
generSmallLine(randomWord)

//Fonction random
function randomize(min, max) {
    let nbr = Math.floor(Math.random() * (max - min + 1)) + min;
    return nbr;
}

let prepareLetter = () => {

    alphaTab.forEach((arr) => {
        let letterContainer = document.createElement('div')
        keyBoard.appendChild(letterContainer)
        letterContainer.classList.add("letterContainer",)
        arr.forEach((letter) => {
            let paragraphe = document.createElement('p')
            paragraphe.classList.add('letter')
            paragraphe.addEventListener('click', () => {
                choiceLetter(letter)
            })
            letterContainer.appendChild(paragraphe)
            paragraphe.innerHTML = letter
        })
    })
}


//Fonction choisir une lettre

let choiceLetter = (el) => {
    let voidWord = "";
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] == el) {
            voidWord += el
        }
        else {
            voidWord += hiddenWord[i]
        }
    }
    verif(el)
    hiddenWord = voidWord
    if (hiddenWord == randomWord) {
        main.appendChild(endGame)
        endGame.innerHTML = "YOU WIN"
        endGame.classList.add('gameOv')
        console.log("You win");
    }
    document.querySelector('#smallLine').innerHTML = hiddenWord

}

//Fonction verif
let verif = (el) => {

    if (!randomWord.includes(el)) {
        if (hangedCount >= 11) {
            endGame.classList.add('gameOv')
            main.appendChild(endGame)
            endGame.innerHTML = "GAME OVER"
        } else {
            displayHanged(hangedCount)
            hangedCount++
        }

    }
}

//Fonction afficher pendu

let displayHanged = (nb) => {
    image.src = ""
    image.src = `assets/images/pendu_${nb}.png`
    hanged.appendChild(image)
}
prepareLetter()

//Fonction rejouer
let reStart = () => {
    let replay = document.createElement('div')
    replay.classList.add('rep')
    main.appendChild(replay)
    replay.addEventListener('click', () => {

        hangedCount = 0
        hiddenWord = ""
        document.querySelector('#hangedMan').innerHTML = ""
        generWord()
        generSmallLine(randomWord)
        endGame.innerHTML = ""
    })
    replay.innerHTML = "REJOUER"

}
reStart()

