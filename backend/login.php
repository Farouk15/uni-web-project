<?php
require_once 'app.php'; 

$email    = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM customer WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo "Done, login successful";
} else {
    echo "Try again";
}
