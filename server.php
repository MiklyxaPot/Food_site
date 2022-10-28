<?php
$_POST = json_decode(file_get_contents("php://input"), true);//эта строчка позволяла работать только с json
echo var_dump($_POST);