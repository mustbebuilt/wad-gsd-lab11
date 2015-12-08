<?php
require('../../../../includes/conn.inc.php'); 
$queryScores = "SELECT gameScore, gamePlayer FROM snakeGame ORDER BY gameScore DESC";
$resultScores = $mysqli->query($queryScores);
$returnAr = array();
while ($rowScores = $resultScores->fetch_assoc()) {
	array_push($returnAr, array('dbPlayer'=>$rowScores['gamePlayer'], 'dbScore'=>$rowScores['gameScore']));
}
?>