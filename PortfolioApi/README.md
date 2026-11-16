Dit project bevat een ASP.NET Core Web API voor mijn persoonlijke portfolio. De API beheert projecten en blogposts.

De backend maakt gebruik van:

ASP.NET Core Web API (.NET 10)

Entity Framework Core

SQL Server Express

ASP.NET Core Identity

xUnit voor geautomatiseerde tests

De API bevat twee hoofdonderdelen:

Projecten beheren

Blogposts beheren

Daarnaast is gebruikersregistratie, login en autorisatie ingericht met Identity.

2. Benodigdheden

Om het project lokaal uit te voeren, zijn de volgende onderdelen nodig:

Visual Studio

.NET 10 SDK

SQL Server Express

SQL Server Management Studio (SSMS)

3. Database configureren

De API gebruikt SQL Server Express.

Stel de databaseverbinding in via de lokale configuratie van de API. Hiervoor wordt gebruik gemaakt van de connection string DefaultConnection. 

## 5. API starten

Om de API te starten, open ik de terminal in de map van mijn project. Vervolgens voer ik het volgende commando uit:

```powershell
dotnet run --project PortfolioApi
```

Wanneer de API succesvol start, kan ik via de Swagger-link in de terminal de verschillende API-endpoints bekijken en testen.

## 6. Gebruikers en rollen

Voor mijn API gebruik ik drie verschillende rollen: Gast, Editor en Admin.

Een nieuwe gebruiker kan zichzelf registreren via `POST /api/Auth/register`. Na de registratie krijgt deze gebruiker automatisch de rol Gast.

De rollen Editor en Admin worden lokaal aangemaakt met behulp van de RoleSeeder. Hiervoor gebruik ik User Secrets, zodat de e-mailadressen en wachtwoorden niet openbaar in mijn GitHub-repository staan.

Wanneer de API wordt gestart, controleert de RoleSeeder of de rollen en testgebruikers al bestaan. Als dit niet zo is, worden ze aangemaakt.

## 7. Autorisatie

Niet iedere gebruiker mag dezelfde acties uitvoeren binnen mijn API.

Iedereen mag projecten en blogposts bekijken. Alleen gebruikers met de rol Editor of Admin mogen projecten en blogposts toevoegen, aanpassen en verwijderen.

| Actie | Gast | Editor | Admin |
| Bekijken (GET) | Ja | Ja | Ja |
| Toevoegen (POST) | Nee | Ja | Ja |
| Aanpassen (PUT) | Nee | Ja | Ja |
| Verwijderen (DELETE) | Nee | Ja | Ja |

Wanneer iemand niet is ingelogd en toch een beveiligde actie uitvoert, krijgt diegene een 401-statuscode. Een ingelogde gebruiker met alleen de rol Gast krijgt een 403-statuscode.

## 8. Tests uitvoeren

Voor het testen van mijn API heb ik een apart xUnit-testproject aangemaakt. Dit project heet `PortfolioApi.Tests` en staat in dezelfde solution als mijn API.

Met de tests controleer ik of de verschillende API-endpoints goed werken. Ook controleer ik of gebruikers zich kunnen registreren en inloggen en of de juiste rollen toegang hebben tot de verschillende acties.

Om alle tests uit te voeren, gebruik ik het volgende commando in de terminal:

```powershell
dotnet test
```

Na het uitvoeren van dit commando kan ik zien hoeveel tests geslaagd zijn en of er eventuele fouten zijn.

## 9. Projectstructuur

Mijn solution bestaat uit twee projecten:

**PortfolioApi**

Dit is de backend van mijn portfolio. Hierin staan onder andere de controllers, modellen, DTO's, services en de databaseconfiguratie.

**PortfolioApi.Tests**

Dit is het aparte testproject. Hierin staan de geautomatiseerde tests waarmee ik controleer of de API goed werkt.
