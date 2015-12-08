<?php
header('Content-Type: application/json');
require('../../../../includes/conn.inc.php'); 
$playerScore =  filter_var($_POST['playerScore'], FILTER_VALIDATE_INT);
$playerEmail = filter_var($_POST['playerEmail'], FILTER_VALIDATE_EMAIL);
$stmt = $mysqli->prepare("SELECT ID FROM snakeGame WHERE gamePlayer = ?");
$stmt->bind_param('s', $playerEmail);
$stmt->execute();
$stmt->bind_result($ID);
$stmt->store_result();
$numRows = $stmt->num_rows;
$stmt->fetch();
// 1. UPSERT based on $numRows

// 2. Query logic from listscore.php

?>