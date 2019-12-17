// BACKGROUND



document.getElementById("skill1").classList.add("pourcentage-5sur5");
document.getElementById("skill2").classList.add("pourcentage-1sur5");
document.getElementById("skill3").classList.add("pourcentage-2sur5");
document.getElementById("skill4").classList.add("pourcentage-3sur5");
document.getElementById("skill5").classList.add("pourcentage-4sur5");
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

