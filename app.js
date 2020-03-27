new Vue({
   el : "#app",
   data : {
      playerHealth : 100,
      monsterHealth : 100,
      isGameRunning : false,
      turns : []
   },
   methods : {
      startGamming : function () {
         this.playerHealth = 100;
         this.monsterHealth = 100;
         this.isGameRunning = true;
         this.turns=[];
      },
      attack : function (){
         let min = 3;
         let max = 10;
         this.monsterAttacks(min,max);
         this.playerAttacks(min,max);
      },
      specialAttack: function(){
         let min = 7;
         let max = 15;
         this.monsterAttacks(min,max);
         this.playerAttacks(min,max);
      },
      heal : function(){
         let min = 6;
         let max = 12;
         let damage = this.calculateDamage(min,max);
         this.playerHealth = this.playerHealth + damage > 100 ? 100 : this.playerHealth + damage;
         this.turns.unshift({
            isPlayer: true,
            statement : 'Player heals by '+damage
         })
         this.monsterAttacks(min-2,max-2);
      },
      giveUp : function(){
         this.isGameRunning = false;
      },
      monsterAttacks: function(min,max){
         let damage = this.calculateDamage(min,max);
         this.playerHealth -= damage;
         this.turns.unshift({
            isPlayer: false,
            statement : 'Monster hits Player with '+damage
         })
         this.checkWin();
      },
      playerAttacks: function(min,max){
         let damage = this.calculateDamage(min,max);
         this.monsterHealth -= damage;
         this.turns.unshift({
            isPlayer: true,
            statement : 'Player hits Monster with '+damage
         })
         this.checkWin();
      },
      calculateDamage : function(min,max){
         return Math.max(Math.ceil(Math.random() * max),min);
      },
      checkWin: function(){
         if(this.monsterHealth <=0){
            this.monsterHealth=0;
            this.confirmAndRestart('You won');
            return true;
         }else if(this.playerHealth <= 0){
            this.playerHealth=0;
            this.confirmAndRestart('You lost');
            return true;
         }
         return false;
      },
      confirmAndRestart: function(statement){
         if (confirm(statement +"! do you want to play again?")){
            this.startGamming();
         }else{
            this.isGameRunning = false;
         }
      }
   }

});