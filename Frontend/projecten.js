
/*
  1. PROJECTGEGEVENS

  Deze array bevat de projecten die ik op mijn website wil tonen.
  Elk project is een object met een titel, beschrijving en categorie.
*/
const projecten = [
    {
        titel: "ZOARZ - Slimme koelkast",
        beschrijving: "Tijdens The Challenge heb ik met mijn projectgroep een werkend prototype van een slimme koelkast gemaakt. We werkten met software en embedded hardware, waaronder een micro:bit en de Arduino IDE. Ook kwamen Java, databases en security aan bod.",
        categorie: "school"
    },
    {
        titel: "Persoonlijke portfolio website",
        beschrijving: "Ik bouw mijn eigen portfolio website met HTML, CSS en JavaScript voor de Frontend en later ook de backend. De website bevat onder andere mijn introductie, projecten, blog en contactpagina.",
        categorie: "school"
    }
];


/*
  2. HTML-ELEMENTEN OPHALEN

  Met getElementById zoek ik de elementen uit mijn HTML op.
  De container is de plek waar de projecten komen te staan.
  Het status-element gebruik ik voor een melding aan de bezoeker.
*/
const container = document.getElementById("project-container");
const status = document.getElementById("status");


/*
  3. HUIDIGE PROJECTENLIJST

  Deze variabele bewaart welke projecten op dit moment getoond
  moeten worden. In het begin zijn dat alle projecten.
*/
let huidigeLijst = [...projecten];


/*
  4. PROJECTEN WEERGEVEN

  Deze functie maakt voor elk project HTML-elementen aan.
  Daarna plaatst de functie die elementen in de projectcontainer.
*/
function toonProjecten(lijst) {

    // Verwijdert de eerder getoonde projectkaarten.
    container.replaceChildren();

    // Onthoudt welke lijst momenteel wordt weergegeven.
    huidigeLijst = lijst;

    // Controleert of de lijst leeg is.
    if (lijst.length === 0) {
        status.textContent = "Er zijn geen projecten in deze categorie.";
        return;
    }

    // Loopt één voor één door alle projecten in de lijst.
    lijst.forEach(function(projecten) {

        // Maakt een artikel aan voor één projectkaart.
        const kaart = document.createElement("article");
        kaart.className = "project-box";

        // Maakt een kop aan met de titel van het project.
        const titel = document.createElement("h2");
        titel.textContent = projecten.titel;

        // Maakt een alinea aan met de beschrijving.
        const beschrijving = document.createElement("p");
        beschrijving.textContent = projecten.beschrijving;

        // Plaatst de titel en beschrijving in de projectkaart.
        kaart.appendChild(titel);
        kaart.appendChild(beschrijving);

        // Plaatst de volledige projectkaart op de pagina.
        container.appendChild(kaart);
    });

    // Laat zien hoeveel projecten er worden weergegeven.
    status.textContent = "Aantal projecten: " + lijst.length;
}


/*
  5. FILTEREN OP SCHOOLPROJECTEN

  Wanneer de bezoeker op de schoolknop klikt, selecteert
  filter() alleen projecten waarvan de categorie 'school' is.
*/
document.getElementById("knop-school").addEventListener("click", function() {

    const schoolProjecten = projecten.filter(function(projecten) {
        return projecten.categorie === "school";
    });

    toonProjecten(schoolProjecten);
});


/*
  6. FILTEREN OP VRIJETIJDPROJECTEN

  Wanneer de bezoeker op de vrijetijdknop klikt, blijven alleen
  projecten met de categorie 'vrijetijd' over.
*/
document.getElementById("knop-vrijetijd").addEventListener("click", function() {

    const vrijetijdProjecten = projecten.filter(function(project) {
        return projecten.categorie === "vrijetijd";
    });

    toonProjecten(vrijetijdProjecten);
});


/*
  7. ALLE PROJECTEN WEERGEVEN

  De knop zet de volledige projectenlijst opnieuw op de pagina.
*/
document.getElementById("knop-alle").addEventListener("click", function() {

    toonProjecten([...projecten]);
});


/*
  8. PROJECTEN SORTEREN OP TITEL

  Sorteert de huidige lijst alfabetisch op titel.
  [...huidigeLijst] maakt eerst een kopie, zodat de oorspronkelijke
  array met alle projecten niet rechtstreeks wordt aangepast.
*/
document.getElementById("knop-sorteer").addEventListener("click", function() {

    const gesorteerdeProjecten = [...huidigeLijst].sort(function(a, b) {
        return a.titel.localeCompare(b.titel, "nl");
    });

    toonProjecten(gesorteerdeProjecten);
});


/*
  9. STARTWEERGAVE

  Wanneer de pagina wordt geopend, toont de website direct
  alle projecten, zonder dat de bezoeker eerst een knop hoeft
  in te drukken.
*/
toonProjecten(projecten);
