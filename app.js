// Car Data
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

// State
let currentFilter = 'all';
let selectedCar = null;

// DOM Elements
const carsGrid = document.getElementById('carsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');
const searchForm = document.getElementById('searchForm');
const navbar = document.querySelector('.navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCars(carsData);
    setupEventListeners();
    setDefaultDates();
});

// Set default dates
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

// Render cars
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

// Create car card
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

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCars(carsData);
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', closeBookingModal);
    bookingModal.querySelector('.modal-backdrop').addEventListener('click', closeBookingModal);

    // Booking form
    bookingForm.addEventListener('submit', handleBookingSubmit);

    // Search form
    searchForm.addEventListener('submit', handleSearch);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Date change listeners for booking summary
    const bookingPickupDate = document.getElementById('bookingPickupDate');
    const bookingReturnDate = document.getElementById('bookingReturnDate');

    bookingPickupDate.addEventListener('change', updateBookingSummary);
    bookingReturnDate.addEventListener('change', updateBookingSummary);
}

// Open booking modal
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

// Close booking modal
function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
    selectedCar = null;
}

// Update booking summary
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

// Handle booking submit
function handleBookingSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);

    // Show success message
    alert(`✅ Rezerwacja potwierdzona!\n\nSamochód: ${selectedCar.name}\nDziękujemy za wybór LuxDrive!`);

    // Close modal and reset form
    closeBookingModal();
    bookingForm.reset();
    setDefaultDates();
}

// Handle search
function handleSearch(e) {
    e.preventDefault();

    const carType = document.getElementById('carType').value;

    if (carType) {
        // Update filter
        currentFilter = carType;

        // Update active filter button
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === carType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Render filtered cars
        renderCars(carsData);

        // Scroll to cars section
        document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show all cars
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

// Intersection Observer for animations
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

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
});
