<?php
require 'database.php';

$selDate = $_GET['date'];
$selPhone = $_GET['phone'];

//Select the reservation and the customer
$query = "SELECT *, customer.email FROM `bookings` left JOIN customer on bookings.customer_id = customer.customer_id WHERE date = '$selDate' AND customer.phone = '$selPhone'";
$statement = $pdo->prepare($query);
$statement->execute();
$theBooking = $statement->fetchAll(PDO::FETCH_ASSOC);

//If reservation is not found
if(sizeof($theBooking) == 0){
  echo json_encode([ "notfound" => true ]);
  die();
}

//Delete the booking
$deleteBooking = 'DELETE FROM bookings WHERE bookings.booking_id="' . $theBooking[0]['booking_id'] . '"';
$bookingStatement = $pdo->prepare($deleteBooking);
$bookingStatement->execute();

//Delete the customer
$deleteCustomer = 'DELETE FROM customer WHERE customer.customer_id="' . $theBooking[0]['customer_id'] . '"';
$customerStatement = $pdo->prepare($deleteCustomer);
$customerStatement->execute();

//Send booking cancellation email to customer
 $headers = "From: bookingconfirmation@restaurant.com";
 @mail($theBooking[0]['email'],"Booking cancelled","<h1>Thank you for your cancellation.</h1>", $headers);

echo json_encode([ "removed" => true ]);
?>
