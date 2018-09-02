<?php
require 'database.php';


$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

var_dump($bookingData);

$customerQuery = 'INSERT INTO customer (name, phone, email) VALUES (:name, :phone, :email)';
$bookingQuery = 'INSERT INTO bookings (customer_id, date, time, amount_of_people)
                     VALUES (LAST_INSERT_ID(), :date, :time, :amount_of_people)';
 $statement = $pdo->prepare($customerQuery);
$statement->execute(array(
    ":name" => $bookingData->name,
    ":phone" => $bookingData->phone,
    ":email" => $bookingData->email
));
 $statement2 = $pdo->prepare($bookingQuery);
$statement2->execute(array(
    ":date" => $bookingData->date,
    ":time" => $bookingData->time,
    ":amount_of_people" => $bookingData->numberOfGuests
 ));
 //echo json_encode($booking);

 //Send booking confirmation email to customer upon completion of booking
 $headers = "From: bookingconfirmation@restaurant.com";
 mail($bookingData->email,"Booking Confirmation","<h1>Thank you for your booking $bookingData->name</h1><br> Your have booked a table for
 $bookingData->numberOfGuests, on the date of $bookingData->date, at $bookingData->time . We look forward to seeing you!" $headers);


echo '';
 ?>
