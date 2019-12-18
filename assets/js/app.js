// BACKGROUND

const
// Noms des images
arrayImages =
[
"temple-front.jpg",
"temple-mountain-sea.jpg",
"temple-mountain-waterfall.jpg",
"waterfall-sunset-landscape.jpg"
],
// Chemin où sont les images
path = "./assets/img/",
// Temps entre chaque images
secs = 4;

/** Mets les images en mémoire pour ne pas avoir de flash blanc */
arrayImages.forEach(function (img) {
new Image().src = path + img;
});

/** Lance le fading du background et change les images
* /!\ Boucle infiniment, ne resort pas de cette fonctions
*/
(function backgroundSequence() {

let k = 0;
window.clearTimeout();

for (let i = 0; i < arrayImages.length; i++) {

setTimeout(function () {
document.documentElement.style.background = "url(" + path + arrayImages[k] + ") no-repeat center center fixed";
document.documentElement.style.backgroundSize = "cover";

// Mettre le reste des fonctions a appeller ici
console.log("hello image : " + arrayImages[k]);


if ((k + 1) === arrayImages.length) {
setTimeout(function () {
backgroundSequence()
}, (secs * 1000))

} else {
k++;
}
}, (secs * 1000) * i)
}
})();

// LE RESTE FOR THE MOMENT ^_^

//DEVISE
const resolver = {
resolve: function resolve(options, callback) {
// The string to resolve
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, {resolveString: resolveString});

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        };

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
        };

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
        };

        doResolverEffect(combinedOptions, callback);
    }
}

const strings = [
'Ne fais pas aux autres ce que tu n\'aimerai pas que l\'on te fasse',
];

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
}

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

resolver.resolve(options, callback);


// document.getElementById("skill1").classList.add("pourcentage-5sur5");
// document.getElementById("skill2").classList.add("pourcentage-1sur5");
// document.getElementById("skill3").classList.add("pourcentage-2sur5");
// document.getElementById("skill4").classList.add("pourcentage-3sur5");
// document.getElementById("skill5").classList.add("pourcentage-4sur5");