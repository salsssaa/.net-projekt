# 🚗 LuxDrive - Premium Car Rental

Nowoczesna aplikacja do wypożyczania samochodów z pięknym interfejsem użytkownika.

## ✨ Funkcje

- 🎨 Nowoczesny design z dark theme i glassmorphism
- 🚙 12 różnych kategorii samochodów (luksusowe, SUV, sportowe, elektryczne, ekonomiczne)
- 🔍 Zaawansowane filtry i wyszukiwarka
- 📅 System rezerwacji z kalkulacją ceny
- 💫 Płynne animacje i efekty hover
- 📱 Responsywny design (desktop, tablet, mobile)

## 🛠️ Technologie

- **HTML5** - struktura strony
- **CSS3** - stylowanie (CSS Variables, Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - logika aplikacji
- **Font Awesome** - ikony
- **Google Fonts** - typografia (Outfit)

## 📁 Struktura Projektu

```
car-rental/
├── index.html          # Główna strona HTML
├── index.css           # Style aplikacji
├── app.js              # Logika JavaScript
├── assets/             # Zasoby (obrazy)
└── README.md           # Dokumentacja
```

## 🚀 Jak Uruchomić

### Opcja 1: Bezpośrednio w przeglądarce
Po prostu otwórz plik `index.html` w przeglądarce.

### Opcja 2: Lokalny serwer (zalecane)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve

# VS Code - Live Server extension
# Kliknij prawym na index.html -> "Open with Live Server"
```

Następnie otwórz: `http://localhost:8000`

## 📋 Główne Pliki

### `index.html`
Zawiera:
- Nawigację (navbar)
- Sekcję hero z wyszukiwarką
- Filtry kategorii
- Siatkę z kartami samochodów
- Sekcję z funkcjami
- Stopkę
- Modal rezerwacji

### `index.css`
Zawiera:
- CSS Variables (kolory, spacing, shadows)
- Reset i base styles
- Komponenty (buttons, cards, inputs, badges)
- Layout (navbar, hero, grid)
- Animacje (fade-in, slide-up, pulse)
- Media queries (responsywność)

### `app.js`
Zawiera:
- Dane samochodów (12 pojazdów)
- Funkcje renderowania
- System filtrowania
- Obsługę rezerwacji
- Walidację formularzy
- Smooth scrolling
- Intersection Observer dla animacji

## 🎨 Funkcjonalności

### Filtry
- Wszystkie
- Luksusowe
- SUV
- Sportowe
- Elektryczne
- Ekonomiczne

### Wyszukiwarka
- Wybór typu samochodu
- Data odbioru
- Data zwrotu
- Lokalizacja

### Rezerwacja
- Wybór samochodu
- Formularz danych osobowych
- Automatyczna kalkulacja ceny
- Podsumowanie rezerwacji

## 🎯 Samochody w Ofercie

1. **Mercedes S-Class** - 899 zł/dzień
2. **BMW X7** - 799 zł/dzień
3. **Porsche 911** - 1299 zł/dzień
4. **Tesla Model S** - 699 zł/dzień
5. **Audi A6** - 649 zł/dzień
6. **Range Rover Sport** - 949 zł/dzień
7. **Ferrari F8** - 2499 zł/dzień
8. **Tesla Model 3** - 449 zł/dzień
9. **Toyota Corolla** - 199 zł/dzień
10. **Volkswagen Golf** - 249 zł/dzień
11. **Lamborghini Huracán** - 2999 zł/dzień
12. **Audi e-tron** - 599 zł/dzień

## 🌟 Najważniejsze Funkcje Kodu

### Filtrowanie
```javascript
const filteredCars = currentFilter === 'all'
    ? cars
    : cars.filter(car => car.type === currentFilter);
```

### Kalkulacja Ceny
```javascript
const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
const total = days * selectedCar.price;
```

### Animacje przy Scrollu
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
});
```

## 🎨 Design System

### Kolory
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)

### Efekty
- Glassmorphism
- Gradient overlays
- Box shadows
- Smooth transitions
- Hover effects

## 📱 Responsywność

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔮 Przyszłe Ulepszenia

- [ ] Backend API dla zarządzania rezerwacjami
- [ ] Baza danych dla samochodów i użytkowników
- [ ] System płatności online
- [ ] Panel administracyjny
- [ ] Autentykacja użytkowników
- [ ] Historia rezerwacji
- [ ] Oceny i recenzje
- [ ] Mapa z lokalizacjami odbioru

## 📄 Licencja

MIT License - możesz swobodnie używać i modyfikować ten projekt.

## 👨‍💻 Autor

Projekt stworzony jako demo nowoczesnej aplikacji car rental.

---

**Enjoy your ride! 🚗💨**
