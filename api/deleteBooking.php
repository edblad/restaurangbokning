<?php
require 'database.php';

$selDelete = $_GET['id'];

$deleteBooking = 'DELETE FROM bookings WHERE bookings.customer_id="' . $selDelete . '"';

$statement = $pdo->prepare($deleteBooking);  
$statement->execute();

$deleteCustomer = 'DELETE FROM customer WHERE customer.customer_id="' . $selDelete . '"';

$statement2 = $pdo->prepare($deleteCustomer);  
$statement2->execute();

echo 'deleted';

?>