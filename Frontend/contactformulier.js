const formulier = document.getElementById("contactformulier");
const naam = document.getElementById("naam");
const email = document.getElementById("email");
const bericht = document.getElementById("bericht");
const statusFormulier = document.getElementById("formulier-status");

formulier.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInput();
});

function checkInput() {
    const naamValue = naam.value.trim();
    const emailValue = email.value.trim();
    const berichtValue = bericht.value.trim();

    let geldig = true;

    if (naamValue === "") {
        geefFoutmelding(naam, "Naam is verplicht");
        geldig = false;
    } else {
        geefGoedkeuring(naam);
    }

    if (emailValue === "" || !email.checkValidity()) {
        geefFoutmelding(email, "Voer een geldig e-mailadres in");
        geldig = false;
    } else {
        geefGoedkeuring(email);
    }

    if (berichtValue.length < 10) {
        geefFoutmelding(bericht, "Schrijf minimaal 10 tekens");
        geldig = false;
    } else {
        geefGoedkeuring(bericht);
    }

    if (geldig) {
        statusFormulier.textContent =
            "Je formulier is geldig ingevuld. Er is nog geen bericht verzonden.";
    } else {
        statusFormulier.textContent =
            "Controleer de foutmeldingen bij de velden.";
    }
}


function geefFoutmelding(input, melding) {
    const formulierControle = input.parentElement;
    const errorKlein = formulierControle.querySelector("small");

    errorKlein.textContent = melding;
    input.setAttribute("aria-invalid", "true");
    formulierControle.className = "formulier-controle error";
}

function geefGoedkeuring(input) {
    const formulierControle = input.parentElement;
    const errorKlein = formulierControle.querySelector("small");

    errorKlein.textContent = "";
    input.setAttribute("aria-invalid", "false");
    formulierControle.className = "formulier-controle success";
}

