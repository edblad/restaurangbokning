<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

$bookingQuery = 'INSERT INTO customer (name, phone, email) 
                 VALUES (:name, :phone, :email)';

$statement = $pdo->prepare($bookingQuery);
$statement->execute(array(
    ":name" => $bookingData->name,
    ":phone" => $bookingData->phone,
    ":email" => $bookingData->email,
));

//echo json_encode($booking);

echo '';


?>