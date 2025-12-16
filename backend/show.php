<?php
require_once 'app.php';

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
