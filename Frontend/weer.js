const weerText = document.getElementById("weer-text");

// URL API voor weer Den Haag
const WEER_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.08&longitude=4.31&current_weather=true";

async function laadWeer() {
    if (!weerText) return;

    weerText.textContent = "Weergegevens worden geladen...";

    try {
        const response = await fetch(WEER_URL);

        if (!response.ok) {
            throw new Error("Ophalen van weer mislukt");
        }

        const data = await response.json();
        const weer = data.current_weather;

        weerText.textContent =
            `Het is nu ${weer.temperature}°C in Den Haag met ${weer.windspeed} km/u wind.`;
    } catch (fout) {
        console.error("Fout bij ophalen weer:", fout);
        weerText.textContent =
            "Weergegevens konden niet geladen worden.";
    }
}

laadWeer();
