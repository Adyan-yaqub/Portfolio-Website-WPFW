
/*
  1. PROJECTGEGEVENS

  In deze array staan mijn echte projecten.
  Elk project heeft een titel, beschrijving en categorie.
  JavaScript gebruikt deze gegevens om de projectkaarten te maken.
*/
const projecten = [
    {
        titel: "ZOARZ - Slimme koelkast",
        beschrijving: "Tijdens The Challenge heb ik met mijn projectgroep een werkend prototype van een slimme koelkast gemaakt. We werkten met software en embedded hardware, waaronder een micro:bit en de Arduino IDE. Ook kwamen Java, databases en security aan bod.",
        categorie: "school"
    },
    {
        titel: "Rekenmachine",
        beschrijving: "Ik heb in het eerste semester van mijn opleiding een eenvoudig rekenmachine in Java geprogrammeerd. Ik kreeg in het eerste semester de programmeertaal Java en heb met behulp van Java rekenmachine gemaakt in IntelliJ.",
        categorie: "vrijetijd"
    },
    {
        titel: "Persoonlijke portfolio website",
        beschrijving: "Ik bouw mijn eigen portfolio website met HTML, CSS en JavaScript. De website bevat mijn introductie, projecten, blog en contactpagina.",
        categorie: "school"
    }
];


/*
  2. HTML-ELEMENTEN OPHALEN

  Met getElementById zoek ik de onderdelen uit de HTML op.
  De projectcontainer is de plek waar de kaarten verschijnen.
  Het status-element toont hoeveel projecten er zichtbaar zijn.
*/
const container = document.getElementById("project-container");
const status = document.getElementById("status");


/*
  3. HUIDIGE PROJECTENLIJST

  Deze variabele bewaart welke projecten op dit moment worden getoond.
  In het begin bevat de lijst alle projecten.
*/
let huidigeLijst = [...projecten];


/*
  4. PROJECTEN WEERGEVEN

  Deze functie maakt voor elk project een kaart.
  Eerst verwijder ik de oude kaarten.
  Daarna maak ik nieuwe HTML-elementen met JavaScript.
*/
function toonProjecten(lijst) {
    // Verwijdert de kaarten die al op de pagina staan.
    container.replaceChildren();

    // Bewaart de lijst die op dit moment wordt weergegeven.
    huidigeLijst = [...lijst];

    // Controleert of er projecten zijn om te tonen.
    if (lijst.length === 0) {
        status.textContent = "Er zijn geen projecten gevonden.";
        return;
    }

    // Maakt voor elk project een nieuwe kaart.
    lijst.forEach(function (project) {
        // Maakt een artikel aan voor de projectkaart.
        const kaart = document.createElement("article");
        kaart.className = "project-box";

        // Maakt een kop met de titel van het project.
        const titel = document.createElement("h2");
        titel.textContent = project.titel;

        // Maakt een alinea met de beschrijving.
        const beschrijving = document.createElement("p");
        beschrijving.textContent = project.beschrijving;

        // Voegt de titel en beschrijving toe aan de kaart.
        kaart.appendChild(titel);
        kaart.appendChild(beschrijving);

        // Voegt de kaart toe aan de projectcontainer.
        container.appendChild(kaart);
    });

    // Geeft aan hoeveel projecten zichtbaar zijn.
    status.textContent = "Aantal getoonde projecten: " + lijst.length;
}


/*
  5. PROJECTEN FILTEREN

  Deze functie zoekt projecten met de opgegeven categorie.
  Bijvoorbeeld: alleen projecten met categorie 'school'.
*/
function filterProjecten(categorie) {
    const gefilterdeProjecten = projecten.filter(function (project) {
        return project.categorie === categorie;
    });

    // Toont alleen de projecten die bij de categorie passen.
    toonProjecten(gefilterdeProjecten);
}


/*
  6. ALLE PROJECTEN TONEN

  Deze functie toont opnieuw de volledige projectenlijst.
*/
function toonAlleProjecten() {
    toonProjecten(projecten);
}


/*
  7. PROJECTEN SORTEREN

  Deze functie sorteert de huidige lijst alfabetisch op titel.
  Door een kopie te maken, blijft de oorspronkelijke array intact.
*/
function sorteerProjecten() {
    const gesorteerdeProjecten = [...huidigeLijst].sort(function (a, b) {
        return a.titel.localeCompare(b.titel, "nl");
    });

    toonProjecten(gesorteerdeProjecten);
}


/*
  8. KNOPPEN KOPPELEN AAN FUNCTIES

  addEventListener zorgt ervoor dat de juiste functie
  wordt uitgevoerd wanneer de bezoeker op een knop klikt.
*/
document.getElementById("knop-alle").addEventListener("click", function () {
    toonAlleProjecten();
});

document.getElementById("knop-school").addEventListener("click", function () {
    filterProjecten("school");
});

document.getElementById("knop-vrijetijd").addEventListener("click", function () {
    filterProjecten("vrijetijd");
});

document.getElementById("knop-sorteertitel").addEventListener("click", function () {
    sorteerProjecten();
});


/*
  9. EERSTE WEERGAVE

  Wanneer de pagina wordt geopend, verschijnen alle projecten direct.
*/
toonAlleProjecten();
