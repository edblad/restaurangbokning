<?php
require 'database.php';

$request_body = file_get_contents('php://input');
$deletedData = json_decode($request_body);

$deleteBooking = 'DELETE FROM bookings WHERE bookings.customer_id = customer.customer_id';

$statement = $pdo->prepare($deleteBooking);  
$statement->execute();

echo 'deleted';

?>