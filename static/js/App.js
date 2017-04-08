/**
 * Created by vitolipari on 4/8/17.
 */




var conf;
var socket;

function init(){

	Ajax.play({where: 'config.json'}, start);



}

/**
 *
 * */
var consoleLog = function(args){

	if( arguments.length == 1 ) console.log(args);
	else                        console.log.apply(console, arguments);

	if($('logs')){

		if( arguments.length > 1 ){
			var logText = '';
			var part = arguments[0].split('%c');
			for( var i in part ){
				if( part[i].trim().length > 0 ){
					logText += '<span style="color:#000; '+ arguments[i] +'">' + part[i] + '</span>';
				}
			}

			$('logs').innerHTML += logText + '<br>';
		}
		else{
			var now = new Date();
			if( typeof(arguments[0]) == 'string'  ) $('logs').innerHTML += arguments[0] + '<br>';
			if( typeof(arguments[0]) == 'object'  ) $('logs').innerHTML += JSON.stringify(arguments[0]) + '<br>';
		}
		$('logs').scrollTop = $('logs').scrollHeight;

	}


};


function start(confString){


	try {

		// configurazione
		conf = JSON.parse(confString);
		console.log('Arriva questa configurazione: '+ conf.valueOf());
		console.log('instanzio la websocket');

		// socket = new WebSocketHandler('ws://localhost:1599/LipariStudios/App/TestWebSocket/App.php');
		socket = new WSHandler({
			host : 'localhost',
			port: 1599,
			path: 'LipariStudios/App/TestWebSocket/App.php',
			onOpen : socketOpen,
			onClose : socketClose,
			onError: appOnError
		});
		console.log('play');
		socket.play();
		appOnError( err );
	}



}

function socketClose( e ){
	result = '';
	// console.log(e.code);
	// console.log('socket close app function: '+ e +' '+ e.valueOf() +' '+ JSON.stringify(e) +' \n\n\n'+ JSONstringfy(e) );
	console.log('%c[App]%c connessione chiusa,%c ['+ e.code +'] '+ e.msg, 'font-weight:bold; color:#fff; background:#00d;', 'color:#00d;', 'backgound:#ccc;');
}


function socketOpen( e ){
	result = '';
	console.log('socket open app function: '+ e +' '+ e.valueOf() +' '+ JSON.stringify(e) +' '+ JSONstringfy(e) );
}


function appOnError( e ){
//			console.log('Arriva un throw');
	if( typeof e == 'object' ) consoleLog('%cApp Errore %c['+ e.code +'] '+ e.msg, 'color:#fff; background:#d00; font-weight:bold;', 'color:#fff; background:#f00; font-weight:normal;')
	else if( typeof e == 'string' ) consoleLog('%cApp Errore %c'+ e, 'color:#fff; background:#d00; font-weight:bold;', 'color:#fff; background:#f00; font-weight:normal;');
	else consoleLog('App Errore '+ e.valueOf());


	// console.log('eventPhase: '+ e.eventPhase);
	// console.log('CLOSING: '+ e.target.CLOSING);
	//
	// console.log(e);
	// console.log(e.valueOf());
	// console.log(JSON.stringify(e));
	// result = '';
	// console.log(JSONstringfy(e));

}






var result = '';
function JSONstringfy( jsonObj ){
	result += "{";
	for(var i in jsonObj){
		if(typeof(jsonObj[i]) == "object"){
			result += '"' + i + '": ';
			if( typeof(jsonObj[i]) != 'function' && jsonObj[i].toString().indexOf('function') == -1 ) JSONstringfy(jsonObj[i]);
			else result += "function()";
			result += ",";
		}
		else if( typeof(jsonObj[i]) == 'function' ) result += '"' + i + '": "function",';
		else result += '"' + i + '": "' + jsonObj[i] + '",';
	}
	result = result.substr(0, result.length -1);
	result += "}";
	return result;
}