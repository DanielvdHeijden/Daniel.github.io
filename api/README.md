# PortfolioApi

Backend voor mijn portfoliosite: CRUD voor **projecten** en **blogposts**.

## Gegevens

- **.NET-versie:** .NET 10
- **API-stijl:** controllers
- **Codestructuur:** lagen
  - `Controllers/` – HTTP-afhandeling (routes en statuscodes)
  - `Services/` – applicatielogica en omzetting entiteit ↔ DTO
  - `Data/` – `PortfolioDbContext` (EF Core) en `Migrations/`
  - `Models/` – entiteiten (`Project`, `Blogpost`)
  - `Dtos/` – invoer- en uitvoer-DTO's
- **Database:** SQL Server LocalDB, aangemaakt met een EF Core-**migratie**

## SQL Server configureren

De connectionstring staat in `PortfolioApi/appsettings.json` onder `ConnectionStrings:PortfolioDb`:

```
Server=(localdb)\MSSQLLocalDB;Database=PortfolioDb;Trusted_Connection=True;TrustServerCertificate=True
```

LocalDB wordt meegeïnstalleerd met Visual Studio. Gebruik je een andere SQL Server, pas dan deze regel aan.

## Database aanmaken

Vanuit de map `api/`:

```
dotnet tool restore
dotnet tool run dotnet-ef database update --project PortfolioApi
```

Dit voert de migratie `InitialCreate` uit en maakt de tabellen `Projects` en `Blogposts` aan.

## Starten

```
cd PortfolioApi
dotnet run
```

Swagger UI opent op http://localhost:5176/swagger.

## Endpoints

| Methode | Route | Resultaat |
|---|---|---|
| GET | `/api/projects` | 200 met alle projecten |
| GET | `/api/projects/{id}` | 200, of 404 als het niet bestaat |
| POST | `/api/projects` | 201 met het nieuwe project |
| PUT | `/api/projects/{id}` | 204, of 404 |
| DELETE | `/api/projects/{id}` | 204, of 404 |

Voor blogposts zijn dezelfde vijf routes er onder `/api/blogposts`.
