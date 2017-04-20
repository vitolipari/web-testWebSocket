<?php
/**
 * Created by PhpStorm.
 * User: vitolipari
 * Date: 4/18/17
 * Time: 10:12 PM
 */


/**
 * Class AllWebSocketConnectedHost
 *
 * Il manager gestisce una socket, quindi tutti i dispositivi connessi
 * a questa socket ( identificata dal tipo e dal numero di porta )
 * vengono gestiti da questo manager
 *
 */
class AllWebSocketConnectedHost extends SocketManager implements GenericSocketManager
{


	/**
	 * Crea una tabella ( la forwardTable ) che serve per
	 * avere la corrispondenza fra
	 * l'id del client e l'id della sua connessione
	 *
	 * es.:
	 * +--------+-----------------------+
	 * |    id    |    connessione            |
	 * +--------+-----------------------+
	 * |    1    |    10.20.30.40:53268    |
	 * |    5    |    150.89.0.3:1268        |
	 * +--------+-----------------------+
	 * */
	public function map($id, $con)
	{
		// TODO: Implement map() method.
	}

	public function mapToText()
	{
		// TODO: Implement mapToText() method.
	}

	public function jsonMap()
	{
		// TODO: Implement jsonMap() method.
	}

	public function getForwardTable()
	{
		// TODO: Implement getForwardTable() method.
	}

	public function removeFromMap($con)
	{
		// TODO: Implement removeFromMap() method.
	}

	public function __toString()
	{
		// TODO: Implement __toString() method.
	}

	public function __call($method, $args)
	{
		// TODO: Implement __call() method.
	}

	/**
	 * Viene chiamata quando arriva una nuova connessione
	 * */
	public function newConnection()
	{
		// TODO: Implement newConnection() method.
	}

	/**
	 * Viene chiamata quando una connessione viene rilasciata
	 * */
	public function connectionReleased()
	{
		// TODO: Implement connectionReleased() method.
	}

	/**
	 * Serve per dare la lista degli utenti connessi
	 * */
	public function getPresence()
	{
		// TODO: Implement getPresence() method.
	}

	public function in($data, $connessione)
	{
		// TODO: Implement in() method.
	}

	public function broadcast($msg)
	{
		// TODO: Implement broadcast() method.
	}

	public function out($connessione)
	{
		// TODO: Implement out() method.
	}
}