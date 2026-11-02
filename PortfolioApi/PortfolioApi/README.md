# Portfolio API – Opdracht 3

## 1. Beschrijving

Deze applicatie is de backend van mijn portfolio. De API beheert twee soorten gegevens: projecten en blogposts.

De API is gebouwd met ASP.NET Core en maakt gebruik van Entity Framework Core om gegevens op te slaan en op te halen uit een SQL Server-database.

Voor beide onderdelen zijn CRUD-endpoints beschikbaar. Hiermee kunnen gegevens worden aangemaakt, opgevraagd, aangepast en verwijderd.

## 2. Gebruikte technologieën

- **Programmeertaal:** C#
- **Framework:** ASP.NET Core Web API
- **.NET-versie:** .NET 10.0
- **API-stijl:** Controller-based API
- **API-documentatie en testen:** Swagger UI
- **ORM:** Entity Framework Core
- **Database:** Microsoft SQL 
- Server LocalDB
- **Databasemigraties:** Entity Framework Core Migrations

## 3. Projectstructuur

De backend gebruikt een indeling op basis van lagen.

- **Controllers:** ontvangen HTTP-verzoeken en bepalen de HTTP-response.
- **Services:** bevatten de bewerkingen voor projecten en blogposts en verzorgen de omzetting tussen entiteiten en DTO's.
- **Database:** bevat de PortfolioDbContext voor de communicatie met SQL Server.
- **Models:** bevatten de database-entiteiten Project en Blogpost.
- **DTOs:** bevatten de invoer- en uitvoermodellen voor de API.
- **Migrations:** bevatten de wijzigingen waarmee de databasestructuur wordt aangemaakt en bijgewerkt.

## 4. SQL Server configureren

De databaseverbinding staat in `appsettings.json`.

De gebruikte connection string voor SQL Server LocalDB is:

`Server=(localdb)\MSSQLLocalDB;Database=PortfolioDatabase;Trusted_Connection=True;TrustServerCertificate=True;`

De applicatie gebruikt deze connection string via de configuratie in `Program.cs`.

LocalDB is bedoeld voor lokaal gebruik op Windows. Wanneer een andere SQL Server-installatie wordt gebruikt, moet de connection string worden aangepast.

## 5. Database aanmaken

De database wordt aangemaakt met Entity Framework Core Migrations.

Open een terminal in de projectmap waarin `PortfolioApi.csproj` staat.

Controleer eerst of de Entity Framework Core CLI beschikbaar is:

`dotnet ef --version`

Als deze tool nog niet is geïnstalleerd, voer dan uit:

`dotnet tool install --global dotnet-ef`

Maak of werk daarna de database bij met:

`dotnet ef database update`

Entity Framework Core gebruikt de aanwezige migraties om de tabellen voor projecten en blogposts aan te maken of bij te werken.

## 6. Applicatie starten

Open een terminal in de map waarin `PortfolioApi.csproj` staat.

Voer de volgende opdrachten uit:

`dotnet restore`

`dotnet run`

Na het starten laat de terminal zien op welke lokale adressen de applicatie beschikbaar is.

Open vervolgens Swagger UI via:

`https://localhost:<poortnummer>/swagger`

Gebruik het HTTPS-adres en het poortnummer dat in de terminal wordt weergegeven.

## 7. API-endpoints

### Projecten

| HTTP-methode | Endpoint | Beschrijving |
|---|---|---|
| GET | `/api/Project` | Alle projecten ophalen |
| GET | `/api/Project/{id}` | Eén project ophalen |
| POST | `/api/Project` | Een project toevoegen |
| PUT | `/api/Project/{id}` | Een project aanpassen |
| DELETE | `/api/Project/{id}` | Een project verwijderen |

### Blogposts

| HTTP-methode | Endpoint | Beschrijving |
|---|---|---|
| GET | `/api/Blogpost` | Alle blogposts ophalen |
| GET | `/api/Blogpost/{id}` | Eén blogpost ophalen |
| POST | `/api/Blogpost` | Een blogpost toevoegen |
| PUT | `/api/Blogpost/{id}` | Een blogpost aanpassen |
| DELETE | `/api/Blogpost/{id}` | Een blogpost verwijderen |

## 8. API testen

De endpoints kunnen worden getest met Swagger UI.

Swagger UI maakt het mogelijk om HTTP-verzoeken uit te voeren en de responses van de API te bekijken.

Voor beide onderdelen worden de volgende bewerkingen getest:

1. Een nieuw item toevoegen met POST.
2. Alle items ophalen met GET.
3. Het aangemaakte item ophalen via het ID.
4. Het item aanpassen met PUT.
5. Controleren of de wijziging is opgeslagen.
6. De applicatie opnieuw starten en controleren of het item nog bestaat.
7. Het item verwijderen met DELETE.
8. Controleren of het verwijderde item niet meer bestaat en een 404-response teruggeeft.