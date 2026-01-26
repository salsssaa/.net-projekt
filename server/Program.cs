using Npgsql;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

var connectionString = "Host=localhost;Port=5432;Database=carrent;Username=postgres;Password=postgres";

app.MapGet("/api/cars", async () =>
{
    var cars = new List<object>();
    
    await using var conn = new NpgsqlConnection(connectionString);
    await conn.OpenAsync();
    
    await using var cmd = new NpgsqlCommand(@"
        SELECT id, name, category, type, price, rating, 
               image_url, seats, transmission, fuel
        FROM cars ORDER BY id", conn);
    
    await using var reader = await cmd.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        cars.Add(new
        {
            id = reader.GetInt32(0),
            name = reader.GetString(1),
            category = reader.GetString(2),
            type = reader.GetString(3),
            price = reader.GetDecimal(4),
            rating = reader.GetDecimal(5),
            image = reader.IsDBNull(6) ? "" : reader.GetString(6),
            seats = reader.GetInt32(7),
            transmission = reader.GetString(8),
            fuel = reader.GetString(9)
        });
    }
    
    return Results.Ok(cars);
});

app.MapPost("/api/check-availability", async (CheckAvailabilityRequest request) =>
{
    await using var conn = new NpgsqlConnection(connectionString);
    await conn.OpenAsync();
    
    await using var cmd = new NpgsqlCommand(
        "SELECT check_car_availability(@carId, @pickupDate, @returnDate)", conn);
    cmd.Parameters.AddWithValue("carId", request.CarId);
    cmd.Parameters.AddWithValue("pickupDate", DateOnly.Parse(request.PickupDate));
    cmd.Parameters.AddWithValue("returnDate", DateOnly.Parse(request.ReturnDate));
    
    var result = await cmd.ExecuteScalarAsync();
    var available = result != null && (bool)result;
    
    Console.WriteLine($"Check availability: Car {request.CarId}, {request.PickupDate} - {request.ReturnDate} = {available}");
    
    return Results.Ok(new { available });
});

app.MapPost("/api/suggest-similar", async (CheckAvailabilityRequest request) =>
{
    await using var conn = new NpgsqlConnection(connectionString);
    await conn.OpenAsync();
    
    await using var cmd = new NpgsqlCommand(
        "SELECT * FROM suggest_similar_car(@carId, @pickupDate, @returnDate)", conn);
    cmd.Parameters.AddWithValue("carId", request.CarId);
    cmd.Parameters.AddWithValue("pickupDate", DateOnly.Parse(request.PickupDate));
    cmd.Parameters.AddWithValue("returnDate", DateOnly.Parse(request.ReturnDate));
    
    await using var reader = await cmd.ExecuteReaderAsync();
    
    if (await reader.ReadAsync() && !reader.IsDBNull(0))
    {
        var suggestion = new
        {
            id = reader.GetInt32(0),
            name = reader.GetString(1),
            category = reader.GetString(2),
            type = reader.GetString(3),
            price = reader.GetDecimal(4),
            rating = reader.GetDecimal(5),
            image = reader.IsDBNull(6) ? "" : reader.GetString(6),
            seats = reader.GetInt32(7),
            transmission = reader.GetString(8),
            fuel = reader.GetString(9),
            similarityScore = reader.GetInt32(10),
            reason = reader.GetString(11)
        };
        
        Console.WriteLine($"Suggestion for car {request.CarId}: {suggestion.name}");
        
        return Results.Ok(new { found = true, suggestion });
    }
    
    Console.WriteLine($"No suggestion found for car {request.CarId}");
    return Results.Ok(new { found = false, suggestion = (object?)null });
});


app.MapPost("/api/reservations", async (ReservationRequest request) =>
{
    await using var conn = new NpgsqlConnection(connectionString);
    await conn.OpenAsync();
    

    await using var checkCmd = new NpgsqlCommand(
        "SELECT check_car_availability(@carId, @pickupDate, @returnDate)", conn);
    checkCmd.Parameters.AddWithValue("carId", request.CarId);
    checkCmd.Parameters.AddWithValue("pickupDate", DateOnly.Parse(request.PickupDate));
    checkCmd.Parameters.AddWithValue("returnDate", DateOnly.Parse(request.ReturnDate));
    
    var available = (bool)(await checkCmd.ExecuteScalarAsync() ?? false);
    
    if (!available)
    {
        return Results.Conflict(new { error = "Samochod jest juz zarezerwowany", available = false });
    }
    

    await using var insertCmd = new NpgsqlCommand(@"
        INSERT INTO reservations (car_id, customer_name, customer_email, customer_phone, 
                                  pickup_date, return_date, total_price)
        VALUES (@carId, @name, @email, @phone, @pickupDate, @returnDate, @totalPrice)
        RETURNING id", conn);
    
    insertCmd.Parameters.AddWithValue("carId", request.CarId);
    insertCmd.Parameters.AddWithValue("name", request.CustomerName);
    insertCmd.Parameters.AddWithValue("email", request.CustomerEmail);
    insertCmd.Parameters.AddWithValue("phone", request.CustomerPhone ?? "");
    insertCmd.Parameters.AddWithValue("pickupDate", DateOnly.Parse(request.PickupDate));
    insertCmd.Parameters.AddWithValue("returnDate", DateOnly.Parse(request.ReturnDate));
    insertCmd.Parameters.AddWithValue("totalPrice", request.TotalPrice);
    
    var reservationId = await insertCmd.ExecuteScalarAsync();
    
    Console.WriteLine($"Created reservation {reservationId} for car {request.CarId}");
    
    return Results.Ok(new { success = true, reservationId, message = "Rezerwacja utworzona pomyslnie" });
});

Console.WriteLine(@"
========================================
  Car Rental API (.NET)
  http://localhost:3001
========================================
Dostepne endpointy:
  GET  /api/cars              - Lista samochodow
  POST /api/check-availability - Sprawdz dostepnosc
  POST /api/suggest-similar    - Sugestia podobnego
  POST /api/reservations       - Utworz rezerwacje
========================================
");

app.Run("http://localhost:3001");


public record CheckAvailabilityRequest(int CarId, string PickupDate, string ReturnDate);

public record ReservationRequest(
    int CarId, 
    string CustomerName, 
    string CustomerEmail, 
    string? CustomerPhone,
    string PickupDate, 
    string ReturnDate, 
    decimal TotalPrice
);
