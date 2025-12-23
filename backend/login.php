<?php
require_once 'app.php';
session_start();

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$sql = "SELECT * FROM customer WHERE email='$email' AND password='$password'";
$result = mysqli_query($link, $sql);

if ($result && mysqli_num_rows($result) === 1) {
    $user = mysqli_fetch_assoc($result);
    $_SESSION['user_id'] = $user['customer_id'];
    echo json_encode(['success' => true, 'user_id' => $user['customer_id']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}


