<?php
header('Access-Control-Allow-Origin: * ');

$pdo = new PDO(
    "mysql:host=localhost;dbname=restaurang;charset=utf8",
    "root",
    "root"
    );

$query = 'SELECT * FROM bookings';

$statement = $pdo->prepare($query);  
$statement->execute();
$bookings = $statement->fetchAll(PDO::FETCH_ASSOC);

//var_dump ($bookings);

echo json_encode($bookings);

?>