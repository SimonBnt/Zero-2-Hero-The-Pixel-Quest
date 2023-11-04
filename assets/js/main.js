document.addEventListener("DOMContentLoaded", function () {

    // VARIABLES //   

    const main = document.getElementById("main")
    const screen = document.getElementById("screen")
    const canvasContainer = document.getElementById("canvasContainer")
    const playBtnContainer = document.getElementById("playBtnContainer")
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
    const prologueContainer = document.getElementById("prologueContainer")
    const passPrologueBtn = document.getElementById("passPrologueBtn")

    let playerName = ""
    let selectedStartingItem = ""
    let selectedClass = ""
    
    const prologueTextEn = "In a world teeming with magic, mystical creatures, and ancient relics, the land of Eldoria stands at the nexus of fate and destiny. For centuries, this realm has been a beacon of both hope and despair, where heroes and villains alike have shaped the course of history. Eldoria, a land divided by its elemental kingdoms, is a place of both wonder and peril. The Kingdom of Arandor, nestled among the forests and rivers, is home to the Elves, skilled in archery and nature magic. The Dwarves of Molnaria, deep beneath the earth, forge mighty weapons and craft intricate artifacts, while the Desert Kingdom of Pyra'kaz shelters the enigmatic Fire Drakes and fire-wielding sorcerers. Yet, not all in Eldoria is harmonious. The power-hungry Crimson Brotherhood, a shadowy organization, seeks to control the ancient Relics of Eldoria, said to grant unimaginable power. The people of Eldoria live in fear of their sinister ambitions, but a prophecy speaks of a hero who will rise to vanquish this malevolent force. As darkness looms, a mysterious figure known as the Wanderer emerges from the shadows, bearing a scarred past and an enigmatic destiny. The Wanderer is fated to be the one to unlock the secrets of the Relics, reawaken the Guardians of the Elements, and unite the fractured kingdoms to face the imminent threat. Gather your courage and face legendary monsters, the fate of this world will rest in your hands. Are you prepared to forge your own legend along the way? The destiny of Eldoria awaits, and your adventure is about to begin.";

    // const prologueTextFr = "Dans un monde regorgeant de magie, de créatures mystiques et d'artefacts anciens, la terre d'Eldoria se tient au carrefour du destin et de la destinée. Depuis des siècles, ce royaume a été à la fois un phare d'espoir et de désespoir, où les héros et les méchants ont façonné le cours de l'histoire. Eldoria, une terre divisée par ses royaumes élémentaires, est à la fois un lieu de merveilles et de périls. Le Royaume d'Arandor, niché parmi les forêts et les rivières, est le foyer des Elfes, experts en tir à l'arc et en magie de la nature. Les Nains de Molnaria, profondément sous terre, forgent de puissantes armes et créent des artefacts complexes, tandis que le Royaume Désertique de Pyra'kaz abrite les énigmatiques Drakoniens de Feu et les sorciers maniant le feu. Cependant, tout n'est pas harmonieux à Eldoria. La Confrérie Écarlate avide de pouvoir, une organisation ténébreuse, cherche à contrôler les anciens Reliques d'Eldoria, réputées pour accorder un pouvoir inimaginable. Les habitants d'Eldoria vivent dans la crainte de leurs ambitions sinistres, mais une prophétie parle d'un héros qui se lèvera pour vaincre cette force malveillante. Alors que l'obscurité se profile, une figure mystérieuse connue sous le nom du Vagabond émerge des ombres, portant un passé marqué et une destinée énigmatique. Le Vagabond est voué à être celui qui dévoilera les secrets des Reliques, réveillera les Gardiens des Éléments et unira les royaumes divisés pour faire face à la menace imminente. Rassemblez votre courage et affrontez des monstres légendaires, le destin de ce monde reposera entre vos mains. Êtes-vous prêt à forger votre propre légende en cours de route ? La destinée d'Eldoria vous attend, et votre aventure est sur le point de commencer."

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
                nameInput.style.display = "flex"
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
                heroNameContainer.style.display = "flex";
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
                    nameAndClassChooseContainer.remove()
                    prologueContainer.style.display = "block"
                    passPrologueBtn.style.display = "block"
                } else {
                    startPrologueConditions.style.display = "block"
                }
                this.showPrologueTextCharacterByCharacter(prologueTextEn)
            })
            
            passPrologueBtn.addEventListener("click", () => {
                prologueContainer.remove()
                passPrologueBtn.remove()

                screen.classList.remove("gameOff")
                gameContainer.classList.remove("gameOff")
                main.style.height = "100dvh"
            })
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
            playBtnContainer.remove()
            nameAndClassChooseContainer.classList.remove("gameOff")
        }
        
        showPrologueTextCharacterByCharacter(element) {
            for (let i = 0; i < element.length; i++) {
                setTimeout(() => {
                    prologueContainer.innerHTML += element[i]
                }, i * 40)
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
                setTimeout(updateText, 400)
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


