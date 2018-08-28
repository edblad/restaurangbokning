<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
header('Access-Control-Allow-Methods: DELETE');
    
$pdo = new PDO(
    "mysql:host=localhost;dbname=restaurang;charset=utf8",
    "root",
    "root"
    );
?>
