/**
 * @author:	LipariStudios
 * @mail: vitolipari81@gmail.com
 * @modified: 2017.04.09
 * @version: 1.2
 * @github:	https://github.com/vitolipari/web-testWebSocket
 *
 */

/**
 * WebSocket Wrapper
 * WebSocket Handler
 * 
 *
 * @param setObj
 * @constructor
 */
var WSHandler = function(setObj) {
	wrapper = this;

	/**
	 * Eventi di chiusura della connessione
	 *
	 * https://developer.mozilla.org/it/docs/Web/API/CloseEvent
	 * code			name					descr.
	 * ------------------------------------------------------------------------------------------------------------------------------------
	 * 0–999	 	RESERVED				Riservati e non usati.
	 * 1000			CLOSE_NORMAL			Chiusura normale; la connessione si è conclusa normalmente, qualsiasi fosse il suo scopo.
	 * 1001			CLOSE_GOING_AWAY		L'endpoint se ne è andato, o per un errore del server oppure perché la pagina che ha aperto la
	 * 										connessione non è più attiva.
	 * 1002			CLOSE_PROTOCOL_ERROR	L'endpoint ha terminato la connessione per un errore di protocollo.
	 * 1003			CLOSE_UNSUPPORTED		La connessione è stata terminata perché l'endpoint ha ricevuto dei dati che non può accettare
	 * 										(per esempio, dati binari a fronte di un endpoint che consuma solo testo).
	 * 1004	 		RESERVED				Riservato. In futuro potrebbe esserne rivelato l'uso.
	 * 1005			CLOSE_NO_STATUS			Riservato. Indica che non è stato ricevuto nessuno stato di chiusura sebbene fosse atteso.
	 * 1006			CLOSE_ABNORMAL			Riservato. Usato per indicare che la connessione è stata chiusa in modo anomalo (cioè, cioè senza
	 * 										l'invio del frame di chiusura) dove invece era atteso un codice di chiusura.
	 * 1007	 		INCONSISTENT_DATA		L'endpoint ha terminato la connessione perché ha ricevuto un messaggio con dati inconsistenti
	 * 										(per esempio, dati non-UTF-8 all'interno di un messaggio testuale).
	 * 1008	 		GENERIC					L'endpoint ha terminato la connessione perché ha ricevuto un messaggio che viola la sua politica.
	 * 										E' un codice generico, quando 1003 e 1009 non sono adatti.
	 * 1009			CLOSE_TOO_LARGE			L'endpoint ha terminato la connessione perché ha ricevuto un frame di dati troppo grande.
	 * 1010	 		NO_DEAL					Il client ha terminato la connessione perché era attesa una negoziazione di una o più "estensioni"
	 * 										del protocollo che però non è avvenuta.
	 * 1011	 		EXPECTED_CONDICTION		Il server ha terminato la connessione perché ha incontrato una condizione inattesa che gli ha
	 * 										impedito di completare la richiesta.
	 * 1012–1014	RESERVED				Riservati per usi futuri dallo standard WebSocket.
	 * 1015	 		RESERVED				Riservato. Indica che la connessione è stata chiusa a causa di un fallimento dell'handshake TLS
	 * 										(per esempio, il certificato del server non può essere verificato).
	 * 1016–1999	RESERVED				Riservati per usi futuri dallo standard WebSocket.
	 * 2000–2999	RESERVED				Riservati per estensioni WebSocket.
	 * 3000–3999	CUSTOM					Disponibili per librerie e framework. Meglio non usarli nelle applicazioni.
	 * 4000–4999	CUSTOM					Disponibili per essere utilizzati dalle applicazioni.
	 *
	 */
	wrapper.throwable = {
		CLOSE_NORMAL : 			{code: 1000, msg: 'la connessione si è conclusa normalmente'},
		CLOSE_GOING_AWAY : 		{code: 1001, msg: 'L\'endpoint se ne è andato'},
		CLOSE_PROTOCOL_ERROR :	{code: 1002, msg: 'L\'endpoint ha terminato la connessione per un errore di protocollo'},
		CLOSE_UNSUPPORTED :		{code: 1003, msg: 'La connessione è stata terminata perché l\'endpoint ha ricevuto dei dati che non può accettare'},
		CLOSE_NO_STATUS :		{code: 1005, msg: 'Non è stato ricevuto nessuno stato di chiusura sebbene fosse atteso'},
		CLOSE_ABNORMAL :		{code: 1006, msg: 'La connessione è stata chiusa in modo anomalo (cioè, cioè senza l\'invio del frame di chiusura)'},
		INCONSISTENT_DATA :		{code: 1007, msg: 'L\'endpoint ha terminato la connessione perché ha ricevuto un messaggio con dati inconsistenti'},
		GENERIC : 				{code: 1008, msg: 'L\'endpoint ha terminato la connessione perché ha ricevuto un messaggio che viola la sua politica'},
		CLOSE_TOO_LARGE : 		{code: 1009, msg: 'L\'endpoint ha terminato la connessione perché ha ricevuto un frame di dati troppo grande'},
		NO_DEAL :				{code: 1010, msg: 'Il client ha terminato la connessione perché era attesa una negoziazione di una o più "estensioni" del protocollo che però non è avvenuta'},
		EXPECTED_CONDICTION :	{code: 1011, msg: 'Il server ha terminato la connessione perché ha incontrato una condizione inattesa che gli ha impedito di completare la richiesta'},

		//	errori della classe
		URL_INVALID :			{code: 3401, msg:'La stringa passata nell init non fa il match'},
		CLOSING_CODE :			{code: 3402, msg:'In chiusura'}
	};


	con = null;
	host = '';
	port = 0;
	serverPath = '';


	setObj = setObj || {};
	wrapper.init(setObj);

};


/**
 *
 * viene inizializzato il wrapper ( o l'handler )
 * in ingresso viene accettato o una stringa valida che
 * rappresenti l'url della socket sul lato server
 * o un oggetto parametrizzato come descritto nel parametro
 *
 *
 * @param setObj
 * 		- String
 * 			indica l'url della socket nel seguente formato
 * 				ws://<host>:<port>/<path>
 * 				host: un nome host valido ( myserver.com, 192.168.1.101, ecc.. )
 * 				port: un numero intero compreso nel range 1025 - 999999
 * 				path: il path dove viene gestita la websocket
 *
 * 			es.:
 * 				"ws://url-123_abc.def.dom:123456/path/for/socket"
 *
 * 		- JsonObject
 * 			un oggetto json che includa i parametri necessari,
 * 			composto nel seguente formato
 * 				{
 * 					"host" 		: <String>,		//	obbligatorio
 * 					"port" 		: <int>,		//	obbligatorio
 * 					"path" 		: <String>,		//	obbligatorio
 * 					"id" 		: <String>,
 * 					"onOpen" 	: <function>,
 *				 	"onClose" 	: <function>,
 *				 	"onMessage" : <function>,
 *				 	"onError" 	: <function>,
 *				 	"send" 		: <function>,
 *				 	"onSent" 	: <function>
 * 				}
 *
 * 			parametri
 * 				host 		: 	host ( server )
 * 				port 		: 	porta di connessione alla socket
 * 				path 		: 	percorso per la gestione della socket
 * 				id 			: 	identificativo della websocket
 * 				onOpen 		: 	callBack chiamata dopo l'apertura della connessione,
 * 								avviene dopo che l'handshake e andato a buon fine
 *				onClose 	: 	callBack chiamata dopo la chiusura della connessione
 *				onMessage 	: 	callBack chiamata dopo la ricezione di dati dal server
 *				onError 	: 	callBack chiamata dopo che si e verificato un errore
 *				send 		: 	invio di dati invocato da una chiamata esterna
 *								( dall'app che sta usando questo wrapper/handler )
 *				onSent	 	: 	callBack chiamata dopo l'invio al server di dati
 */
WSHandler.prototype.init = function(setObj){


	/*
	L'idea è quella che si possa passare una stringa
	che rappresenti l'url
	 */
	if( typeof setObj == 'string' && setObj.length > 10 ){
		var pathExcludePattern = /^ws:\/\/[a-zA-Z0-9._-]+:[0-9]{1,6}\//g;
		if( setObj.match(pathExcludePattern) != 'undefined' && setObj.match(pathExcludePattern) != null ){
			var portPattern = /:[0-9]{2,6}/g;
			wrapper.host 		= setObj.substring( 'ws://'.length, setObj.indexOf(setObj.match(portPattern)) );
			wrapper.port 		= parseInt( setObj.match(portPattern).toString().substr(1), 10);
			wrapper.serverPath = '/' + setObj.substr( (setObj.match(pathExcludePattern)).toString().length );
		}
		else{
			wrapper.onError( wrapper.throwable.URL_INVALID );
		}
	}
	else if( JSON.stringify({}) !== JSON.stringify(setObj) && Object.keys(setObj).length > 0 ){

		wrapper.host = setObj.host			||	wrapper.host;
		wrapper.port = setObj.port			||	wrapper.port;
		wrapper.serverPath = setObj.path	||	wrapper.path;

		// listeners e callback esterni
		wrapper.onOpenCallback		=	setObj.onOpen		||	null;
		wrapper.onCloseCallback	=	setObj.onClose		||	null;
		wrapper.onMsgCallback		=	setObj.onMessage	||	null;
		wrapper.onErrCallback		=	setObj.onError		||	null;
		wrapper.onSentCallback		=	setObj.onSent		||	null;
		wrapper.beforeSend		=	setObj.send		||	null;


		console.log('imposto websocket chiusa, la callback esterna ('+ (typeof wrapper.onCloseCallback) +')');


	}
	else if(
		JSON.stringify({}) == JSON.stringify(setObj) ||
		Object.keys(setObj).length == 0
	){
		// oggetto vuoto

	}






};

/**
 * 
 * @param setObj
 */
WSHandler.prototype.play = function(setObj){



	setObj = setObj || {};
	wrapper.init(setObj);

	var serverSocketUrl = "ws://" + wrapper.host + ":" + wrapper.port +'/'+ wrapper.serverPath;

	try {

		con = new WebSocket( serverSocketUrl );

		con.onopen 		= wrapper.handShaked;
		con.onclose 	= wrapper.closed;
		con.onmessage 	= wrapper.onMessage;
		con.onerror 	= wrapper.onError;

	}
	catch ( err ){
		console.log('catch del play');
		wrapper.onError( err );
	}


};


/**
 *
 * @param data
 */
WSHandler.prototype.beforeSend = function( data ){




};


/**
 *
 * @param e
 */
WSHandler.prototype.onSent = function( e ){

};

WSHandler.prototype.handShaked = function( e ){
	console.log('%c[WebSocket]%c connessione aperta,%c '+ e.valueOf(), 'font-weight:bold; color:#000; background:#0f0;', 'color:#0d0;', 'backgound:#ccc;');

	
	if( typeof wrapper.onOpenCallback == 'function' ) wrapper.onOpenCallback( e );
};


WSHandler.prototype.closed = function( e ){


	for( var i in wrapper.throwable ){
		if( wrapper.throwable[i].code == e.code ){
			e.msg = wrapper.throwable[i].msg;
		}
	}

	console.log('%c[WebSocket]%c connessione chiusa,%c ', 'font-weight:bold; color:#fff; background:#00d;', 'color:#00d;', 'backgound:#ccc;');
	if( typeof wrapper.onCloseCallback == 'function' ) wrapper.onCloseCallback( e );
};


WSHandler.prototype.onMessage = function( m ){
	console.log('%c[WebSocket]%c dati in ingresso,%c '+ e.valueOf(), 'font-weight:bold; color:#000; background:#0f0;', 'color:#0d0;', 'backgound:#ccc;');


	if( typeof wrapper.onMsgCallback == 'function' ) wrapper.onMsgCallback( m );
};


WSHandler.prototype.onError = function( e ){

	if(
		typeof( e.target ) != 'undefined' &&
		e.target != null &&
		typeof( e.eventPhase ) != 'undefined' &&
		e.eventPhase != null
	){
		for( var i in e.target ){
			if( e.target[i] == e.eventPhase ){
				e.code = wrapper.throwable.CLOSING_CODE.code;
				e.msg = wrapper.throwable.CLOSING_CODE.msg;
			}
		}
	}


	// +' '+ JSON.stringify(e) +' '+ JSONstringfy(e)
	console.log('%c[WebSocket]%c errore %c '+ ( e.code  ) + ' '+ e.msg , 'font-weight:bold; color:#f00;', 'color:#d00;', 'backgound:#ccc; color:#f00;');

	if( typeof wrapper.onErrCallback == 'function' ) wrapper.onErrCallback( e );
};

