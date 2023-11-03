document.addEventListener("DOMContentLoaded", function () {

    // VARIABLES //   

    const screen = document.getElementById("screen")
    const canvasContainer = document.getElementById("canvasContainer")
    const playBtn = document.getElementById("playBtn")
    const gameContainer = document.getElementById("gameContainer")
    const nameAndClassChooseContainer = document.getElementById("nameAndClassChooseContainer")
    const validateHeroName = document.getElementById("validateHeroName");
    const heroNameContainer = document.getElementById("heroNameContainer");
    const nameInput = document.getElementById("nameInput");
    const saveNameButton = document.getElementById("saveNameButton");
    const validateNameIcon = document.getElementById("validateNameIcon");
    const nameMoreInfo = document.getElementById("nameMoreInfo")
    const startingItemRadios = document.querySelectorAll('input[name="startingItemRadio"]');
    const classButtons = document.querySelectorAll(".classBtns")
    const startPrologueBtn = document.getElementById("startPrologueBtn")
    const startPrologueConditions = document.getElementById("startPrologueConditions")
    const prologueMainContainer = document.getElementById("prologueMainContainer")
    const prologueContainer = document.getElementById("prologueContainer")

    let playerName = ""
    let selectedStartingItem = ""
    let selectedClass = ""
    
    const prologueText = "Bonjour, je suis une chaîne de caractères !";

    // screen.classList.remove("gameOff")
    // gameContainer.classList.remove("gameOff")


    // THE GAME CONSTRUCTOR //
  
    class Game {
        constructor(config) {
            this.element = config.element
            this.canvas = this.element.querySelector(".gameCanvas")
            this.ctx = this.canvas.getContext("2d")
        }

        init() { // EVENTS HERE //
            this.loadImages()

            playBtn.addEventListener("click", () => this.pushPlayBtn())
                heroNameContainer.addEventListener("click", () => {
                heroNameContainer.style.display = "none"
                nameInput.style.display = "inline"
                saveNameButton.style.display = "flex"
                validateNameIcon.style.display = "none"
                nameMoreInfo.textContent = "*If you don't choose a new name, 'Zero' will be choose by default if you save."
            
                // Set the initial value of the input to the current hero name //
                nameInput.value = ""
            })

            saveNameButton.addEventListener("click", () => {
                const newName = nameInput.value
                nameMoreInfo.textContent = "You successfully took the name : " + newName
                validateNameIcon.style.display = "inline"
            
                if (newName.trim() !== "") {
                    validateHeroName.textContent = newName
                    heroNameContainer.textContent = newName
                } else {
                    validateHeroName.textContent = "Zero"
                    heroNameContainer.textContent = "Zero"
                    nameMoreInfo.textContent = "You chose to keep the name : 'Zero'"
                }

                nameInput.style.display = "none";
                heroNameContainer.style.display = "inline";
                heroNameContainer.style.overflow = "hidden";
                playerName = validateHeroName.textContent
            })

            for (const radio of startingItemRadios) {
                radio.addEventListener("change", () => {
                    selectedStartingItem = radio.value
                })
            }

            for (const button of classButtons) {
                button.addEventListener("click", () => {
                    const validateClassIcons = document.querySelectorAll(".validateClassIcons")

                    selectedClass = button.getAttribute("data-class")

                    const correspondingIcon = document.querySelector(`.validateClassIcons[data-class="${selectedClass}"]`)
                    
                    validateClassIcons.forEach((icon) => {
                        icon.style.display = "none"
                    })
            
                    if (correspondingIcon) {
                        correspondingIcon.style.display = "inline"
                    }
                })
            }

            startPrologueBtn.addEventListener("click", () => {
                if (playerName && selectedStartingItem && selectedClass) {
                    nameAndClassChooseContainer.style.display = "none"
                    prologueMainContainer.style.display = "block"
                } else {
                    startGameConditions.style.display = "block"
                }

                // this.showPrologueTextCharacterByCharacter(prologueText)
            })
            
            this.showPrologueTextCharacterByCharacter(prologueText)
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

        pushPlayBtn() {
            playBtn.classList.add("hidePlayBtn")
            nameAndClassChooseContainer.classList.remove("gameOff")
        }
        
        showPrologueTextCharacterByCharacter(element) {
            for (let i = 0; i < element.length; i++) {
                setTimeout(() => {
                    prologueContainer.innerHTML += element[i]
                }, i * 100)
            }
        }
    }

    // THE GAME //

    const game = new Game({
        element: canvasContainer,
    })

    game.init()
    
    // ON LOAD : SHOW THE TEXT IN PLAY BTN //

    showTextFromPlayBtnCharacterByCharacter(playBtn, "play")

    // FUNCTIONS //

    function showTextFromPlayBtnCharacterByCharacter(element, text) {
        let currentIndex = 0

        function updateText() {
            if (currentIndex < text.length) {
                element.innerText += text[currentIndex]
                currentIndex++
                setTimeout(updateText, 500)
            }
        }
        updateText()
    }
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


