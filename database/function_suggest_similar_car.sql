DROP TYPE IF EXISTS similar_car_result CASCADE;
CREATE TYPE similar_car_result AS (
    car_id INT,
    car_name VARCHAR(100),
    category VARCHAR(50),
    type VARCHAR(30),
    price DECIMAL(10, 2),
    rating DECIMAL(2, 1),
    image_url TEXT,
    seats INT,
    transmission VARCHAR(30),
    fuel VARCHAR(30),
    similarity_score INT,
    suggestion_reason TEXT
);

CREATE OR REPLACE FUNCTION suggest_similar_car(
    p_car_id INT,
    p_pickup_date DATE,
    p_return_date DATE
)
RETURNS similar_car_result AS $$
DECLARE
    v_result similar_car_result;
    v_original_car RECORD;
    v_is_available BOOLEAN;
    v_price_min DECIMAL;
    v_price_max DECIMAL;
BEGIN
    SELECT * INTO v_original_car FROM cars WHERE id = p_car_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Samochod o ID % nie istnieje', p_car_id;
    END IF;
    
    v_is_available := check_car_availability(p_car_id, p_pickup_date, p_return_date);
    
    IF v_is_available THEN
        RETURN NULL;
    END IF;
    
    v_price_min := v_original_car.price * 0.7;
    v_price_max := v_original_car.price * 1.3;
    
    SELECT 
        c.id,
        c.name,
        c.category,
        c.type,
        c.price,
        c.rating,
        c.image_url,
        c.seats,
        c.transmission,
        c.fuel,
        100 - ABS(c.price - v_original_car.price)::INT AS similarity_score,
        'Ten sam typ i podobna cena' AS suggestion_reason
    INTO v_result
    FROM cars c
    WHERE c.id != p_car_id
      AND c.type = v_original_car.type
      AND c.price BETWEEN v_price_min AND v_price_max
      AND check_car_availability(c.id, p_pickup_date, p_return_date) = TRUE
    ORDER BY 
        ABS(c.price - v_original_car.price),
        c.rating DESC
    LIMIT 1;
    
    IF v_result.car_id IS NOT NULL THEN
        RETURN v_result;
    END IF;
    
    SELECT 
        c.id,
        c.name,
        c.category,
        c.type,
        c.price,
        c.rating,
        c.image_url,
        c.seats,
        c.transmission,
        c.fuel,
        80 AS similarity_score,
        'Ten sam typ samochodu' AS suggestion_reason
    INTO v_result
    FROM cars c
    WHERE c.id != p_car_id
      AND c.type = v_original_car.type
      AND check_car_availability(c.id, p_pickup_date, p_return_date) = TRUE
    ORDER BY 
        ABS(c.price - v_original_car.price),
        c.rating DESC
    LIMIT 1;
    
    IF v_result.car_id IS NOT NULL THEN
        RETURN v_result;
    END IF;
    
    SELECT 
        c.id,
        c.name,
        c.category,
        c.type,
        c.price,
        c.rating,
        c.image_url,
        c.seats,
        c.transmission,
        c.fuel,
        60 AS similarity_score,
        'Podobna cena' AS suggestion_reason
    INTO v_result
    FROM cars c
    WHERE c.id != p_car_id
      AND c.price BETWEEN v_price_min AND v_price_max
      AND check_car_availability(c.id, p_pickup_date, p_return_date) = TRUE
    ORDER BY 
        ABS(c.price - v_original_car.price),
        c.rating DESC
    LIMIT 1;
    
    IF v_result.car_id IS NOT NULL THEN
        RETURN v_result;
    END IF;
    
    SELECT 
        c.id,
        c.name,
        c.category,
        c.type,
        c.price,
        c.rating,
        c.image_url,
        c.seats,
        c.transmission,
        c.fuel,
        40 AS similarity_score,
        'Dostepny w wybranym terminie' AS suggestion_reason
    INTO v_result
    FROM cars c
    WHERE c.id != p_car_id
      AND check_car_availability(c.id, p_pickup_date, p_return_date) = TRUE
    ORDER BY 
        ABS(c.price - v_original_car.price),
        c.rating DESC
    LIMIT 1;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;
