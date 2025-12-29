function afficherResultat(score, nombreMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nombreMotsProposes}`
    spanScore.innerText = affichageScore
}

function afficherProposition(text) {
    let divZoneProposition = document.querySelector(".zoneProposition");
    if (text === undefined) {
        divZoneProposition.innerText = "Le jeu est fini"
    }
    else {
        divZoneProposition.innerText = text;
    }
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function lancerJeu() {
    initAddEventListenerPopup()
    let score = 0;
    let i = 0;
    let listePropostions = listeMots;
    afficherProposition(listePropostions[i]);

    let listeInputChoix = document.querySelectorAll(".zoneOptions input")
    for (let k = 0; k<listeInputChoix.length; k++) {
        listeInputChoix[k].addEventListener("change", (event) => {
            let choix = event.target.value;

            switch (choix) {
                case "1" : 
                    listePropostions = listeMots
                    break
                case "2" :
                    listePropostions = listePhrases
                    break
                default :
                    listePropostions = listeMots
                    break
            }
            afficherProposition(listePropostions[i])
        })
    }

    let form = document.querySelector('form')
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            let nom = document.getElementById("nom")
            let email = document.getElementById("email")
            afficherEmail(nom.value, email.value, String(score))
        })

    let inputEcriture = document.getElementById("inputEcriture");
    let btnValiderMot = document.getElementById("btnValiderMot");

    function validerMot() {
        if (inputEcriture.value === listePropostions[i]) {
            score++; // si le mot entré est correct on incrémente le score
        }
        inputEcriture.value = ""; // on réinitialise la zone de saisie
        if (i < listePropostions.length) {
            i++; // on incrémente i
            afficherResultat(score, i) // on actualise le score
        }
        else {
            btnValiderMot.disabled = true;
        }
        afficherProposition(listePropostions[i]); // on actualise la proposition
    }

    btnValiderMot.addEventListener("click", () => {
        validerMot();
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            validerMot();
        }
    })
} 