<?php
require 'database.php';

$fetchAllBookings = 'SELECT * FROM bookings 
                     INNER JOIN customer 
                     ON bookings.customer_id = customer.customer_id
                     ORDER BY date ASC';

$statement = $pdo->prepare($fetchAllBookings);  
$statement->execute();
$allBookings = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($allBookings);

?>