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

<!-- require 'database.php';

$request_body = file_get_contents('php://input');
$deletedData = json_decode($request_body);

$deleteBooking = 'DELETE FROM bookings WHERE bookings.customer_id = customer.customer_id';

$statement = $pdo->prepare($deleteBooking);  
$statement->execute(array(

));

echo 'deleted'; -->