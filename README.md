# 🛍️ Full-Stack Product Manager

Full-stack aplikacja do zarządzania produktami zbudowana z **.NET 9**, **React**, i **PostgreSQL**.

## 🚀 Technologie

### Backend
- **.NET 9 Web API** - RESTful API
- **Entity Framework Core** - ORM
- **PostgreSQL** - Baza danych
- **Npgsql** - PostgreSQL provider

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Modern CSS** - Premium styling z animacjami

### DevOps
- **Docker Compose** - PostgreSQL containerization

## 📁 Struktura Projektu

```
dotnet-react-postgres/
├── backend/                    # .NET Web API
│   ├── Controllers/           # API controllers
│   ├── Models/               # Entity models
│   ├── Data/                 # DbContext
│   ├── Program.cs            # App configuration
│   └── appsettings.json      # Configuration
├── frontend/                  # React App
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.jsx          # Main component
│   │   └── main.jsx         # Entry point
│   └── package.json
└── docker-compose.yml        # PostgreSQL setup
```

## 🔧 Instalacja i Uruchomienie

### Wymagania
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 1️⃣ Uruchom PostgreSQL

```bash
docker-compose up -d
```

### 2️⃣ Skonfiguruj Backend

```bash
cd backend

# Zainstaluj narzędzie EF Core (jeśli nie masz)
dotnet tool install --global dotnet-ef

# Utwórz migrację
dotnet ef migrations add InitialCreate

# Zastosuj migrację do bazy danych
dotnet ef database update

# Uruchom API
dotnet run
```

Backend będzie dostępny na: **http://localhost:5000**

### 3️⃣ Uruchom Frontend

```bash
cd frontend

# Zainstaluj zależności (jeśli nie zainstalowane)
npm install

# Uruchom dev server
npm run dev
```

Frontend będzie dostępny na: **http://localhost:5173**

## 🎯 Funkcjonalności

- ✅ **CRUD Operations** - Tworzenie, odczyt, aktualizacja, usuwanie produktów
- ✅ **RESTful API** - Pełne API z .NET
- ✅ **PostgreSQL Database** - Trwałe przechowywanie danych
- ✅ **Responsive Design** - Działa na wszystkich urządzeniach
- ✅ **Premium UI** - Nowoczesny design z animacjami
- ✅ **Error Handling** - Obsługa błędów po stronie klienta i serwera

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Pobierz wszystkie produkty |
| GET | `/api/products/{id}` | Pobierz produkt po ID |
| POST | `/api/products` | Utwórz nowy produkt |
| PUT | `/api/products/{id}` | Zaktualizuj produkt |
| DELETE | `/api/products/{id}` | Usuń produkt |

## 🗄️ Model Danych

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

## 🔐 Konfiguracja Bazy Danych

Domyślne ustawienia PostgreSQL (w `docker-compose.yml`):
- **Host**: localhost
- **Port**: 5432
- **Database**: productdb
- **Username**: postgres
- **Password**: postgres123

Możesz zmienić te ustawienia w `appsettings.json` (backend) i `docker-compose.yml`.

## 🛠️ Przydatne Komendy

### Backend
```bash
# Build projektu
dotnet build

# Uruchom testy (jeśli są)
dotnet test

# Utwórz nową migrację
dotnet ef migrations add MigrationName

# Cofnij migrację
dotnet ef database update PreviousMigrationName
```

### Frontend
```bash
# Build produkcyjny
npm run build

# Preview buildu
npm run preview
```

### Docker
```bash
# Zatrzymaj PostgreSQL
docker-compose down

# Zatrzymaj i usuń volumes
docker-compose down -v

# Zobacz logi
docker-compose logs -f
```

## 🎨 Screenshoty

Aplikacja posiada:
- 🎨 Gradient background
- ✨ Glassmorphism effects
- 🎭 Smooth animations
- 📱 Responsive grid layout
- 🎯 Interactive hover effects

## 📝 Notatki

- Backend używa CORS aby umożliwić połączenia z frontendu
- Dane seed są automatycznie dodawane przy pierwszej migracji
- Frontend używa Axios do komunikacji z API
- Wszystkie style są napisane w czystym CSS (bez frameworków)

## 🚀 Deployment

### Backend
Możesz wdrożyć backend na:
- Azure App Service
- AWS Elastic Beanstalk
- Heroku
- Docker container

### Frontend
Możesz wdrożyć frontend na:
- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

## 📄 Licencja

Ten projekt jest open source i dostępny dla wszystkich.

---

**Enjoy coding! 🎉**
