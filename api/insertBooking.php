<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

var_dump($bookingData);

$customerQuery = 'INSERT INTO customer (name, phone, email) VALUES (:name, :phone, :email)';
$bookingQuery = 'INSERT INTO bookings (customer_id, date, time, amount_of_people)
                     VALUES (LAST_INSERT_ID(), :date, :time, :amount_of_people)';
$customerStatement = $pdo->prepare($customerQuery);
$customerStatement->execute(array(
    ":name" => $bookingData->name,
    ":phone" => $bookingData->phone,
    ":email" => $bookingData->email
));

$bookingStatement = $pdo->prepare($bookingQuery);
$bookingStatement->execute(array(
    ":date" => $bookingData->date,
    ":time" => $bookingData->time,
    ":amount_of_people" => $bookingData->numberOfGuests
 ));

echo '';
//Send booking confirmation email to customer upon completion of booking
 $headers = "From: bookingconfirmation@restaurant.com";
 @mail($bookingData->email,"Booking Confirmation","Thank you for your booking $bookingData->name Your have booked a table for $bookingData->numberOfGuests, on the date of $bookingData->date, at $bookingData->time . We look forward to seeing you!", $headers);

 ?>
