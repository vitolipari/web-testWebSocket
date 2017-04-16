<?php
/**
 * Created by PhpStorm.
 * User: vitolipari
 * Date: 4/12/17
 * Time: 7:44 PM
 */




error_reporting(E_ALL);
//header('Access-Control-Allow-Origin: *');

$act    = $_POST['act'];
$moment = $_SERVER['REQUEST_TIME'];


test();


require_once 'config.php';



// in arrivo =================================================
//if( $act == 'getRemoteInfo' ) getRemoteInfo();


function test()
{
	$melon = json_encode(array(
		'ip' => gethostbyname(gethostname()),
		'servername' => $_SERVER['SERVER_NAME'],
		'host' => $_SERVER['HTTP_HOST'],
		'hostname' => gethostname(),
		'origin' => $_SERVER['HTTP_ORIGIN'],
//		'post'			=> $_POST,
//		'get'			=> $_GET,
//		'server'		=> $_SERVER
	));
	header('Content-Type: application/json');
	echo $melon;
//	return null;
}


/**
 * Invia all'output un json
 * con le informazioni sulla
 * raggiungibilità del server
 * 
 * @return null
 */
function getRemoteInfo(){

	$melon = json_encode(array(
		'ip' 			=> gethostbyname( gethostname() ),
		'servername' 	=> $_SERVER['SERVER_NAME'],
		'host' 			=> $_SERVER['HTTP_HOST'],
		'hostname' 		=> gethostname(),
		'origin' 		=> $_SERVER['HTTP_ORIGIN']
	));
	header('Content-Type: application/json');
	echo $melon;
//	return null;

}