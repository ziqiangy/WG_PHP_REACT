<?php

include('config_local.php');
include('DB.php');
include('Pagination.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/**
 * prepared queries from database views
 */
//query:timeclock_qb_payroll
$query_time_clock_qb_payroll = "select `j`.`quote_name` AS `Job`,concat(`w`.`firstname`,' ',`w`.`lastname`) AS `Name`,date_format(`i`.`call_date`,'%Y-%m-%d') AS `Date`,round((time_to_sec(`i`.`labor_time`) / (60 * 60)),2) AS `Hours`,if((`jc`.`type_id` = 1),'regular',if((`jc`.`type_id` = 2),'overtime','regular')) AS `Reg_OT`,`q`.`Name` AS `Cost_Code` from ((((`timeclock` `i` join `workers` `w` on((`i`.`workerid` = `w`.`workerid`))) left join `jobs` `j` on((`i`.`job_id` = `j`.`my_id`))) left join `job_costcodes` `jc` on((`i`.`punch_id` = `jc`.`time_id`))) left join `qb_items` `q` on((`q`.`QBO_Id` = `jc`.`costcode_id`))) where ((`i`.`status_id` = 1) and (`i`.`labor_time` is not null) and (`i`.`type_id` = 2))";
//query:timeclock_non_qb_payroll
$query_time_clock_non_qb_payroll = "select `j`.`quote_name` AS `Job`,concat(`w`.`firstname`,' ',`w`.`lastname`) AS `Name`,date_format(`i`.`call_date`,'%Y-%m-%d') AS `Date`,round((time_to_sec(`i`.`labor_time`) / (60 * 60)),2) AS `Hours`,if((`jc`.`type_id` = 1),'regular',if((`jc`.`type_id` = 2),'overtime','regular')) AS `Reg_OT`,`nq`.`Name` AS `Cost_Code` from ((((`timeclock` `i` join `workers` `w` on((`i`.`workerid` = `w`.`workerid`))) left join `jobs` `j` on((`i`.`job_id` = `j`.`my_id`))) left join `job_costcodes` `jc` on((`i`.`punch_id` = `jc`.`time_id`))) left join `non_qb_items` `nq` on((`nq`.`my_id` = `jc`.`costcode_id`))) where ((`i`.`status_id` = 1) and (`i`.`labor_time` is not null) and (`i`.`type_id` = 2))";


/**
 * time clock query prepare
 */
$where_time_clock = array();
$query_time_clock = "";
if ($QB_on) {
    $query_time_clock = $query_time_clock_qb_payroll;
} else {
    $query_time_clock = $query_time_clock_non_qb_payroll;
}
if (isset($_POST["ptr_starting_date"]) && !empty($_POST["ptr_starting_date"])) {
    array_push($where_time_clock, " AND ( `i`.`call_date` >= '" . $_POST["ptr_starting_date"] . "' )");
}
if (isset($_POST["ptr_ending_date"]) && !empty($_POST["ptr_ending_date"])) {
    array_push($where_time_clock, " AND ( `i`.`call_date` <= '" . $_POST["ptr_ending_date"] . "' )");
}
if (isset($_POST["ptr_worker"]) && !empty($_POST["ptr_worker"])) {
    array_push($where_time_clock, " AND ( `i`.`workerid` = '" . $_POST["ptr_worker"] . "' )");
}
if (isset($_POST["ptr_job"]) && !empty($_POST["ptr_job"])) {
    array_push($where_time_clock, " AND ( `j`.`my_id` = '" . $_POST["ptr_job"] . "' )");
}

if ($where_time_clock) {
    foreach ($where_time_clock as $value) {
        $query_time_clock .= $value;//time clock query ready to run
    }
}


$pageAt = 1;
$limitPerPage = 10;


$timeClock = new Pagination($query_time_clock, $pageAt, $limitPerPage);


//var_dump($timeClock->getPageOptions());
//var_dump($timeClock->getSql());

$pdo_time_clock = new Db;

$data_time_clock = $pdo_time_clock->pdo()->query($timeClock->getSql())->fetchAll(PDO::FETCH_ASSOC);

$pagination_time_clock = $timeClock->getPageOptions();


$data_matrx = array();

if ($data_time_clock) {
    array_push($data_matrx, ["data_time_clock" => $data_time_clock]);
}


if($pagination_time_clock){
    array_push($data_matrx, ["pagination_time_clock" => $pagination_time_clock]);
}


if ($data_matrx) {
    echo json_encode($data_matrx);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No items found.")
    );
}