<?php
	$myFile = "tickets1.json";
	$fh = fopen($myFile, 'w') or die("Não foi possivel continuar");
	$stringData = $_POST["data"];
	fwrite($fh, $stringData);
	fclose($fh)
?>