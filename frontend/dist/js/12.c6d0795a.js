"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[12],{5834:function(e,t){function s(e){const{title:t}=e.$options;if(t)return"function"===typeof t?t.call(e):t}t["Z"]={created(){const e=s(this);e&&(document.title=e)}}},5359:function(e,t){t["Z"]={methods:{sleep(e){return new Promise((t=>setTimeout(t,e)))}}}},5770:function(e,t,s){s.r(t),s.d(t,{default:function(){return me}});var i=s(6252),a=s(3577);const n={class:"room"},o={key:0,class:"waiting-card"},r={key:1,class:"game-wrapper"},c={class:"game"},l={class:"end-game"};function h(e,t,s,h,m,d){const u=(0,i.up)("n-h1"),g=(0,i.up)("n-spin"),p=(0,i.up)("n-alert"),y=(0,i.up)("n-button"),k=(0,i.up)("morpion"),f=(0,i.up)("rock-paper-scissors"),w=(0,i.up)("n-collapse-transition"),_=(0,i.up)("n-result");return(0,i.wg)(),(0,i.iD)("div",n,[m.isReady?((0,i.wg)(),(0,i.iD)("div",r,[(0,i.Wm)(u,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.game),1)])),_:1}),(0,i._)("div",c,[(0,i.Wm)(w,{show:""===e.outcome,appear:""},{default:(0,i.w5)((()=>["Morpion"===e.game?((0,i.wg)(),(0,i.j4)(k,{key:0})):"Pierre-papier-ciseaux"===e.game?((0,i.wg)(),(0,i.j4)(f,{key:1})):(0,i.kq)("",!0)])),_:1},8,["show"]),(0,i.Wm)(w,{show:""!==e.outcome,appear:""},{default:(0,i.w5)((()=>[(0,i._)("div",l,[(0,i.Wm)(_,{status:d.statusEndGame,title:d.titleEndGame,description:d.descriptionEndGame},{footer:(0,i.w5)((()=>[e.host&&e.outcome?((0,i.wg)(),(0,i.j4)(y,{key:0,onClick:t[1]||(t[1]=e=>d.restartGame())},{default:(0,i.w5)((()=>[(0,i.Uk)(" Rejouer ")])),_:1})):((0,i.wg)(),(0,i.j4)(g,{key:1,size:"medium"}))])),_:1},8,["status","title","description"])])])),_:1},8,["show"])]),(0,i.Wm)(y,{onClick:t[2]||(t[2]=e=>d.quitRoomConfirm(d.quitRoom)),class:"quit-button"},{default:(0,i.w5)((()=>[(0,i.Uk)(" Quitter la partie ")])),_:1})])):((0,i.wg)(),(0,i.iD)("div",o,[(0,i.Wm)(u,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.game),1)])),_:1}),(0,i.Wm)(p,{type:"success"},{icon:(0,i.w5)((()=>[(0,i.Wm)(g,{size:"small"})])),default:(0,i.w5)((()=>[(0,i.Uk)(" En attente d'un autre joueur... ")])),_:1}),(0,i.Wm)(y,{onClick:t[0]||(t[0]=e=>d.quitRoom())},{default:(0,i.w5)((()=>[(0,i.Uk)(" Annuler ")])),_:1})]))])}s(7658);var m=s(3907),d=s(5834);const u={class:"morpion"},g={cellspacing:"0",cellpadding:"0"},p={key:0,class:"circle"},y={key:1,class:"cross"},k={key:0,class:"circle"},f={key:1,class:"cross"},w={key:0,class:"circle"},_={key:1,class:"cross"},v={key:0,class:"circle"},D={key:1,class:"cross"},I={key:0,class:"circle"},C={key:1,class:"cross"},R={key:0,class:"circle"},q={key:1,class:"cross"},O={key:0,class:"circle"},V={key:1,class:"cross"},b={key:0,class:"circle"},M={key:1,class:"cross"},L={key:0,class:"circle"},z={key:1,class:"cross"};function E(e,t,s,n,o,r){return(0,i.wg)(),(0,i.iD)("div",u,[(0,i._)("table",g,[(0,i._)("tbody",null,[(0,i._)("tr",null,[(0,i._)("td",{class:(0,a.C_)(["h-1 w-1",{"h-0-0":o.lineHorizontalTop,"v-0-0":o.lineVerticalLeft,"db-0-0":o.lineDiagonalBack}]),onClick:t[0]||(t[0]=e=>r.placeItem(0,0))},["O"===o.grid_content[0][0]?((0,i.wg)(),(0,i.iD)("span",p)):(0,i.kq)("",!0),"X"===o.grid_content[0][0]?((0,i.wg)(),(0,i.iD)("span",y)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-1 w-2",{"h-0-1":o.lineHorizontalTop,"v-0-1":o.lineVerticalCenter}]),onClick:t[1]||(t[1]=e=>r.placeItem(0,1))},["O"===o.grid_content[0][1]?((0,i.wg)(),(0,i.iD)("span",k)):(0,i.kq)("",!0),"X"===o.grid_content[0][1]?((0,i.wg)(),(0,i.iD)("span",f)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-1 w-3",{"h-0-2":o.lineHorizontalTop,"v-0-2":o.lineVerticalRight,"df-0-2":o.lineDiagonalForward}]),onClick:t[2]||(t[2]=e=>r.placeItem(0,2))},["O"===o.grid_content[0][2]?((0,i.wg)(),(0,i.iD)("span",w)):(0,i.kq)("",!0),"X"===o.grid_content[0][2]?((0,i.wg)(),(0,i.iD)("span",_)):(0,i.kq)("",!0)],2)]),(0,i._)("tr",null,[(0,i._)("td",{class:(0,a.C_)(["h-2 w-1",{"h-1-0":o.lineHorizontalCenter,"v-1-0":o.lineVerticalLeft}]),onClick:t[3]||(t[3]=e=>r.placeItem(1,0))},["O"===o.grid_content[1][0]?((0,i.wg)(),(0,i.iD)("span",v)):(0,i.kq)("",!0),"X"===o.grid_content[1][0]?((0,i.wg)(),(0,i.iD)("span",D)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-2 w-2",{"h-1-1":o.lineHorizontalCenter,"v-1-1":o.lineVerticalCenter,"db-1-1":o.lineDiagonalBack,"df-1-1":o.lineDiagonalForward}]),onClick:t[4]||(t[4]=e=>r.placeItem(1,1))},["O"===o.grid_content[1][1]?((0,i.wg)(),(0,i.iD)("span",I)):(0,i.kq)("",!0),"X"===o.grid_content[1][1]?((0,i.wg)(),(0,i.iD)("span",C)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-2 w-3",{"h-1-2":o.lineHorizontalCenter,"v-1-2":o.lineVerticalRight}]),onClick:t[5]||(t[5]=e=>r.placeItem(1,2))},["O"===o.grid_content[1][2]?((0,i.wg)(),(0,i.iD)("span",R)):(0,i.kq)("",!0),"X"===o.grid_content[1][2]?((0,i.wg)(),(0,i.iD)("span",q)):(0,i.kq)("",!0)],2)]),(0,i._)("tr",null,[(0,i._)("td",{class:(0,a.C_)(["h-3 w-1",{"h-2-0":o.lineHorizontalBottom,"v-2-0":o.lineVerticalLeft,"df-2-0":o.lineDiagonalForward}]),onClick:t[6]||(t[6]=e=>r.placeItem(2,0))},["O"===o.grid_content[2][0]?((0,i.wg)(),(0,i.iD)("span",O)):(0,i.kq)("",!0),"X"===o.grid_content[2][0]?((0,i.wg)(),(0,i.iD)("span",V)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-3 w-2",{"h-2-1":o.lineHorizontalBottom,"v-2-1":o.lineVerticalCenter}]),onClick:t[7]||(t[7]=e=>r.placeItem(2,1))},["O"===o.grid_content[2][1]?((0,i.wg)(),(0,i.iD)("span",b)):(0,i.kq)("",!0),"X"===o.grid_content[2][1]?((0,i.wg)(),(0,i.iD)("span",M)):(0,i.kq)("",!0)],2),(0,i._)("td",{class:(0,a.C_)(["h-3 w-3",{"h-2-2":o.lineHorizontalBottom,"v-2-2":o.lineVerticalRight,"db-2-2":o.lineDiagonalBack}]),onClick:t[8]||(t[8]=e=>r.placeItem(2,2))},["O"===o.grid_content[2][2]?((0,i.wg)(),(0,i.iD)("span",L)):(0,i.kq)("",!0),"X"===o.grid_content[2][2]?((0,i.wg)(),(0,i.iD)("span",z)):(0,i.kq)("",!0)],2)])])])])}var W={data(){return{infoMessage:null,loadingMessage:null}},beforeUnmount(){this.removeMessage()},methods:{createInfoMessage(e){this.infoMessage||(this.infoMessage=window.$message.success(e,{duration:0}))},createLoadingMessage(e){this.loadingMessage||(this.loadingMessage=window.$message.loading(e,{duration:0}))},removeMessage(){this.loadingMessage&&(this.loadingMessage.destroy(),this.loadingMessage=null),this.infoMessage&&(this.infoMessage.destroy(),this.infoMessage=null)}}},T=s(5359),P=s(9963);const H={name:"Morpion",mixins:[W,T.Z],data(){return{grid_content:[["","",""],["","",""],["","",""]],symbol:"X",enemySymbol:"O",endLineColor:"#63e2b7",lineHorizontalTop:!1,lineHorizontalCenter:!1,lineHorizontalBottom:!1,lineVerticalLeft:!1,lineVerticalCenter:!1,lineVerticalRight:!1,lineDiagonalBack:!1,lineDiagonalForward:!1}},computed:{...(0,m.rn)("player",["socketId","host","turn","isWinner"]),...(0,m.rn)("game",["playedCell","enemyData"]),...(0,m.Se)("room",["enemies"])},watch:{enemyData(){this.placeEnemyItem()}},mounted(){this.listenPlayToMorpion(),this.turn?this.createInfoMessage("A toi de jouer"):this.createLoadingMessage(`${this.enemies[0].username} prépare son coup`)},methods:{...(0,m.nv)("player",["changeTurn","changeIsWinner","changeOutcome"]),...(0,m.nv)("game",["emitPlayToMorpion","listenPlayToMorpion","changePlayedCell","changeVictoryWay"]),placeItem(e,t){this.turn&&""===this.grid_content[e][t]&&(this.removeMessage(),this.grid_content[e][t]=this.symbol,this.changePlayedCell([e,t]),this.checkVictory(),this.changeTurn(!1),this.emitPlayToMorpion(),this.isWinner||this.checkEquality()||this.createLoadingMessage(`${this.enemies[0].username} prépare son coup`))},placeEnemyItem(){if(0===this.enemyData.length)return;if(this.socketId===this.enemyData.socketId)return;if(this.enemyData.turn)return;this.removeMessage();let e=this.enemyData.playedCell;this.grid_content[e[0]][e[1]]=this.enemySymbol,this.checkDefeat()||this.checkEquality()||(this.changeTurn(!0),this.createInfoMessage("A toi de jouer"))},checkEquality(){for(const e of this.grid_content)for(const t of e)if(""===t)return!1;return this.gameOver("equality"),!0},checkDefeat(){return!!this.enemyData.isWinner&&(this.endLineColor="#e88080",this.addLine(this.enemyData.victoryWay),this.gameOver("defeat"),!0)},checkVictory(){0!==this.enemyData.length&&(this.checkVictoryHorizontal()||this.checkVictoryVertical()||this.checkVictoryDiagonalBack()||this.checkVictoryDiagonalForward())&&(this.changeIsWinner(!0),this.gameOver("victory"))},checkVictoryHorizontal(){let e=this.playedCell[0];for(let t=0;t<3;t++)if(this.grid_content[e][t]!==this.symbol)return!1;return 0===e&&this.addLine("h-t"),1===e&&this.addLine("h-c"),2===e&&this.addLine("h-b"),!0},checkVictoryVertical(){let e=this.playedCell[1];for(let t=0;t<3;t++)if(this.grid_content[t][e]!==this.symbol)return!1;return 0===e&&this.addLine("v-l"),1===e&&this.addLine("v-c"),2===e&&this.addLine("v-r"),!0},checkVictoryDiagonalBack(){for(let e=0;e<3;e++)if(this.grid_content[e][e]!==this.symbol)return!1;return this.addLine("d-b"),!0},checkVictoryDiagonalForward(){for(let e=0;e<3;e++){let t=2-e;if(this.grid_content[e][t]!==this.symbol)return!1}return this.addLine("d-f"),!0},async gameOver(e){"equality"!==e?await this.sleep(2e3):await this.sleep(1e3),this.endLineColor="#63e2b7",this.changeOutcome(e)},addLine(e){"h-t"===e&&(this.lineHorizontalTop=!this.lineHorizontalTop),"h-c"===e&&(this.lineHorizontalCenter=!this.lineHorizontalCenter),"h-b"===e&&(this.lineHorizontalBottom=!this.lineHorizontalBottom),"v-l"===e&&(this.lineVerticalLeft=!this.lineVerticalLeft),"v-c"===e&&(this.lineVerticalCenter=!this.lineVerticalCenter),"v-r"===e&&(this.lineVerticalRight=!this.lineVerticalRight),"d-b"===e&&(this.lineDiagonalBack=!this.lineDiagonalBack),"d-f"===e&&(this.lineDiagonalForward=!this.lineDiagonalForward),this.changeVictoryWay(e)}}},F=()=>{(0,P.sj)((e=>({"7cca77f9":e.endLineColor})))},B=H.setup;H.setup=B?(e,t)=>(F(),B(e,t)):F;var U=H,S=s(3744);const x=(0,S.Z)(U,[["render",E],["__scopeId","data-v-20f60364"]]);var $=x,G=s.p+"img/rock.ca4c5aec.svg",j=s.p+"img/paper.acd767a4.svg",X=s.p+"img/scissors.47c9558f.svg",Z=s.p+"img/rock-reverse.5b346b6b.svg",A=s.p+"img/paper-reverse.8ae0df57.svg",K=s.p+"img/scissors-reverse.4f13ce19.svg";const Q={class:"choices"},Y={class:"choice"},J={class:"choice"},N={class:"choice"},ee={class:"endgame"},te={src:Z,alt:"La pierre ennemie",rel:"preload"},se={src:A,alt:"Le papier ennemie",rel:"preload"},ie={src:K,alt:"Les ciseaux ennemies",rel:"preload"},ae={class:"scores"};function ne(e,t,s,n,o,r){const c=(0,i.up)("n-collapse-transition"),l=(0,i.up)("n-text");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(c,{show:o.displayChoices},{default:(0,i.w5)((()=>[(0,i._)("div",Q,[(0,i._)("div",Y,[(0,i._)("img",{src:G,alt:"La pierre",title:"La pierre",onClick:t[0]||(t[0]=e=>r.chooseItem("rock")),class:(0,a.C_)({chosen:"rock"===e.chosenItem,"disabled-item":""!==e.chosenItem}),rel:"preload"},null,2)]),(0,i._)("div",J,[(0,i._)("img",{src:j,alt:"Le papier",title:"Le Papier",onClick:t[1]||(t[1]=e=>r.chooseItem("paper")),class:(0,a.C_)({chosen:"paper"===e.chosenItem,"disabled-item":""!==e.chosenItem}),rel:"preload"},null,2)]),(0,i._)("div",N,[(0,i._)("img",{src:X,alt:"Les ciseaux",title:"Les ciseaux",onClick:t[2]||(t[2]=e=>r.chooseItem("scissors")),class:(0,a.C_)({chosen:"scissors"===e.chosenItem,"disabled-item":""!==e.chosenItem}),rel:"preload"},null,2)])])])),_:1},8,["show"]),(0,i.Wm)(c,{show:o.displayEndgame},{default:(0,i.w5)((()=>[(0,i._)("div",ee,[(0,i._)("div",null,[(0,i.wy)((0,i._)("img",{src:G,alt:"Ma pierre",class:(0,a.C_)(o.localOutcome),rel:"preload"},null,2),[[P.F8,"rock"===e.chosenItem]]),(0,i.wy)((0,i._)("img",{src:j,alt:"Mon papier",class:(0,a.C_)(o.localOutcome),rel:"preload"},null,2),[[P.F8,"paper"===e.chosenItem]]),(0,i.wy)((0,i._)("img",{src:X,alt:"Mes ciseaux",class:(0,a.C_)(o.localOutcome),rel:"preload"},null,2),[[P.F8,"scissors"===e.chosenItem]])]),(0,i.Wm)(l,{italic:""},{default:(0,i.w5)((()=>[(0,i.Uk)("VS")])),_:1}),(0,i._)("div",{class:(0,a.C_)({"endgame-enemy-choices":2===e.enemyData.length})},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.enemyData,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.socketId},[(0,i.wy)((0,i._)("img",te,null,512),[[P.F8,"rock"===e.chosenItem]]),(0,i.wy)((0,i._)("img",se,null,512),[[P.F8,"paper"===e.chosenItem]]),(0,i.wy)((0,i._)("img",ie,null,512),[[P.F8,"scissors"===e.chosenItem]])])))),128))],2)])])),_:1},8,["show"]),(0,i._)("div",ae,[(0,i._)("div",null,[(0,i.Wm)(l,{underline:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.username),1)])),_:1}),(0,i.Wm)(l,{depth:"3"},{default:(0,i.w5)((()=>[(0,i.Uk)(" - ")])),_:1}),(0,i.Wm)(l,{type:"success"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.score),1)])),_:1})]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.enemies,((t,s)=>((0,i.wg)(),(0,i.iD)("div",{key:t.socketId},[(0,i.Wm)(l,{italic:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(t.username),1)])),_:2},1024),(0,i.Wm)(l,{depth:"3"},{default:(0,i.w5)((()=>[(0,i.Uk)(" - ")])),_:1}),(0,i.Wm)(l,{type:"warning"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.enemyData.length>0&&void 0!==e.enemyData[s]?e.enemyData[s].score:0),1)])),_:2},1024)])))),128))])])}var oe={name:"RockPaperScissors",mixins:[W,T.Z],data(){return{displayChoices:!0,displayEndgame:!1,localOutcome:""}},computed:{...(0,m.rn)("player",["username","score"]),...(0,m.rn)("game",["enemyData","chosenItem","scoreToReach"]),...(0,m.Se)("room",["room","enemies"]),enemyEndgameColorClass(){return"victory"===this.localOutcome?"defeat":"defeat"===this.localOutcome?"victory":"equality"}},watch:{enemyData(e){if(0!==e.length){if(""===this.chosenItem){const t=e.filter((e=>""!==e.chosenItem));this.removeMessage(),1===t.length?this.createInfoMessage(`${t[0].username} a choisi son coup`):2===t.length&&this.createInfoMessage(`${t[0].username} et ${t[1].username} ont choisis leurs coups`)}this.checkResult()}}},mounted(){this.listenPlayToRockPaperScissors()},beforeUnmount(){this.resetEnemyData(),this.changeChosenItem(""),this.changeScore(0)},methods:{...(0,m.nv)("player",["changeOutcome","changeScore"]),...(0,m.nv)("game",["emitPlayToRockPaperScissors","listenPlayToRockPaperScissors","changeEnemyData","resetEnemyData","changeChosenItem"]),chooseItem(e){""===this.chosenItem&&(this.removeMessage(),this.changeChosenItem(e),this.emitPlayToRockPaperScissors(),this.checkResult())},checkResult(){if(this.enemyData.length<this.room.numberOfPlayer-1||""===this.chosenItem)return;const e=this.enemyData.filter((e=>""!==e.chosenItem));if(e.length!==this.enemyData.length)return;let t=0,s=[],i=[];for(let a=0;a<this.enemyData.length;a++){const e=this.enemyData[a].chosenItem;this.checkVictory(e)&&t++,this.checkDefeat(e)&&(s.push(this.enemyData[a]),t--),this.checkEquality(e)&&i.push(this.enemyData[a])}if(t>0){let e=this.enemyData;i.forEach((t=>{const s=e.findIndex((e=>e.socketId===t.socketId));e[s].score=t.score+1})),this.changeEnemyData(e),this.changeScore(this.score+1)}if(t<0){let e=this.enemyData;s.forEach((t=>{const s=e.findIndex((e=>e.socketId===t.socketId));e[s].score=t.score+1})),this.changeEnemyData(e)}t>0?this.roundOver("victory"):t<0?this.roundOver("defeat"):0===t&&this.roundOver("equality")},checkEquality(e){return"rock"===e&&"rock"===this.chosenItem||"paper"===e&&"paper"===this.chosenItem||"scissors"===e&&"scissors"===this.chosenItem},checkVictory(e){return"rock"===e&&"paper"===this.chosenItem||"paper"===e&&"scissors"===this.chosenItem||"scissors"===e&&"rock"===this.chosenItem},checkDefeat(e){return"rock"===e&&"scissors"===this.chosenItem||"paper"===e&&"rock"===this.chosenItem||"scissors"===e&&"paper"===this.chosenItem},async roundOver(e){this.localOutcome=e,this.displayChoices=!1,this.displayEndgame=!0,await this.sleep(1e3*this.room.numberOfPlayer+500),this.resetChosenItemForEnemyData(),this.changeChosenItem(""),this.score===this.room.scoreToReach?this.gameOver("victory"):this.enemyData.find((e=>e.score===this.room.scoreToReach))?this.gameOver("defeat"):(this.displayEndgame=!1,this.displayChoices=!0)},resetChosenItemForEnemyData(){let e=this.enemyData;for(let t=0;t<e.length;t++)e[t].chosenItem="";this.changeEnemyData(e)},gameOver(e){this.displayChoices=!1,this.changeOutcome(e)}}};const re=(0,S.Z)(oe,[["render",ne],["__scopeId","data-v-1dfca012"]]);var ce=re,le={name:"Room",title:"Room | Playground",mixins:[d.Z],components:{Morpion:$,RockPaperScissors:ce},data(){return{isReady:!1,toBack:!1,enemyUsername:""}},computed:{...(0,m.rn)("player",["host","outcome"]),...(0,m.rn)("room",["rooms","replay"]),...(0,m.rn)("game",["game"]),...(0,m.Se)("room",["room","enemies"]),statusEndGame(){return"defeat"===this.outcome?"500":"victory"===this.outcome?"418":"404"},titleEndGame(){return"defeat"===this.outcome?"Défaite":"victory"===this.outcome?"Victoire":"Egalité"},descriptionEndGame(){return"defeat"===this.outcome?"Aïe ! Pourquoi ne pas retenter votre chance ?":"victory"===this.outcome?"Trop facile ! Vous prendrez bien un thé ?":"Bizarre... J'était pourtant sûr que vous alliez l'avoir !"}},watch:{rooms(e,t){const s=e.find((e=>e.id===this.$route.query.id));e.length!==t.length&&void 0===s&&this.isReady&&(window.$message.error(`${this.enemyUsername} a quitté la partie`),this.quitRoom()),this.watchRoomForReady()},replay(e,t){!e||t||this.host||this.resetGame()},enemies(e){void 0!==e&&0!==e.length&&""===this.enemyUsername&&(this.enemyUsername=e[0].username)}},created(){this.host&&this.changeRoomId(this.$route.query.id)},mounted(){this.listenReplay(),this.watchRoomForReady(),window.onpopstate=()=>{this.toBack=!0}},beforeRouteLeave(e,t,s){setTimeout((()=>{if(!this.toBack)return s();this.quitRoomConfirm(s)}),100)},methods:{...(0,m.nv)("room",["emitReplay","listenReplay","changeReplay"]),...(0,m.nv)("player",["changeRoomId","changeTurn","changeIsWinner","changeOutcome"]),watchRoomForReady(){void 0===this.room||this.room.players.length!==this.room.numberOfPlayer||this.isReady||(this.isReady=!0)},restartGame(){this.emitReplay(),this.resetGame()},resetGame(){let e="defeat"===this.outcome||"equality"===this.outcome&&this.host;this.changeTurn(e),this.changeOutcome(""),this.changeIsWinner(!1),this.changeReplay(!1)},quitRoomConfirm(e){window.$dialog.warning({title:"Quitter la partie ?",content:"Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...",positiveText:"Oui, je suis sûr",negativeText:"Finalement non",onPositiveClick:()=>{e()}})},quitRoom(){this.toBack=!1,this.changeReplay(!1),this.$router.push({name:"Home"})}}};const he=(0,S.Z)(le,[["render",h],["__scopeId","data-v-5d96d8e2"]]);var me=he}}]);
//# sourceMappingURL=12.c6d0795a.js.map