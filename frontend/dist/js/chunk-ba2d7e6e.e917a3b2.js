(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba2d7e6e"],{"0257":function(e,t,i){"use strict";i("b0f6")},6544:function(e,t,i){"use strict";i.r(t);var n=i("7a23");const c={class:"morpion"},a=Object(n["m"])("Morpion"),s={key:0},o=Object(n["m"])(" En attente d'un autre joueur... "),l=Object(n["m"])(" Annuler "),r={key:1,class:"grid-wrapper"},h={class:"end-game"},d=Object(n["m"])(" Rejouer "),b=Object(n["m"])(" Quitter la partie ");function j(e,t,i,j,O,u){const m=Object(n["R"])("n-h1"),g=Object(n["R"])("n-spin"),y=Object(n["R"])("n-alert"),p=Object(n["R"])("n-button"),k=Object(n["R"])("n-collapse-transition"),f=Object(n["R"])("grid"),w=Object(n["R"])("n-result");return Object(n["I"])(),Object(n["k"])("div",c,[Object(n["n"])(m,null,{default:Object(n["bb"])(()=>[a]),_:1}),O.isReady?(Object(n["I"])(),Object(n["k"])("div",r,[""===e.outcome?(Object(n["I"])(),Object(n["i"])(f,{key:0})):Object(n["j"])("",!0),Object(n["n"])(k,{show:""!==e.outcome},{default:Object(n["bb"])(()=>[Object(n["l"])("div",h,[Object(n["n"])(w,{status:u.statusEndGame,title:u.titleEndGame,description:u.descriptionEndGame},{footer:Object(n["bb"])(()=>[e.host&&e.outcome?(Object(n["I"])(),Object(n["i"])(p,{key:0,onClick:t[1]||(t[1]=e=>u.restartGame())},{default:Object(n["bb"])(()=>[d]),_:1})):(Object(n["I"])(),Object(n["i"])(g,{key:1,size:"medium"}))]),_:1},8,["status","title","description"])])]),_:1},8,["show"]),Object(n["n"])(p,{onClick:t[2]||(t[2]=e=>u.quitRoomConfirm(u.quitRoom)),class:"quit-button"},{default:Object(n["bb"])(()=>[b]),_:1})])):(Object(n["I"])(),Object(n["k"])("div",s,[Object(n["n"])(k,{class:"waiting-card",show:O.displayWaitingCard},{default:Object(n["bb"])(()=>[Object(n["n"])(y,{type:"success"},{icon:Object(n["bb"])(()=>[Object(n["n"])(g,{size:"small"})]),default:Object(n["bb"])(()=>[o]),_:1}),Object(n["n"])(p,{onClick:t[0]||(t[0]=e=>u.quitRoom())},{default:Object(n["bb"])(()=>[l]),_:1})]),_:1},8,["show"])]))])}i("14d9");var O=i("5502");const u={cellspacing:"0",cellpadding:"0"},m={class:"case-h case-v"},g={key:0,class:"circle"},y={key:1,class:"cross"},p={key:0,class:"circle"},k={key:1,class:"cross"},f={key:0,class:"circle"},w={key:1,class:"cross"},v={class:"case-h case-v"},I={key:0,class:"circle"},R={key:1,class:"cross"},C={key:0,class:"circle"},_={key:1,class:"cross"},L={key:0,class:"circle"},V={key:1,class:"cross"},z={class:"case-h case-v"},M={key:0,class:"circle"},q={key:1,class:"cross"},D={key:0,class:"circle"},H={key:1,class:"cross"},P={key:0,class:"circle"},B={key:1,class:"cross"};function W(e,t,i,c,a,s){const o=Object(n["R"])("n-collapse-transition");return Object(n["I"])(),Object(n["k"])("div",null,[Object(n["n"])(o,{show:a.displayGrid,appear:""},{default:Object(n["bb"])(()=>[Object(n["l"])("table",u,[Object(n["l"])("tbody",null,[Object(n["l"])("tr",m,[Object(n["l"])("td",{class:Object(n["y"])(["cell h-1 w-1",{"h-0-0":a.lineHorizontalTop,"v-0-0":a.lineVerticalLeft,"db-0-0":a.lineDiagonalBack}]),onClick:t[0]||(t[0]=e=>s.placeItem(0,0))},["O"===a.grid_content[0][0]?(Object(n["I"])(),Object(n["k"])("span",g)):Object(n["j"])("",!0),"X"===a.grid_content[0][0]?(Object(n["I"])(),Object(n["k"])("span",y)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-1 w-2",{"h-0-1":a.lineHorizontalTop,"v-0-1":a.lineVerticalCenter}]),onClick:t[1]||(t[1]=e=>s.placeItem(0,1))},["O"===a.grid_content[0][1]?(Object(n["I"])(),Object(n["k"])("span",p)):Object(n["j"])("",!0),"X"===a.grid_content[0][1]?(Object(n["I"])(),Object(n["k"])("span",k)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-1 w-3",{"h-0-2":a.lineHorizontalTop,"v-0-2":a.lineVerticalRight,"df-0-2":a.lineDiagonalForward}]),onClick:t[2]||(t[2]=e=>s.placeItem(0,2))},["O"===a.grid_content[0][2]?(Object(n["I"])(),Object(n["k"])("span",f)):Object(n["j"])("",!0),"X"===a.grid_content[0][2]?(Object(n["I"])(),Object(n["k"])("span",w)):Object(n["j"])("",!0)],2)]),Object(n["l"])("tr",v,[Object(n["l"])("td",{class:Object(n["y"])(["cell h-2 w-1",{"h-1-0":a.lineHorizontalCenter,"v-1-0":a.lineVerticalLeft}]),onClick:t[3]||(t[3]=e=>s.placeItem(1,0))},["O"===a.grid_content[1][0]?(Object(n["I"])(),Object(n["k"])("span",I)):Object(n["j"])("",!0),"X"===a.grid_content[1][0]?(Object(n["I"])(),Object(n["k"])("span",R)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-2 w-2",{"h-1-1":a.lineHorizontalCenter,"v-1-1":a.lineVerticalCenter,"db-1-1":a.lineDiagonalBack,"df-1-1":a.lineDiagonalForward}]),onClick:t[4]||(t[4]=e=>s.placeItem(1,1))},["O"===a.grid_content[1][1]?(Object(n["I"])(),Object(n["k"])("span",C)):Object(n["j"])("",!0),"X"===a.grid_content[1][1]?(Object(n["I"])(),Object(n["k"])("span",_)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-2 w-3",{"h-1-2":a.lineHorizontalCenter,"v-1-2":a.lineVerticalRight}]),onClick:t[5]||(t[5]=e=>s.placeItem(1,2))},["O"===a.grid_content[1][2]?(Object(n["I"])(),Object(n["k"])("span",L)):Object(n["j"])("",!0),"X"===a.grid_content[1][2]?(Object(n["I"])(),Object(n["k"])("span",V)):Object(n["j"])("",!0)],2)]),Object(n["l"])("tr",z,[Object(n["l"])("td",{class:Object(n["y"])(["cell h-3 w-1",{"h-2-0":a.lineHorizontalBottom,"v-2-0":a.lineVerticalLeft,"df-2-0":a.lineDiagonalForward}]),onClick:t[6]||(t[6]=e=>s.placeItem(2,0))},["O"===a.grid_content[2][0]?(Object(n["I"])(),Object(n["k"])("span",M)):Object(n["j"])("",!0),"X"===a.grid_content[2][0]?(Object(n["I"])(),Object(n["k"])("span",q)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-3 w-2",{"h-2-1":a.lineHorizontalBottom,"v-2-1":a.lineVerticalCenter}]),onClick:t[7]||(t[7]=e=>s.placeItem(2,1))},["O"===a.grid_content[2][1]?(Object(n["I"])(),Object(n["k"])("span",D)):Object(n["j"])("",!0),"X"===a.grid_content[2][1]?(Object(n["I"])(),Object(n["k"])("span",H)):Object(n["j"])("",!0)],2),Object(n["l"])("td",{class:Object(n["y"])(["cell h-3 w-3",{"h-2-2":a.lineHorizontalBottom,"v-2-2":a.lineVerticalRight,"db-2-2":a.lineDiagonalBack}]),onClick:t[8]||(t[8]=e=>s.placeItem(2,2))},["O"===a.grid_content[2][2]?(Object(n["I"])(),Object(n["k"])("span",P)):Object(n["j"])("",!0),"X"===a.grid_content[2][2]?(Object(n["I"])(),Object(n["k"])("span",B)):Object(n["j"])("",!0)],2)])])])]),_:1},8,["show"])])}var T={methods:{sleep(e){return new Promise(t=>setTimeout(t,e))}}};const G={name:"grid",mixins:[T],data(){return{grid_content:[["","",""],["","",""],["","",""]],displayGrid:!0,loadingMessage:null,infoMessage:null,endLineColor:"#63e2b7",lineHorizontalTop:!1,lineHorizontalCenter:!1,lineHorizontalBottom:!1,lineVerticalLeft:!1,lineVerticalCenter:!1,lineVerticalRight:!1,lineDiagonalBack:!1,lineDiagonalForward:!1}},computed:{...Object(O["c"])("player",["host","turn","socketId","win","playedCell","symbol","enemyPlayer"])},watch:{enemyPlayer(){this.placeEnemyItem()}},mounted(){this.listenPlay(),this.turn?this.createInfoMessage():this.createLoadingMessage()},beforeUnmount(){this.removeMessage()},methods:{...Object(O["b"])("player",["changePlayedCell","changeTurn","changeWin","changeOutcome","changeVictoryWay","emitPlay","listenPlay"]),createLoadingMessage(){this.loadingMessage||(this.loadingMessage=window.$message.loading("L'adversaire prépare son coup",{duration:0}))},createInfoMessage(){this.infoMessage||(this.infoMessage=window.$message.info("A toi de jouer",{duration:0}))},removeMessage(){this.loadingMessage&&(this.loadingMessage.destroy(),this.loadingMessage=null),this.infoMessage&&(this.infoMessage.destroy(),this.infoMessage=null)},placeItem(e,t){this.turn&&""===this.grid_content[e][t]&&(this.removeMessage(),this.grid_content[e][t]="X",this.changePlayedCell([e,t]),this.checkWin(),this.changeTurn(!1),this.emitPlay(),this.win||this.checkEquality()||this.createLoadingMessage())},placeEnemyItem(){if(this.socketId===this.enemyPlayer.socketId)return;if(this.enemyPlayer.turn)return;this.removeMessage();let e=this.enemyPlayer.playedCell;this.grid_content[e[0]][e[1]]="O",this.checkDefeat()||this.checkEquality()||(this.changeTurn(!0),this.createInfoMessage())},checkEquality(){for(const e of this.grid_content)for(const t of e)if(""===t)return!1;return this.gameOver("equality"),!0},checkDefeat(){return!!this.enemyPlayer.win&&(this.endLineColor="#e88080",this.addLine(this.enemyPlayer.victoryWay),this.gameOver("defeat"),!0)},checkWin(){0!==this.enemyPlayer.length&&(this.checkWinHorizontal()||this.checkWinVertical()||this.checkWinDiagonalBack()||this.checkWinDiagonalForward())&&(this.changeWin(!0),this.gameOver("win"))},checkWinHorizontal(){let e=this.playedCell[0];for(let t=0;t<3;t++)if(this.grid_content[e][t]!==this.symbol)return!1;return 0===e&&this.addLine("h-t"),1===e&&this.addLine("h-c"),2===e&&this.addLine("h-b"),!0},checkWinVertical(){let e=this.playedCell[1];for(let t=0;t<3;t++)if(this.grid_content[t][e]!==this.symbol)return!1;return 0===e&&this.addLine("v-l"),1===e&&this.addLine("v-c"),2===e&&this.addLine("v-r"),!0},checkWinDiagonalBack(){for(let e=0;e<3;e++)if(this.grid_content[e][e]!==this.symbol)return!1;return this.addLine("d-b"),!0},checkWinDiagonalForward(){for(let e=0;e<3;e++){let t=2-e;if(this.grid_content[e][t]!==this.symbol)return!1}return this.addLine("d-f"),!0},async gameOver(e){"equality"!==e?await this.sleep(2e3):await this.sleep(1e3),this.displayGrid=!1,this.endLineColor="#63e2b7",this.changeOutcome(e)},addLine(e){"h-t"===e&&(this.lineHorizontalTop=!this.lineHorizontalTop),"h-c"===e&&(this.lineHorizontalCenter=!this.lineHorizontalCenter),"h-b"===e&&(this.lineHorizontalBottom=!this.lineHorizontalBottom),"v-l"===e&&(this.lineVerticalLeft=!this.lineVerticalLeft),"v-c"===e&&(this.lineVerticalCenter=!this.lineVerticalCenter),"v-r"===e&&(this.lineVerticalRight=!this.lineVerticalRight),"d-b"===e&&(this.lineDiagonalBack=!this.lineDiagonalBack),"d-f"===e&&(this.lineDiagonalForward=!this.lineDiagonalForward),this.changeVictoryWay(e)}}},E=()=>{Object(n["X"])(e=>({"73b69fe2":e.endLineColor}))},X=G.setup;G.setup=X?(e,t)=>(E(),X(e,t)):E;var F=G,$=(i("0257"),i("6b0d")),x=i.n($);const A=x()(F,[["render",W],["__scopeId","data-v-5919e58a"]]);var J=A,Q={name:"Morpion",components:{Grid:J},data(){return{isReady:!1,displayWaitingCard:!0,toBack:!1}},computed:{...Object(O["c"])("player",["host","outcome"]),...Object(O["c"])("room",["rooms","roomPlayers","replay"]),statusEndGame(){return"defeat"===this.outcome?"500":"win"===this.outcome?"418":"404"},titleEndGame(){return"defeat"===this.outcome?"Défaite":"win"===this.outcome?"Victoire":"Egalité"},descriptionEndGame(){return"defeat"===this.outcome?"Aïe ! Pourquoi ne pas retenter votre chance ?":"win"===this.outcome?"Trop facile ! Vous prendrez bien un thé ?":"Bizarre... J'était pourtant sûr que vous alliez l'avoir !"}},watch:{rooms(e,t){const i=e.find(e=>e.id===this.$route.query.room);e.length!==t.length&&void 0===i&&this.isReady&&(window.$message.error("Votre adversaire a quitté la partie"),this.quitRoom())},roomPlayers(e){this.watchRoom(e)},replay(e,t){!e||t||this.host||this.resetGame()}},created(){this.host&&this.changeRoomId(this.$route.query.room)},mounted(){this.listenReplay(),this.watchRoom(this.roomPlayers),window.onpopstate=()=>{this.toBack=!0}},beforeRouteLeave(e,t,i){setTimeout(()=>{if(!this.toBack)return i();this.quitRoomConfirm(i)},100)},methods:{...Object(O["b"])("room",["emitLeaveRoom","listenReplay","changeReplay"]),...Object(O["b"])("player",["changeRoomId","emitReplay","changeTurn","changeWin","changeOutcome"]),watchRoom(e){2!==e.length||this.isReady||(this.isReady=!0)},restartGame(){this.emitReplay(),this.resetGame()},resetGame(){let e="defeat"===this.outcome||"equality"===this.outcome&&this.host;this.changeTurn(e),this.changeOutcome(""),this.changeWin(!1),this.changeReplay(!1)},quitRoomConfirm(e){window.$dialog.warning({title:"Quitter la partie ?",content:"Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...",positiveText:"Oui, je suis sûr",negativeText:"Finalement non",onPositiveClick:()=>{e()}})},quitRoom(){this.toBack=!1,this.changeOutcome(""),this.$router.push({name:"Rooms"})}}};i("aa8b");const U=x()(Q,[["render",j],["__scopeId","data-v-7530346a"]]);t["default"]=U},8277:function(e,t,i){},aa8b:function(e,t,i){"use strict";i("8277")},b0f6:function(e,t,i){}}]);
//# sourceMappingURL=chunk-ba2d7e6e.e917a3b2.js.map