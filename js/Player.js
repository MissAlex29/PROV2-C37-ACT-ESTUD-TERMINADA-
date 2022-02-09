class Player {
  constructor() {
    this.name = null; //Guarda el nombre del jugador
    this.index = null; //Da una identificación única a cada jugador
    //Almacena la posición x e y de cada jugador
    this.positionX = 0; 
    this.positionY = 0; 
  }
  //Dar posición ajugador ya actualizarlo en BD.
  addPlayer(){
    //Esto crea una jerarquía de jugadores en la base de datos
    var playerIndex = "players/player" + this.index;
    //Condición que da posición a los jugares desde el centro
    if(this.index === 1){
      //Uno a la izquierda 
      this.positionX = width/2-100;
    }
    else{
      //El otro a la derecha
      this.positionX = width/2+100;
    }
    //Actualizamos la info en base de datos
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }
  //Actualizamos el campo playerCount en la base de datos 
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }
  //Leemos el valor y lo guardamos en una variable 
  updateCount(count) {
    //.update almacena el valor de la variable EN LA BASE DE DATOS 
    //La diagonal se usa para hacer referencia al directorio raiz
    database.ref("/").update({
      playerCount: count
    });
  }

  //Obtener información de los jugadores 
  static getPlayersInfo() {
    //Obtener info. de la base de datos con .ref
    var playerInfoRef = database.ref("players");
    //Escucha los cambios y actualiza 
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
