<?php
require 'database.php';

$selDelete = $_GET['id'];

$deleteBooking = 'DELETE FROM bookings WHERE bookings.customer_id="' . $selDelete . '"';

$bookingStatement = $pdo->prepare($deleteBooking);  
$bookingStatement->execute();

$deleteCustomer = 'DELETE FROM customer WHERE customer.customer_id="' . $selDelete . '"';

$customerStatement = $pdo->prepare($deleteCustomer);  
$customerStatement->execute();

echo 'deleted';

?>