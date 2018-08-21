<?php
header('Access-Control-Allow-Origin: * ');

$pdo = new PDO(
    "mysql:host=localhost;dbname=restaurang;charset=utf8",
    "root",
    "root"
    );
?> 