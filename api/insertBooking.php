<?php
require 'database.php';

$selBooking = $_GET['date','name','phone', 'email', 'amount_of_people', 'time'];

$date = 'INSERT INTO bookings (date, time, amount_of_people) VALUES ('') ';

$statement = $pdo->prepare($date);  
$statement->execute();
$selectedDate = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($selectedDate);

?>