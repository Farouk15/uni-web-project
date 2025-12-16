<?php

header("Content-Type: application/json");

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'shoeUs');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($link === false) {
    echo json_encode([
        "status" => false,
        "message" => "Database connection failed",
        "error" => mysqli_connect_error()
    ]);
    exit;
}

///// get method to show products

if (isset($_GET['show'])) {

    $sql = "SELECT * FROM product";
    $result = mysqli_query($link, $sql);

    if ($result && mysqli_num_rows($result) > 0) {

        $products = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row; 
        }

        echo json_encode([
            "status" => true,
            "count" => count($products),
            "data" => $products
        ]);

    } else {
        echo json_encode([
            "status" => false,
            "message" => "No data found"
        ]);
    }
} else {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request"
    ]);
}


?>
