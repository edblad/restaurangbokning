<?php
require 'database.php';

$fetchFirstSitting = 'SELECT * FROM bookings WHERE time="18:00:00"';

$statement = $pdo->prepare($fetchFirstSitting);  
$statement->execute();
$firstSittingBookings = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($firstSittingBookings);

?>