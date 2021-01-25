class Game {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      car1 = createSprite(100,200);
      car2 = createSprite(300,200);
      car3 = createSprite(500,200);
      car4 = createSprite(700,200);
      car1.addImage(car1IMG);
      car2.addImage(car2IMG);
      car3.addImage(car3IMG);
      car4.addImage(car4IMG);
      cars = [car1,car2,car3,car4]
      car1.debug = true;
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
  
      if(allPlayers !== undefined){
        background("brown");
        image(track, 0, -4*displayHeight, displayWidth, 5*displayHeight);
        //var display_position = 130;
        var index = 0;
        var x = 175;
        var y;
        var move;

        for(var plr in allPlayers){
          index = index + 1;
          x = x+250;
          y = displayHeight - allPlayers[plr].distance;
          move = allPlayers[plr].move;
          cars[index-1].x = x+move;
          cars[index-1].y = y;

          car1.collide(car2);
          car1.collide(car3);
          car1.collide(car4);
          car2.collide(car3);
          car2.collide(car4);
          car3.collide(car4);

          if(index === player.index){
            cars[index - 1].shapeColor = "red";
            stroke(10);
            fill("red");
            ellipse(x+move, y, 60, 60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10;
        player.update();
      }

      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.move-=5;
        player.update();
      }

      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.move+=5;
        player.update();
      }

      if(player.distance > 4200){
        gameState=2;
        player.rank+=1;
        Player.updateCarsAtEnd(player.rank);
      }
      drawSprites();
    }
  }

  end(){
    console.log("Game Over");
  }

  rank(){
    console.log(player.rank);
  }
}