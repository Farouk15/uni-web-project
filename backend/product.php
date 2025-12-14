<?php 

require_once './backend/app.php';
///// post method to add products
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $category = isset($_POST['category']) ? $_POST['category'] : null;
    $price = isset($_POST['price']) ? $_POST['price'] : null;
    $gender = isset($_POST['gender']) ? $_POST['gender'] : null;
    $color = isset($_POST['color']) ? $_POST['color'] : null;
    $size = isset($_POST['size']) ? $_POST['size'] : null;
    $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : null;
    $description = isset($_POST['description']) ? $_POST['image'] : null;
    $image = isset($_POST['img']) ? $_POST['img'] : null;
    if ($name && $price) {

        $stmt = $link->prepare("INSERT INTO product (name, price) VALUES (?, ?)");
        $stmt->bind_param( $name, $category ,$price ,$gender ,$color ,$size ,$quantity ,$description ,$image);

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