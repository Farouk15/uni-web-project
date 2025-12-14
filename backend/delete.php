<?php
require_once "app.php"; 

// DELETE
if (isset($_POST['delete'])) {

    $product_id = $_POST['product_id'];


    $sql = "DELETE FROM product WHERE product_id = $product_id";

    if (mysqli_query($link, $sql)) {
        echo "Product deleted successfully";
    } else {
        echo "Error: " . mysqli_error($link);
    }
    header("Location:../adminpages/admin.html");
    
}
?>
