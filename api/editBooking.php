<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

$editBooking = 'UPDATE FROM bookings 
                SET $bookingData->date = :date, 
                    $bookingData->time = :time, 
                    $bookingData->numberOfGuests = :amount_of_people
                WHERE customer_id = $bookingData->customerID';

$bookingStatement = $pdo->prepare($bookingQuery);
$bookingStatement->execute(array(
    ":date" => $bookingData->date,
    ":time" => $bookingData->time,
    ":amount_of_people" => $bookingData->numberOfGuests
));

$editCustomer = 'UPDATE FROM customer SET ';

$customerStatement = $pdo->prepare($customerQuery);
$customerStatement->execute(array(
    ":name" => $bookingData->name,
    ":phone" => $bookingData->phone,
    ":email" => $bookingData->email
));

echo 'edited';

?>