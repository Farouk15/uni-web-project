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

if (isset($_POST['add'])) {

    $name     = $_POST['name'];
    $price    = $_POST['price'];
    $category = $_POST['category'];
    $gender   = $_POST['gender'];
    $color    = $_POST['color'];
    $size     = $_POST['size'];
    $quantity = $_POST['quantity'];
    $description  = $_POST['description'];


    $sql = "INSERT INTO product 
            (name, price, category, gender, color, size, quantity)
            VALUES 
            ('$name', '$price', '$category', '$gender', '$color', '$size', '$quantity')";

    if (mysqli_query($link, $sql)) {
        echo "Product added successfully";
    } else {
        echo "Error: " . mysqli_error($link);
    }

header("Location: ../adminpages/admin.html");
}


if (isset($_POST['delete'])) {

    $product_id = $_POST['id'];


    $sql = "DELETE FROM product WHERE product_id = $product_id";

    if (mysqli_query($link, $sql)) {
        echo "Product deleted successfully";
    } else {
        echo "Error: " . mysqli_error($link);
    }
header("Location: ../adminpages/admin.html");    
}

if (isset($_POST['update'])) {

    $id       = $_POST['id'];  
    $name     = $_POST['name'];
    $price    = $_POST['price'];
    $category = $_POST['category'];
    $gender   = $_POST['gender'];
    $color    = $_POST['color'];
    $size     = $_POST['size'];
    $quantity = $_POST['quantity'];
    $description = $_POST['description'];

    $sql = "UPDATE product SET 
                name = '$name',
                price = '$price',
                category = '$category',
                gender = '$gender',
                color = '$color',
                size = '$size',
                quantity = '$quantity',
                description = '$description'
            WHERE product_id = $id";

    if (mysqli_query($link, $sql)) {
        echo "Product updated successfully";
    } else {
        echo "Error: " . mysqli_error($link);
    }

header("Location: ../adminpages/admin.html");
    exit;
}



?>


