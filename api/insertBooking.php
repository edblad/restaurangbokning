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
 echo '';
 ?>
