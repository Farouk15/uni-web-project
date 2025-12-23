<?php
require_once 'app.php';
header('Content-Type: application/json');

// read JSON input
$input = json_decode(file_get_contents("php://input"), true);

// ================== SHOW CART ==================
if (isset($input['action']) && $input['action'] === 'show_cart') {

    if (!isset($input['user_id'])) {
        echo json_encode([
            "status" => false,
            "message" => "user_id is required"
        ]);
        exit;
    }

    $user_id = (int)$input['user_id'];

    $sql = "SELECT 
                cart.cart_id,
                cart.quantity,
                product.product_id,
                product.name,
                product.price,
                product.color,
                product.size
            FROM cart
            JOIN product ON cart.product_id = product.product_id
            WHERE cart.user_id = $user_id";

    $result = mysqli_query($link, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $cart = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $cart[] = $row;
        }

        echo json_encode([
            "status" => true,
            "count"  => count($cart),
            "data"   => $cart
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Cart is empty"
        ]);
    }

    exit;
}


if (isset($input['action']) && $input['action'] === 'add_cart') {

    if (
        !isset($input['product_id']) ||
        !isset($input['user_id']) ||
        !isset($input['quantity'])
    ) {
        echo json_encode([
            "status" => false,
            "message" => "Missing required fields"
        ]);
        exit;
    }

    $product_id = (int)$input['product_id'];
    $user_id    = (int)$input['user_id'];
    $quantity   = (int)$input['quantity'];

    $check = "SELECT cart_id FROM cart 
              WHERE product_id = $product_id AND user_id = $user_id";
    $res = mysqli_query($link, $check);

    if (mysqli_num_rows($res) > 0) {
        $sql = "UPDATE cart 
                SET quantity = quantity + $quantity
                WHERE product_id = $product_id AND user_id = $user_id";
    } else {
        $sql = "INSERT INTO cart (product_id, user_id, quantity)
                VALUES ($product_id, $user_id, $quantity)";
    }

    if (mysqli_query($link, $sql)) {
        echo json_encode([
            "status" => true,
            "message" => "Added to cart successfully"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "error" => mysqli_error($link)
        ]);
    }

    exit;
}


// ================== INVALID ACTION ==================
echo json_encode([
    "status" => false,
    "message" => "Invalid action"
]);
