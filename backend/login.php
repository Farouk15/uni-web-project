<?php
require_once 'app.php';


$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$sql = "SELECT * FROM customer WHERE email='$email' AND password='$password'";
$result = mysqli_query($link, $sql);

if ($result && mysqli_num_rows($result) === 1) {
        header("Location: http://localhost/uni-web-project/index.html");

    echo "Done";
} else {
    echo "Try again";
}
?>
