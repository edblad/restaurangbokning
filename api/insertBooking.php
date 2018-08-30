<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

$customerQuery = 'INSERT INTO customer (name, phone, email) 
                  VALUES (:name, :phone, :email)';
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
 ?>
