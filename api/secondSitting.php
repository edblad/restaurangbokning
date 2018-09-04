<?php
require 'database.php';

$fetchSecondSitting = 'SELECT * FROM bookings WHERE time="21:00:00"';

$statement = $pdo->prepare($fetchSecondSitting);  
$statement->execute();
$secondSittingBookings = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($secondSittingBookings);

?>