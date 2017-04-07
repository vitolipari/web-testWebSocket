<?php
/**
 * Created by PhpStorm.
 * User: vitolipari
 * Date: 4/5/17
 * Time: 11:34 PM
 */






error_reporting(E_ALL);

use \Frameworks\LipariStudios\Socket\ServerSocket;

echo 'start' .chr(10);
//require_once dirname(__FILE__) . '/../../../../LipariStudios/framework/liparistudios/core/Socket/ServerSocket.php';


require_once 'ChatManager.php';
require_once 'ControlManager.php';
require_once 'MonitorSocketManager.php';
require_once dirname(__FILE__) .'/../app.conf.php';


echo 'request WebSocketClass done' .chr(10);

$monitor        = new MonitorSocketManager();

$wSocket = new ServerSocket();

$wSocket->open(CHAT_PORT,       WEBSOCKET_CONNECTION_TYPE,  new ChatManager());
$wSocket->open(CONTROLLER_PORT, TELNET_CONNECTION_TYPE,     new ControlManager());
$wSocket->open(MONITOR_PORT,    TELNET_CONNECTION_TYPE,     $monitor);

$monitor->setServerSocketReference($wSocket);

$wSocket->play();
