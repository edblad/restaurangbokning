<?php
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

$pdo = new PDO(
    "mysql:host=localhost;dbname=restaurang;charset=utf8",
    "root",
    "root"
    );
?> 