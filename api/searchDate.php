<?php
require 'database.php';

$selDate = $_GET['date'];

$date = 'SELECT date FROM bookings WHERE date = "' . $selDate . '"';

$statement = $pdo->prepare($date);  
$statement->execute();
$selectedDate = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($selectedDate);

?>