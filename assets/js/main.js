document.addEventListener("DOMContentLoaded", function () {
    // VARIABLES //   

    const screen = document.getElementById("screen")
    const canvasContainer = document.getElementById("canvasContainer")
    const playBtn = document.getElementById("playBtn")
    const gameContainer = document.getElementById("gameContainer")
    const heroNameContainer = document.getElementById("heroName")

    // THE GAME CONSTRUCTOR //
  
    class Game {
        constructor(config) {
            this.element = config.element
            this.canvas = this.element.querySelector(".gameCanvas")
            this.ctx = this.canvas.getContext("2d")
        }

        init() {
            this.loadImages()
            playBtn.addEventListener("click", () => this.startGame())
        }

        loadImages() {
            const bcg = new Image()
            const warriorHero = new Image()
            const wizardHero = new Image()

            bcg.onload = () => {
                this.ctx.drawImage(bcg, 0, 0)
            }
            bcg.src = "assets/img/background.png"

            warriorHero.onload = () => {
                this.ctx.drawImage(warriorHero, 50, 110)
            }
            warriorHero.src = "assets/img/hero.png"
        }

        startGame() {
            playBtn.classList.add("hidePlayBtn")
            screen.classList.remove("gameOff")
            gameContainer.classList.remove("gameOff")

            window.setTimeout(() => {
                const hero = { name: window.prompt("Enter new name") }

                if (hero.name) {
                    heroNameContainer.innerText = hero.name
                }
            }, 1000)
        }
    }

    // THE GAME //

    const game = new Game({
        element: canvasContainer,
    })

    game.init()

    // FUNCTIONS //

    function showTextCharacterByCharacter(element, text) {
        let currentIndex = 0

        function updateText() {
            if (currentIndex < text.length) {
                element.innerText += text[currentIndex]
                currentIndex++
                setTimeout(updateText, 300)
            }
        }
        updateText()
    }

    // ON LOAD : SHOW THE TEXT IN PLAY BTN //

    showTextCharacterByCharacter(playBtn, "play")
})

    // // LES PERSONNAGES //
    
    // let hero = {}
    // hero.name = null
    // hero.lvl = 1
    // hero.pv = 100
    // hero.atq = 1 
    // hero.def = 1
    // hero.heal = 5
    // hero.xp = 0
    
    // let boss = {}
    // boss.pv = 100
    // boss.atq = 1
    // boss.def = 1
    
    // // ----fonctions intellignetes---- //
    // let dialogueBox = document.getElementById("dialogueBox")
    
    // let btnAtq = document.getElementById("atq")
    // let btnDef = document.getElementById("def")
    // let btnHeal = document.getElementById("heal")
    
    // // LES VARIABLES D'INTERACTIONS //
    
    // let degatH = boss.pv - hero.atq
    
    // // LES ARMES //
    
    
        
    
    
    // // LES ARMURES //
    
    
    // // mes fonctions //
    
    // ---evenement click play => affiche le jeu--- //
   
    
    // // function arme() {
    // //     let power = 3
    // //     let epee =  {
    // //         "bois" : {
    // //             "atq" : Math.floor(Math.random() * power) + 1
    // //         },
    // //         "cuivre" : {
    // //             "atq" : Math.floor(Math.random() * (power * 2)) + 3
    // //         },
    // //         "fer" : {
    // //             "atq" : Math.floor(Math.random() * (power * 3)) + 6
    // //         }
    // //     }
    // //     return epee
    // // }
    
    // // ---evenement click btn atq--- //
    // btnAtq.addEventListener("click", function(){
    //   Atq()
    // })
    
    // // ---fonction attaque--- //
    // function Atq() {
    //   let resultat = Math.floor(Math.random() * 6) + 1
    //   // let {bois, cuivre , fer} = arme()
    //   if (resultat > 1) {
    //       dialogueBox.innerHTML = ("L'attaque est un succés")
    //       if (resultat == 6) {
    //           dialogueBox.innerHTML = ("L'attaque est un succés critique et vous infligez " + ((hero.atq) * 2) + " dégat au boss")
    //           // rajouter bois.atq
    //       } else {
    //           dialogueBox.innerHTML = ("L'attaque est un succés simple et vous infligez " + (hero.atq) + " dégat au boss")
    //           // rajouter bois.atq
    //       }
    //   } else {
    //       dialogueBox.innerHTML = ("L'attaque est un échec")
    //   }
    // }
    
    // // --- evenement click btn def--- //
    
    // btnDef.addEventListener("click", function(){
    //   Def()
    // })
    
    // // ---fonction défence--- //
    
    // function Def() {
    //   let resultat = Math.floor(Math.random() * 6) + 1
    //   if (resultat > 3) {
    //       dialogueBox.innerHTML = ("La défence est un succés")
    //   } else {
    //       dialogueBox.innerHTML = ("La défence est un échec")
    //   }
    // }
    
    // // --- evenement click btn heal--- //
    
    // btnHeal.addEventListener("click", function(){
    //   Heal()
    // })
    
    // // ---fonction heal--- //
    
    // function Heal() {
    //   let resultat = Math.floor(Math.random() * 6) + 1
    //   if (resultat > 2) {
    //       dialogueBox.innerHTML = ("Le soin est un succés")
    //       if (resultat == 6) {
    //           dialogueBox.innerHTML = ("Le soin est un succés critique et vous vous soignez de " + ((hero.atq) * 2) + " dégat au boss")
    //       } else {
    //           dialogueBox.innerHTML = ("Le soin est un succés simple et vous vous soignez de " + (hero.atq) + " dégat au boss")
    //       }
    //   } else {
    //       dialogueBox.innerHTML = ("Le soin est un échec")
    //   }
    // }


