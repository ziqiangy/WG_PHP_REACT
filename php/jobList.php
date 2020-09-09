<?php
include('config_local.php');
include('DB.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql="SELECT `my_id` AS `id`, `quote_name` AS `job` FROM `jobs` ORDER BY `quote_name`";
$pdo = new Db;
$pdo_obj = $pdo ->pdo();
$pdostat = $pdo_obj->query($sql);
$data_matrx = $pdostat->fetchAll(PDO::FETCH_ASSOC);

if($data_matrx){
    echo json_encode($data_matrx);
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No items found.")
    );
}