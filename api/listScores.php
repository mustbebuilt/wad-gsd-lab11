<?php
//ini_set('display_errors', 1);
require('../includes/conn.inc.php'); 
$sql = "SELECT gameScore, gamePlayer FROM snakeGame ORDER BY gameScore DESC";
$stmt = $pdo->query($sql);
$returnAr = array();
while ($row =$stmt->fetchObject()) {
	array_push($returnAr, array('dbPlayer'=>$row->gamePlayer, 'dbScore'=>$row->gameScore));
}
?>