/**
 * Created by vitolipari on 4/8/17.
 */




var conf;
var socket;

function init(){

	Ajax.play({where: 'config.json'}, start);



}

/**
 * Scive sia in nella console che dentro un
 * div con id logs<br>
 * I testi inseriti faranno scorrere i log in alto
 * come una console bash
 *
 *
 * @param args
 */
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

/**
 *
 * @param confString
 */
function start(confString){


	try {


		/*
		 *
		 */
		window.onbeforeunload = function(){
			if(typeof(socket.con) != 'undefined'){
				// socket.con.onclose = function(){}; // disabilito la chiamata
				socket.close();
			}
		};




		// configurazione
		conf = JSON.parse(confString);
		console.log('Arriva questa configurazione: ' + conf.valueOf());
		console.log('instanzio la websocket');



		//####################################################################
		//////////////////////////////////////////////////////////////////////
		//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
		//--------------------------------------------------------------------
		//====================================================================
		// 			GUARDAMI ATTENZIONE IMPORTANTE incompleto, lasciato a meta
		//====================================================================
		//--------------------------------------------------------------------
		//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
		//////////////////////////////////////////////////////////////////////
		//####################################################################



		// get The Remote IP
		Ajax.play({
			par:{act:'getTheRemoteIP'},
			where : conf.eventServer
		},function(melonString){
			var melon = JSON.parse(melonString);

			conf.chatManagerServer = melon.servername;

			consoleLog('Trigger a ' + conf.chatManagerServer + conf.pathToChatServer + conf.chatSocket);

			// IMPORTANTE trigger
			// Ajax.play({where : 'http://' + conf.chatManagerServer + conf.pathToChatServer + conf.chatSocket});
			// Ajax.play({where : conf.baseURL + conf.chatSocket});




			socket = new WSHandler({
				server : {
					host: 'localhost',
					port: 1599,
					path: 'LipariStudios/App/TestWebSocket/App.php'
				},
				callback : {
					onOpen: socketOpen,
					onClose: socketClose,
					onError: appOnError
				},
				trigger : true
			});
			console.log('play');

			// sicuramente non serve !
			// Ajax.req.abort();

			socket.play();

			// this.init( setObj );
		});




	}
	catch(err){
		appOnError( err );
	}



}


/**
 *
 * @param e
 */
function socketClose( e ){
	result = '';
	// console.log(e.code);
	// console.log('socket close app function: '+ e +' '+ e.valueOf() +' '+ JSON.stringify(e) +' \n\n\n'+ JSONstringfy(e) );
	console.log('%cconnessione chiusa,%c ['+ e.code +'] %c'+ e.msg, 'font-weight:bold; color:#fff; background:#358;', 'color:#358;', 'backgound:#ccc;');
}


/**
 *
 * @param e
 */
function socketOpen( e ){
	result = '';
	console.log('socket open app function: '+ e +' '+ e.valueOf() +' '+ JSON.stringify(e) +' '+ JSONstringfy(e) );
}


/**
 *
 * @param e
 */
function appOnError( e ){
//			console.log('Arriva un throw');
	if( typeof e == 'object' ) consoleLog('%cErrore %c['+ e.code +'] '+ e.msg, 'color:#fff; background:#d00; font-weight:bold;', 'color:#fff; background:#f00; font-weight:normal;')
	else if( typeof e == 'string' ) consoleLog('%cErrore %c'+ e, 'color:#fff; background:#d00; font-weight:bold;', 'color:#fff; background:#f00; font-weight:normal;');
	else consoleLog('Errore '+ e.valueOf());


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