/*
  1. API-VERBINDING

  De projecten worden opgehaald uit de PortfolioApi.
*/
const API_URL = "https://localhost:7293/api/Project";

const container = document.getElementById("project-container");
const status = document.getElementById("status");

let projecten = [];
let huidigeLijst = [];


/*
  2. PROJECTEN OPHALEN

  Deze functie haalt de projecten uit SQL Server
  via de ASP.NET Core API.
*/
async function laadProjecten() {
    status.textContent = "Projecten worden geladen...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Projecten konden niet worden opgehaald.");
        }

        projecten = await response.json();

        toonProjecten(projecten);

    } catch (error) {
        status.textContent = "Er is iets misgegaan bij het laden van projecten.";
        console.error(error);
    }
}


/*
  3. PROJECTEN WEERGEVEN
*/
function toonProjecten(lijst) {
    container.replaceChildren();

    huidigeLijst = [...lijst];

    if (lijst.length === 0) {
        status.textContent = "Er zijn geen projecten gevonden.";
        return;
    }

    lijst.forEach(function (project) {
        const kaart = document.createElement("article");
        kaart.className = "project-box";

        const titel = document.createElement("h2");
        titel.textContent = project.titel;

        const beschrijving = document.createElement("p");
        beschrijving.textContent = project.beschrijving;

        kaart.appendChild(titel);
        kaart.appendChild(beschrijving);

        container.appendChild(kaart);
    });

    status.textContent = "Aantal getoonde projecten: " + lijst.length;
}


/*
  4. PROJECTEN FILTEREN
*/
function filterProjecten(categorie) {
    const gefilterdeProjecten = projecten.filter(function (project) {
        return project.categorie === categorie;
    });

    toonProjecten(gefilterdeProjecten);
}


/*
  5. ALLE PROJECTEN TONEN
*/
function toonAlleProjecten() {
    toonProjecten(projecten);
}


/*
  6. PROJECTEN SORTEREN
*/
function sorteerProjecten() {
    const gesorteerdeProjecten = [...huidigeLijst].sort(function (a, b) {
        return a.titel.localeCompare(b.titel, "nl");
    });

    toonProjecten(gesorteerdeProjecten);
}


/*
  7. KNOPPEN KOPPELEN
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
  8. PROJECTEN LADEN BIJ HET OPENEN VAN DE PAGINA
*/
laadProjecten();