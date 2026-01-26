# LuxDrive - Wypozyczalnia Samochodow

Aplikacja webowa do wypozyczania samochodow z frontendem HTML/CSS/JS, backendem .NET oraz baza danych PostgreSQL.

## Technologie

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome, Google Fonts (Inter)

**Backend:**
- .NET 8 (Minimal API)
- Npgsql

**Baza danych:**
- PostgreSQL

## Struktura projektu

```
carrent/
├── index.html
├── index.css
├── app.js
├── server/
│   ├── Program.cs
│   ├── CarRentApi.csproj
│   └── appsettings.json
└── database/
    ├── init_database.sql
    ├── function_check_availability.sql
    └── function_suggest_similar_car.sql
```

## Uruchomienie

### 1. Baza danych

```bash
psql -U postgres -c "CREATE DATABASE carrent;"
psql -U postgres -d carrent -f database/init_database.sql
psql -U postgres -d carrent -f database/function_check_availability.sql
psql -U postgres -d carrent -f database/function_suggest_similar_car.sql
```

### 2. Backend

```bash
cd server
dotnet run
```

Serwer startuje na `http://localhost:3001`

### 3. Frontend

Otworz `index.html` w przegladarce lub uruchom lokalny serwer:

```bash
npx serve
```

## API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | /api/cars | Lista samochodow |
| POST | /api/check-availability | Sprawdzenie dostepnosci |
| POST | /api/suggest-similar | Sugestia podobnego auta |
| POST | /api/reservations | Utworzenie rezerwacji |

### Przykladowe zapytania

```bash
curl http://localhost:3001/api/cars

curl -X POST http://localhost:3001/api/check-availability \
  -H "Content-Type: application/json" \
  -d '{"carId": 1, "pickupDate": "2025-01-15", "returnDate": "2025-01-20"}'

curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "carId": 1,
    "customerName": "Jan Kowalski",
    "customerEmail": "jan@example.com",
    "pickupDate": "2025-01-15",
    "returnDate": "2025-01-20",
    "totalPrice": 4495
  }'
```

## Baza danych

### Tabele

**cars** - dane samochodow (nazwa, kategoria, typ, cena, zdjecie)

**reservations** - rezerwacje (samochod, klient, daty, cena)

### Funkcje

**check_car_availability** - sprawdza czy samochod jest dostepny w podanym terminie

**suggest_similar_car** - znajduje podobny dostepny samochod gdy wybrany jest zajety

## Konfiguracja

Connection string do bazy danych w pliku `server/Program.cs`:

```csharp
var connectionString = "Host=localhost;Port=5432;Database=carrent;Username=postgres;Password=postgres";
```

## Samochody w ofercie

| Samochod | Kategoria | Cena/dzien |
|----------|-----------|------------|
| Mercedes S-Class | Luksusowe | 899 zl |
| BMW X7 | SUV | 799 zl |
| Porsche 911 | Sportowe | 1299 zl |
| Tesla Model S | Elektryczne | 699 zl |
| Audi A6 | Luksusowe | 649 zl |
| Range Rover Sport | SUV | 949 zl |
| Ferrari F8 | Sportowe | 2499 zl |
| Tesla Model 3 | Elektryczne | 449 zl |
| Toyota Corolla | Ekonomiczne | 199 zl |
| Volkswagen Golf | Ekonomiczne | 249 zl |
| Lamborghini Huracan | Sportowe | 2999 zl |
| Audi e-tron | Elektryczne | 599 zl |
