<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$bookingData = json_decode($request_body);

$editBooking = 'UPDATE bookings 
                SET date = :date, 
                    time = :time, 
                    amount_of_people = :amount_of_people
                WHERE customer_id = :customer_id';

$bookingStatement = $pdo->prepare($editBooking);
$bookingStatement->execute(array(
    ':date' => $bookingData->date,
    ':time' => $bookingData->time,
    ':amount_of_people' => $bookingData->numberOfGuests,
    ':customer_id' => $bookingData->customerId
));


$editCustomer = 'UPDATE customer 
                 SET name = :name, 
                     phone = :phone, 
                     email = :email,
                 WHERE customer_id = :customer_id';

$customerStatement = $pdo->prepare($editCustomer);
$customerStatement->execute(array(
    ':name' => $bookingData->name,
    ':phone' => $bookingData->phone,
    ':email' => $bookingData->email,
    'customer_id' => $bookingData->customerId
));

echo 'edited';

?>