<?php
/**
 * Created by PhpStorm.
 * User: vitolipari
 * Date: 04/03/17
 * Time: 7:26 PM
 */


error_reporting(E_ALL);

// quanto scassi la minchia!!!
header('Access-Control-Allow-Origin: *');


echo 'start' . chr(10);
require_once dirname(__FILE__) . '/../framework/liparistudios/core/Socket/ServerSocket.php';
require_once 'ChatManager.php';
require_once 'ControlManager.php';
require_once 'MonitorSocketManager.php';
require_once dirname(__FILE__) . '/../app.conf.php';


echo 'request WebSocketClass done' . chr(10);

try {

	$monitor = new MonitorSocketManager();

	$wSocket = new ServerSocket();

	echo chr(10) . '------------------------------' . chr(10) . 'apro le porte ' . chr(10) . '------------------------------' . chr(10);
	$wSocket->open(CHAT_PORT, WEBSOCKET_CONNECTION_TYPE, new ChatManager());
	$wSocket->open(CONTROLLER_PORT, TELNET_CONNECTION_TYPE, new ControlManager());
	$wSocket->open(MONITOR_PORT, TELNET_CONNECTION_TYPE, $monitor);

	$monitor->setServerSocketReference($wSocket);

	$wSocket->play();


} catch (Exception $e) {
	echo 'eccezione';
}