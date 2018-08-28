<?php
require 'database.php';

$fetchFirstSitting = 'SELECT * FROM bookings INNER JOIN customer ON bookings.customer_id = customer.customer_id';

$statement = $pdo->prepare($fetchFirstSitting);  
$statement->execute();
$firstSittingBookings = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($firstSittingBookings);

?>