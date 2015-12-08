<?php
header('Content-Type: application/json');
require('../../../../includes/conn.inc.php'); 
// Add SQL
$sql = "---- ADD SQL --------";
$highScoreQuery = $mysqli->query($sql);
$highScoreRow = $highScoreQuery->fetch_assoc();
$returnAr = array('highScore' => $highScoreRow['highScore']);
echo json_encode($returnAr);
?>