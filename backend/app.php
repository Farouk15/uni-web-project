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

///// post method to add products
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $name = isset($_POST['category']) ? $_POST['category'] : null;

    $price = isset($_POST['price']) ? $_POST['price'] : null;
    $price = isset($_POST['gender']) ? $_POST['gender'] : null;
    $price = isset($_POST['color']) ? $_POST['color'] : null;
    $price = isset($_POST['size']) ? $_POST['size'] : null;
    $price = isset($_POST['quantity']) ? $_POST['quantity'] : null;
    $price = isset($_POST['description']) ? $_POST['image'] : null;





    if ($name && $price) {

        $stmt = $link->prepare("INSERT INTO product (name, price) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $price);

        if ($stmt->execute()) {
            echo json_encode([
                "status" => true,
                "message" => "Product added successfully",
                "product_id" => $stmt->insert_id
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "message" => "Failed to insert product",
                "error" => $stmt->error
            ]);
        }

    } else {
        echo json_encode([
            "status" => false,
            "message" => "Missing name or price"
        ]);
    }

} else {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request method, use POST"
    ]);
}
?>
