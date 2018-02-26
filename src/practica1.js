/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {}; //crea un objeto vacio o un objeto que ya haya sido definido en otro fichero javaScript anterior (no se machaca)

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.gs = gs;
	this.msg = 'Memory Game';
	this.cards = new Array(16);
	this.flippedCard = null;
	this.finished = 0;
	this.occupied = false;

	this.initGame = function(){
		var nombreCartas = ["8-ball","potato","dinosaur","kronos","rocket","unicorn","guy","zeppelin"];
		var i = 0;
		var j = 0;
		for (i; i < nombreCartas.length; ++i){
			this.cards[j] = new MemoryGameCard(nombreCartas[i]);
			this.cards[j+1] = new MemoryGameCard(nombreCartas[i]);
			j=j+2;
		}
		this.shuffle(this.cards);
		this.loop();
	};

	this.draw = function(){
		this.gs.drawMessage(this.msg);
		var i = 0;
		for (i; i < this.cards.length; ++i){
			this.cards[i].draw(gs, i);
		}
	};

	/*this.loop = function(){
		var that = this;
		setInterval(function(){that.draw();}, 16);
	};*/

	this.loop = function(){
		setInterval(this.draw.bind(this),16);
	}

	this.onClick = function(cardId){
		if(this.finished == 8){
			this.msg = 'Click F5 to restart';
			}
		else{
			if(!this.occupied && !this.cards[cardId].isFlipped()){
			
				if(this.flippedCard == null){
					this.flippedCard = cardId;
					this.cards[cardId].flip();
				}
				else{
					if (this.cards[cardId].compareTo(this.cards[this.flippedCard].id)){
						this.msg = 'Match found';
						this.cards[cardId].found();
						this.cards[this.flippedCard].found();
						++this.finished;
						if(this.finished == 8){
							this.msg = 'YOU WIN!';
			} 
					}
					else{
						this.msg = 'Try again!';
						this.cards[cardId].flip();
						var cartaV = this.flippedCard;
						var that = this;
						this.occupied = true;
						setTimeout(function(){that.cards[cartaV].flip(); that.cards[cardId].flip();that.occupied=false;}, 1000);
					}
					this.flippedCard = null;
				}
			}
		}
	};

	this.shuffle = function(a) {
    	var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
    };
};


//LO QUE HACE TODO EL RATO NUESTRO BUCLE DE JUEGO ES LLAMAR TODO EL RATO A DRAW
/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

	var EstadosCarta = {bocaAbajo:0, bocaArriba:1, encontrada:2};

	this.estado = EstadosCarta.bocaAbajo;
	this.id = id;

	this.flip = function(){
		if (this.estado == EstadosCarta.bocaAbajo){
			this.estado = EstadosCarta.bocaArriba;
		}
		else if (this.estado == EstadosCarta.bocaArriba){
			this.estado = EstadosCarta.bocaAbajo;
		}
	};

	this.found = function(){
		this.estado = EstadosCarta.encontrada;
	};

	this.isFlipped = function(){
		return this.estado == EstadosCarta.encontrada || this.estado == EstadosCarta.bocaArriba;
	}
	this.compareTo = function(otherCard){
		return this.id == otherCard;
	};

	this.draw = function(gs, pos){
		if (this.estado == EstadosCarta.bocaAbajo) gs.draw("back", pos);
		else gs.draw(this.id, pos);
	};
}
};
