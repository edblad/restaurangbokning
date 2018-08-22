<?php
require 'database.php';

$selDate = $_POST["date"];

$my_sql = $pdo->prepare(
    "INSERT INTO bookings (date)
     VALUES ('$selDate')";
 );


-- // $date = 'SELECT date FROM bookings WHERE date = $selDate';

-- // $statement = $pdo->prepare($date);  
-- // $statement->execute();
-- // $selectedDate = $statement->fetchAll(PDO::FETCH_ASSOC);

-- // echo json_encode($selectedDate);

?>