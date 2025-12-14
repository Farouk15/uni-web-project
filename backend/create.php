<?php
require_once "app.php"; 


    $username = $_POST['username'];     
    $email = $_POST['email'];          
    $number = $_POST['phone_no'];       
    $password = $_POST['password'];      

    $sql = "INSERT INTO customer (fisrt_name, email, number, password) 
            VALUES ('$username', '$email', '$number', '$password')";

    if(mysqli_query($link, $sql)){
        echo "Signup successful!";
    } else {
        echo "Error: " ;
    }


    

?>
