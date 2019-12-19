// Variables global

// tableau en json déclarer dans json.js
let
    nbrGens = 0,
    cheminPhoto = "./assets/img/lesGens/",
    listPhotos = [
        "anthony.png",
        "beatrice.png",
        "etienne.png",
        "ilias.png",
        "irina.png",
        "isabelle.png",
        "jerome.png",
        "joan.png",
        "johanna.png",
        "julie.png",
        "ludovic.png",
        "maera.png",
        "messaouda.png",
        "nebojsa.png",
        "thomas.png",
        "victor.png"
    ],
    nbrGensTotal = listPhotos.length,
    // Contient les devices de chaque personne
    strings = [],
    dataBase = JSON.parse(JSON.stringify(tableau));


// Main
/** Lance le fading du background et change les images
 * /!\ Boucle infiniment, ne resort pas de cette fonctions */
function main() {
    console.log("Starting");

    startBackgroundSequence();

    // startDeviseAnimation();
    changeAllElements();

    setInterval(() => {

        // startDeviseAnimation();

        // hidePage();
        changeAllElements();

        setTimeout(() => {

            // showPage();

            //TODO set real slow time 1000 and 8000
        }, 1000);
    }, 8000);
}

main();

// BACKGROUND
function startBackgroundSequence() {

    const
        // Chemin où sont les images
        path = "./assets/img/",
        // Noms des images
        arrayImages =
            [
                "temple-front.jpg",
                "temple-mountain-sea.jpg",
                "temple-mountain-waterfall.jpg",
                "waterfall-sunset-landscape.jpg"
            ],
        // Temps entre chaque images
        secs = 4;

    /** Mets les images en mémoire pour ne pas avoir de flash blanc */
    arrayImages.forEach(function (img) {
        new Image().src = path + img;
    });

    changeBackgroundImage();

    function changeBackgroundImage() {
        let k = 0;
        window.clearTimeout();

        for (let i = 0; i < arrayImages.length; i++) {
            setTimeout(function () {
                document.body.style.background = "url(" + path + arrayImages[k] + ") no-repeat fixed";
                document.body.style.backgroundSize = "cover";

                if ((k + 1) === arrayImages.length) {
                    setTimeout(function () {
                        changeBackgroundImage()
                    }, (secs * 1000))

                } else {
                    k++;
                }
            }, (secs * 1000) * i)
        }
    }
}


function startDeviseAnimation() {
    const
        characterList = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'x', 'y', 'x', '#', '%', '&',
            '-', '+', '_', '?', '/', '\\', '='
        ],
        deviceText = document.getElementById("devise-text");

    deviceText.innerText = "";
    let i = 0;

    let timing;
    timing = setInterval(() => {

        if (i >= dataBase[nbrGens].devise.length - 1)
            clearInterval(timing);


        console.log(dataBase[nbrGens].devise[i]);
        if (dataBase[nbrGens].devise[i] == "")
            deviceText.innerHTML += "  ";
        else
            deviceText.innerText += dataBase[nbrGens].devise[i];



        i++;
    }, 50);


}


// DEVISE
const resolver = {
    resolve: function resolve(options, callback) {
// The string to resolve
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, {resolveString: resolveString});

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        }

        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const timeout = options.timeout;
            const element = options.element;
            const partialString = options.partialString;

            let iterations = options.iterations;

            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

                    // Ensures partialString without the random character as the final state.
                    if (iterations === 0) {
                        element.textContent = partialString;
                    } else {
                        // Replaces the last character of partialString with a random character
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                    }

                    doRandomiserEffect(nextOptions, callback)
                } else if (typeof callback === "function") {
                    callback();
                }
            }, options.timeout);
        }

        function doResolverEffect(options, callback) {
            const resolveString = options.resolveString;
            const characters = options.characters;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, {partialString: partialString});

            doRandomiserEffect(combinedOptions, () => {
                const nextOptions = Object.assign({}, options, {offset: offset + 1});

                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            });
        }

        doResolverEffect(combinedOptions, callback);
    }
};

// const strings = [
//     'Ne fais pas aux autres ce que tu n\'aimerai pas que l\'on te fasse',
// ];

let counter = 0;

const options = {
// Initial position
    offset: 0,
// Timeout between each random character
    timeout: 10,
// Number of random characters to show
    iterations: 10,
// Random characters to pick from
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
// String to resolve
    resolveString: strings[counter],
// The element
    element: document.querySelector('[data-target-resolver]')
};

// Callback function when resolve completes
function callback() {
    setTimeout(() => {
        counter++;

        if (counter >= strings.length) {
            counter = 0;
        }

        let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
        resolver.resolve(nextOptions, callback);
    }, 1500);
}

// resolver.resolve(options, callback);


// Changement textes
function changeAllElements() {

    const
        deviseText = document.getElementById("devise-text"),

        skill1 = document.getElementById("text-skill1"),
        skill2 = document.getElementById("text-skill2"),
        skill3 = document.getElementById("text-skill3"),
        skill4 = document.getElementById("text-skill4"),
        skill5 = document.getElementById("text-skill5"),

        skill1Bar = document.getElementById("skill1"),
        skill2Bar = document.getElementById("skill2"),
        skill3Bar = document.getElementById("skill3"),
        skill4Bar = document.getElementById("skill4"),
        skill5Bar = document.getElementById("skill5"),

        imgPerso = document.getElementById("photo-perso"),
        nomPerso = document.getElementById("main-name"),
        mainQuaPrincipale = document.getElementById("main-QuaPrincipale"),

        nomDescription = document.getElementById("description-nom"),
        prenomDescription = document.getElementById("description-prenom"),
        surnomDescription = document.getElementById("description-surnom"),
        passionDescription = document.getElementById("description-passion"),
        projetDescription = document.getElementById("description-projet");

    // strings[nbrGens] = dataBase[nbrGens].devise;
    deviseText.innerText = dataBase[nbrGens].devise;

    let
        i = 0,
        skillListsProperties = [],
        skillListsValues = [];

    for (let skill in dataBase[nbrGens].qualites) {
        skillListsProperties[i] = skill;
        skillListsValues[i] = dataBase[nbrGens].qualites[skill];
        i++;
    }

    skill1Bar.setAttribute("value", skillListsValues[0]);
    skill2Bar.setAttribute("value", skillListsValues[1]);
    skill3Bar.setAttribute("value", skillListsValues[2]);
    skill4Bar.setAttribute("value", skillListsValues[3]);
    skill5Bar.setAttribute("value", skillListsValues[4]);


    skill1.innerText = skillListsProperties[0];
    skill2.innerText = skillListsProperties[1];
    skill3.innerText = skillListsProperties[2];
    skill4.innerText = skillListsProperties[3];
    skill5.innerText = skillListsProperties[4];


    imgPerso.setAttribute("src", cheminPhoto + listPhotos[nbrGens]);
    nomPerso.innerText = dataBase[nbrGens].prenom;
    mainQuaPrincipale.innerText = dataBase[nbrGens].qualitesPrincipale;

    nomDescription.innerText = dataBase[nbrGens].nom;
    prenomDescription.innerText = dataBase[nbrGens].prenom;

    if (dataBase[nbrGens].surnom)
        surnomDescription.innerText = dataBase[nbrGens].surnom;
    else
        surnomDescription.innerText = "Aucun :'(";

    passionDescription.innerText = dataBase[nbrGens].passion;
    projetDescription.innerText = dataBase[nbrGens].projetPro;

    nbrGens++;
    if (nbrGens >= nbrGensTotal)
        nbrGens = 0;
}

// Affiche les éléments

// Cache les divs

// /** Move elements to the direction
//  * @param element {HTMLElement} - The elements to move
//  * @param direction {String} - The direction where elements is moved
//  */
// function moveElements(element, direction) {
//
//
//     let interval = setInterval(() => {
//
//         switch (direction) {
//             case "up":
//
//                 if (element.style.marginTop === "")
//                     element.style.marginTop = "0px";
//
//                 if (parseInt(element.style.marginTop) <= -2000)
//                     return true;
//
//                 element.style.marginTop = (parseInt(element.style.marginTop) - 10) + "px";
//                 break;
//             case "down":
//
//                 if (element.style.marginBottom === "")
//                     element.style.marginBottom = "0px";
//
//                 if (parseInt(element.style.marginBottom) <= -2000)
//                     return true;
//
//                 element.style.marginBottom = (parseInt(element.style.marginBottom) - 20) + "px";
//                 break;
//             case "left":
//
//                 if (element.style.marginTop === "")
//                     element.style.marginTop = "0px";
//
//                 if (parseInt(element.style.marginTop) <= -2000)
//                     return true;
//
//                 element.style.marginTop = (parseInt(element.style.marginTop) - 10) + "px";
//                 break;
//             case "right":
//
//                 if (element.style.marginTop === "")
//                     element.style.marginTop = "0px";
//
//                 if (parseInt(element.style.marginTop) <= -2000)
//                     return true;
//
//                 element.style.marginTop = (parseInt(element.style.marginTop) - 10) + "px";
//                 break;
//             default:
//                 clearInterval();
//                 return false
//         }
//
//     }, 10);
//     return true;
// }
//
// function myMove() {
//     const elem = document.getElementById("animate");
//     let pos = 0;
//     let id = setInterval(frame, 5);
//
//     function frame() {
//         if (pos === 350) {
//             clearInterval(id);
//         } else {
//             pos++;
//             elem.style.top = pos + "px";
//             elem.style.left = pos + "px";
//         }
//     }
// }