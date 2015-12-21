<?php

	$name = $_POST['project-name'];
	$data = array();

	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заполните имя!';
	} else {
		$data['status'] = 'OK';
		$data['text'] = 'Имя заполнено.';
	}

	header('Content-Type: application/json');
	echo json_encode($data);
	exit;

?>