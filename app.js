const API_URL = 'http://localhost:3001/api';

const carsData = [
    {
        id: 1,
        name: 'Mercedes S-Class',
        category: 'Luksusowe',
        type: 'luxury',
        price: 899,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 2,
        name: 'BMW X7',
        category: 'SUV',
        type: 'suv',
        price: 799,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop',
        features: {
            seats: 7,
            transmission: 'Automatyczna',
            fuel: 'Diesel'
        }
    },
    {
        id: 3,
        name: 'Porsche 911',
        category: 'Sportowe',
        type: 'sport',
        price: 1299,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
        features: {
            seats: 2,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 4,
        name: 'Tesla Model S',
        category: 'Elektryczne',
        type: 'electric',
        price: 699,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Elektryczny'
        }
    },
    {
        id: 5,
        name: 'Audi A6',
        category: 'Luksusowe',
        type: 'luxury',
        price: 649,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Diesel'
        }
    },
    {
        id: 6,
        name: 'Range Rover Sport',
        category: 'SUV',
        type: 'suv',
        price: 949,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 7,
        name: 'Ferrari F8',
        category: 'Sportowe',
        type: 'sport',
        price: 2499,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
        features: {
            seats: 2,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 8,
        name: 'Tesla Model 3',
        category: 'Elektryczne',
        type: 'electric',
        price: 449,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Elektryczny'
        }
    },
    {
        id: 9,
        name: 'Toyota Corolla',
        category: 'Ekonomiczne',
        type: 'economy',
        price: 199,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Manualna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 10,
        name: 'Volkswagen Golf',
        category: 'Ekonomiczne',
        type: 'economy',
        price: 249,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 11,
        name: 'Lamborghini Huracán',
        category: 'Sportowe',
        type: 'sport',
        price: 2999,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
        features: {
            seats: 2,
            transmission: 'Automatyczna',
            fuel: 'Benzyna'
        }
    },
    {
        id: 12,
        name: 'Audi e-tron',
        category: 'Elektryczne',
        type: 'electric',
        price: 599,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&h=400&fit=crop',
        features: {
            seats: 5,
            transmission: 'Automatyczna',
            fuel: 'Elektryczny'
        }
    }
];

let currentFilter = 'all';
let selectedCar = null;
let suggestedCar = null;

const carsGrid = document.getElementById('carsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');
const searchForm = document.getElementById('searchForm');
const navbar = document.querySelector('.navbar');

const suggestionModal = document.getElementById('suggestionModal');
const closeSuggestionModalBtn = document.getElementById('closeSuggestionModal');
const bookSuggestedCarBtn = document.getElementById('bookSuggestedCar');
const chooseDifferentDateBtn = document.getElementById('chooseDifferentDate');
const chooseDifferentDateBtn2 = document.getElementById('chooseDifferentDate2');

const successModal = document.getElementById('successModal');
const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
const closeSuccessBtnBottom = document.getElementById('closeSuccessBtn');

document.addEventListener('DOMContentLoaded', () => {
    renderCars(carsData);
    setupEventListeners();
    setDefaultDates();
});

function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date(today);
    weekLater.setDate(weekLater.getDate() + 7);

    const formatDate = (date) => date.toISOString().split('T')[0];

    document.getElementById('pickupDate').value = formatDate(tomorrow);
    document.getElementById('returnDate').value = formatDate(weekLater);
    document.getElementById('bookingPickupDate').value = formatDate(tomorrow);
    document.getElementById('bookingReturnDate').value = formatDate(weekLater);
}


function renderCars(cars) {
    carsGrid.innerHTML = '';

    const filteredCars = currentFilter === 'all'
        ? cars
        : cars.filter(car => car.type === currentFilter);

    filteredCars.forEach((car, index) => {
        const carCard = createCarCard(car, index);
        carsGrid.appendChild(carCard);
    });
}


function createCarCard(car, index) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-fade-in');

    card.innerHTML = `
        <div class="car-image">
            <img src="${car.image}" alt="${car.name}">
            <div class="car-badge badge-primary">${car.category}</div>
        </div>
        <div class="car-info">
            <div class="car-header">
                <div>
                    <h3 class="car-name">${car.name}</h3>
                    <p class="car-category">${car.category}</p>
                </div>
                <div class="car-rating">
                    <i class="fas fa-star"></i>
                    <span>${car.rating}</span>
                </div>
            </div>
            <div class="car-features">
                <div class="car-feature">
                    <i class="fas fa-users"></i>
                    <span>${car.features.seats} osób</span>
                </div>
                <div class="car-feature">
                    <i class="fas fa-cog"></i>
                    <span>${car.features.transmission}</span>
                </div>
                <div class="car-feature">
                    <i class="fas fa-gas-pump"></i>
                    <span>${car.features.fuel}</span>
                </div>
            </div>
            <div class="car-footer">
                <div class="car-price">
                    <span class="price-amount">${car.price} zł</span>
                    <span class="price-period">za dzień</span>
                </div>
                <button class="btn btn-primary car-book-btn" onclick="openBookingModal(${car.id})">
                    Rezerwuj
                </button>
            </div>
        </div>
    `;

    return card;
}

function setupEventListeners() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCars(carsData);
        });
    });


    closeModalBtn.addEventListener('click', closeBookingModal);
    bookingModal.querySelector('.modal-backdrop').addEventListener('click', closeBookingModal);


    bookingForm.addEventListener('submit', handleBookingSubmit);


    searchForm.addEventListener('submit', handleSearch);


    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });


                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });


    const bookingPickupDate = document.getElementById('bookingPickupDate');
    const bookingReturnDate = document.getElementById('bookingReturnDate');

    bookingPickupDate.addEventListener('change', updateBookingSummary);
    bookingReturnDate.addEventListener('change', updateBookingSummary);

    closeSuggestionModalBtn.addEventListener('click', closeSuggestionModal);
    suggestionModal.querySelector('.modal-backdrop').addEventListener('click', closeSuggestionModal);

    bookSuggestedCarBtn.addEventListener('click', () => {
        if (suggestedCar) {
            closeSuggestionModal();
            openBookingModal(suggestedCar.id);
        }
    });

    chooseDifferentDateBtn.addEventListener('click', () => {
        closeSuggestionModal();
        if (selectedCar) {
            openBookingModal(selectedCar.id);
        }
    });

    if (chooseDifferentDateBtn2) {
        chooseDifferentDateBtn2.addEventListener('click', () => {
            closeSuggestionModal();
            if (selectedCar) {
                openBookingModal(selectedCar.id);
            }
        });
    }

    closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
    closeSuccessBtnBottom.addEventListener('click', closeSuccessModal);
    successModal.querySelector('.modal-backdrop').addEventListener('click', closeSuccessModal);
}


function openBookingModal(carId) {
    selectedCar = carsData.find(car => car.id === carId);
    if (!selectedCar) return;

    const bookingCarInfo = document.getElementById('bookingCarInfo');
    bookingCarInfo.innerHTML = `
        <img src="${selectedCar.image}" alt="${selectedCar.name}" class="booking-car-image">
        <div class="booking-car-details">
            <h4>${selectedCar.name}</h4>
            <p class="text-secondary">${selectedCar.category}</p>
            <p class="text-primary font-bold">${selectedCar.price} zł / dzień</p>
        </div>
    `;

    updateBookingSummary();
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeSuggestionModal() {
    suggestionModal.classList.remove('active');
    document.body.style.overflow = '';
    suggestedCar = null;
}

function showSuggestionModal(originalCar, suggestion) {
    const unavailableMsg = document.getElementById('unavailableCarName');
    unavailableMsg.textContent = `${originalCar.name} jest już zarezerwowany w wybranym terminie.`;

    const suggestionBox = document.getElementById('suggestionBox');
    const noSuggestionBox = document.getElementById('noSuggestionBox');

    if (suggestion && suggestion.found) {
        suggestedCar = suggestion.suggestion;

        const suggestedCarInfo = document.getElementById('suggestedCarInfo');
        suggestedCarInfo.innerHTML = `
            <img src="${suggestedCar.image}" alt="${suggestedCar.name}" class="suggested-car-image">
            <div class="suggested-car-details">
                <h4>${suggestedCar.name}</h4>
                <p class="text-secondary">${suggestedCar.category}</p>
                <p class="text-primary font-bold">${suggestedCar.price} zł / dzień</p>
                <div class="suggested-car-rating">
                    <i class="fas fa-star" style="color: #f59e0b;"></i>
                    <span>${suggestedCar.rating}</span>
                </div>
            </div>
        `;

        const suggestionReason = document.getElementById('suggestionReason');
        suggestionReason.innerHTML = `<i class="fas fa-info-circle"></i> ${suggestedCar.reason}`;

        suggestionBox.style.display = 'block';
        noSuggestionBox.style.display = 'none';
    } else {
        suggestionBox.style.display = 'none';
        noSuggestionBox.style.display = 'block';
    }

    suggestionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSuccessModal(reservationData, carName, pickupDate, returnDate, totalPrice) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pl-PL');
    };

    document.getElementById('successCarName').textContent = carName;
    document.getElementById('reservationId').textContent = `#${reservationData.reservationId}`;
    document.getElementById('successPickupDate').textContent = formatDate(pickupDate);
    document.getElementById('successReturnDate').textContent = formatDate(returnDate);
    document.getElementById('successTotalPrice').textContent = `${totalPrice.toFixed(2)} zł`;

    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function updateBookingSummary() {
    if (!selectedCar) return;

    const pickupDate = new Date(document.getElementById('bookingPickupDate').value);
    const returnDate = new Date(document.getElementById('bookingReturnDate').value);

    if (pickupDate && returnDate && returnDate > pickupDate) {
        const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
        const total = days * selectedCar.price;

        document.getElementById('rentalDays').textContent = `${days} dni`;
        document.getElementById('pricePerDay').textContent = `${selectedCar.price} zł`;
        document.getElementById('totalPrice').textContent = `${total} zł`;
    } else {
        document.getElementById('rentalDays').textContent = '-';
        document.getElementById('pricePerDay').textContent = '-';
        document.getElementById('totalPrice').textContent = '-';
    }
}


async function handleBookingSubmit(e) {
    e.preventDefault();

    const pickupDate = document.getElementById('bookingPickupDate').value;
    const returnDate = document.getElementById('bookingReturnDate').value;

    console.log('=== REZERWACJA ===');
    console.log('Samochod:', selectedCar.name, '(ID:', selectedCar.id, ')');
    console.log('Data odbioru:', pickupDate);
    console.log('Data zwrotu:', returnDate);

    try {
        console.log('Wywoluje API check-availability...');
        const availabilityResponse = await fetch(`${API_URL}/check-availability`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carId: selectedCar.id,
                pickupDate: pickupDate,
                returnDate: returnDate
            })
        });

        const availabilityData = await availabilityResponse.json();
        console.log('Odpowiedz dostepnosci:', availabilityData);

        if (!availabilityData.available) {
            console.log('Samochod NIEDOSTEPNY - pobieram sugestie...');
            closeBookingModal();

            const suggestionResponse = await fetch(`${API_URL}/suggest-similar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    carId: selectedCar.id,
                    pickupDate: pickupDate,
                    returnDate: returnDate
                })
            });

            const suggestionData = await suggestionResponse.json();
            console.log('Sugestia:', suggestionData);
            showSuggestionModal(selectedCar, suggestionData);
            return;
        }

        console.log('Samochod DOSTEPNY - tworze rezerwacje...');
        const formData = new FormData(bookingForm);
        const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = days * selectedCar.price;

        const reservationResponse = await fetch(`${API_URL}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carId: selectedCar.id,
                customerName: formData.get('name') || 'Klient',
                customerEmail: formData.get('email') || 'klient@example.com',
                customerPhone: formData.get('phone') || '',
                pickupDate: pickupDate,
                returnDate: returnDate,
                totalPrice: totalPrice
            })
        });

        const reservationData = await reservationResponse.json();

        if (reservationData.success) {
            console.log('Rezerwacja utworzona:', reservationData);
            closeBookingModal();
            showSuccessModal(reservationData, selectedCar.name, pickupDate, returnDate, totalPrice);
        } else {
            alert(`Błąd: ${reservationData.error}`);
        }

    } catch (error) {
        console.error('Blad API:', error);
        alert(`Nie można połączyć się z serwerem.`);
    }

    bookingForm.reset();
    setDefaultDates();
}


function handleSearch(e) {
    e.preventDefault();

    const carType = document.getElementById('carType').value;

    if (carType) {

        currentFilter = carType;


        filterBtns.forEach(btn => {
            if (btn.dataset.filter === carType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });


        renderCars(carsData);


        document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
    } else {

        currentFilter = 'all';
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        renderCars(carsData);
        document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
    }
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
});
