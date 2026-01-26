
CREATE OR REPLACE FUNCTION check_car_availability(
    p_car_id INT,
    p_pickup_date DATE,
    p_return_date DATE
)
RETURNS BOOLEAN AS $$
DECLARE
    v_conflict_count INT;
BEGIN
    SELECT COUNT(*) INTO v_conflict_count
    FROM reservations
    WHERE car_id = p_car_id
      AND status = 'active'
      AND p_pickup_date < return_date
      AND p_return_date > pickup_date;
    
    RETURN v_conflict_count = 0;
END;
$$ LANGUAGE plpgsql;
