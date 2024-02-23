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

    alphaTab.forEach((arr, index) => {
        let letterContainer = document.createElement('div')
        keyBoard.appendChild(letterContainer)
        letterContainer.classList.add("letterContainer",)
        arr.forEach((letter) => {
            let paragraphe = document.createElement('p')
            paragraphe.classList.add('letter')
            paragraphe.addEventListener('click', () => {
                if(alphaTab[index].includes(letter)){
                    choiceLetter(letter, paragraphe)
                paragraphe.style = "box-shadow: 1px 1px 2px black, 0 0 1em  black, 0 0 0.2em  black"
                paragraphe.style.backgroundColor = "black"
                paragraphe.style.color = "white"
                paragraphe.style.cursor = "initial"
                alphaTab[index].splice(alphaTab[index].indexOf(letter), 1)// on supprime la lettre directement sur alphaTab et non sur arr 
                // pour pouvoir remmetre à zero le tableau initial alphaTab car arr n'est pas accessible en dehor de cette fonction.
                }

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
        document.querySelector('#result').style.display = "block"
        document.querySelector('#result').innerHTML = "YOU WIN"
    }
    document.querySelector('#smallLine').innerHTML = hiddenWord

}

//Fonction verif
let verif = (el) => {

    if (!randomWord.includes(el)) {
        displayHanged(hangedCount)
        if (hangedCount >= 10) {
            document.querySelector('#result').style.display = "block"
            document.querySelector('#result').innerHTML = "GAME OVER"
            document.querySelector('#smallLine').innerHTML = voidWord
        } else {
           hangedCount++
        }

    }
}

//Fonction afficher pendu
let displayHanged = (nb) => {
    image.src = ""
    image.src = `assets/images/pendu_${nb}.png`
    image.classList.add('imgHanged')
    hanged.appendChild(image)
}
prepareLetter()

//Fonction rejouer
let reStart = () => {
    let replay = document.createElement('div')
    replay.classList.add('rep')
    document.querySelector('#playAgain').appendChild(replay)
    replay.addEventListener('click', () => {
        alphaTab = [
            ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
            ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        
        ]
        document.querySelector('#result').style.display = "none"
        hangedCount = 0
        hiddenWord = ""
        document.querySelector('#hangedMan').innerHTML = ""
        generWord()
        generSmallLine(randomWord)
        endGame.innerHTML = ""
        let letters = document.querySelectorAll(".letter");
        letters.forEach((letter)=>{
            letter.style = "box-shadow: 0"
            letter.style.backgroundColor = "white"
            letter.style.color = "black"
        })
    })

    replay.innerHTML = "REJOUER"

}
reStart()


