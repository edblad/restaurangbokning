<?php
require 'database.php';

$date = 'SELECT * FROM bookings WHERE time="18:00:00"';

$statement = $pdo->prepare($date);  
$statement->execute();
$selectedDate = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($selectedDate);

?>