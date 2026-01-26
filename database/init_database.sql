
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    image_url TEXT,
    seats INT NOT NULL DEFAULT 5,
    transmission VARCHAR(30) NOT NULL DEFAULT 'Automatyczna',
    fuel VARCHAR(30) NOT NULL DEFAULT 'Benzyna',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20),
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_dates CHECK (return_date > pickup_date)
);

CREATE INDEX idx_reservations_car_id ON reservations(car_id);
CREATE INDEX idx_reservations_dates ON reservations(pickup_date, return_date);
CREATE INDEX idx_cars_type ON cars(type);
CREATE INDEX idx_cars_price ON cars(price);

INSERT INTO cars (id, name, category, type, price, rating, image_url, seats, transmission, fuel) VALUES
(1, 'Mercedes S-Class', 'Luksusowe', 'luxury', 899.00, 4.9, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Benzyna'),
(2, 'BMW X7', 'SUV', 'suv', 799.00, 4.8, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop', 7, 'Automatyczna', 'Diesel'),
(3, 'Porsche 911', 'Sportowe', 'sport', 1299.00, 5.0, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', 2, 'Automatyczna', 'Benzyna'),
(4, 'Tesla Model S', 'Elektryczne', 'electric', 699.00, 4.9, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Elektryczny'),
(5, 'Audi A6', 'Luksusowe', 'luxury', 649.00, 4.7, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Diesel'),
(6, 'Range Rover Sport', 'SUV', 'suv', 949.00, 4.8, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Benzyna'),
(7, 'Ferrari F8', 'Sportowe', 'sport', 2499.00, 5.0, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', 2, 'Automatyczna', 'Benzyna'),
(8, 'Tesla Model 3', 'Elektryczne', 'electric', 449.00, 4.8, 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Elektryczny'),
(9, 'Toyota Corolla', 'Ekonomiczne', 'economy', 199.00, 4.5, 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=400&fit=crop', 5, 'Manualna', 'Benzyna'),
(10, 'Volkswagen Golf', 'Ekonomiczne', 'economy', 249.00, 4.6, 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Benzyna'),
(11, 'Lamborghini Huracán', 'Sportowe', 'sport', 2999.00, 5.0, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', 2, 'Automatyczna', 'Benzyna'),
(12, 'Audi e-tron', 'Elektryczne', 'electric', 599.00, 4.7, 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&h=400&fit=crop', 5, 'Automatyczna', 'Elektryczny');

SELECT setval('cars_id_seq', (SELECT MAX(id) FROM cars));

INSERT INTO reservations (car_id, customer_name, customer_email, customer_phone, pickup_date, return_date, total_price) VALUES
(1, 'Jan Kowalski', 'jan.kowalski@email.pl', '+48 123 456 789', '2026-01-10', '2026-01-15', 4495.00),
(3, 'Anna Nowak', 'anna.nowak@email.pl', '+48 987 654 321', '2026-01-12', '2026-01-14', 2598.00),
(7, 'Piotr Wiśniewski', 'piotr.w@email.pl', '+48 555 666 777', '2026-01-09', '2026-01-16', 17493.00);

SELECT 'Baza danych zainicjalizowana pomyślnie!' AS status;
SELECT COUNT(*) AS liczba_samochodow FROM cars;
SELECT COUNT(*) AS liczba_rezerwacji FROM reservations;
