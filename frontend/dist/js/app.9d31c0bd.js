(function(e){function t(t){for(var r,n,s=t[0],i=t[1],m=t[2],l=0,u=[];l<s.length;l++)n=s[l],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&u.push(a[n][0]),a[n]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(u.length)u.shift()();return c.push.apply(c,m||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,n=1;n<o.length;n++){var s=o[n];0!==a[s]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=o[0]))}return e}var r={},n={app:0},a={app:0},c=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0304abc9":"eaea676b","chunk-5981fb30":"b2a720bb","chunk-65d4a46a":"90d172aa"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.e=function(e){var t=[],o={"chunk-5981fb30":1,"chunk-65d4a46a":1};n[e]?t.push(n[e]):0!==n[e]&&o[e]&&t.push(n[e]=new Promise((function(t,o){for(var r="css/"+({}[e]||e)+"."+{"chunk-0304abc9":"31d6cfe0","chunk-5981fb30":"6da69ee0","chunk-65d4a46a":"8ac612e9"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var m=c[s],l=m.getAttribute("data-href")||m.getAttribute("href");if("stylesheet"===m.rel&&(l===r||l===a))return t()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){m=u[s],l=m.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete n[e],d.parentNode.removeChild(d),o(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){n[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,o){r=a[e]=[t,o]}));t.push(r[2]=c);var m,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(e);var u=new Error;m=function(t){l.onerror=l.onload=null,clearTimeout(d);var o=a[e];if(0!==o){if(o){var r=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+n+")",u.name="ChunkLoadError",u.type=r,u.request=n,o[1](u)}a[e]=void 0}};var d=setTimeout((function(){m({type:"timeout",target:l})}),12e4);l.onerror=l.onload=m,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(o,r,function(t){return e[t]}.bind(null,r));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var m=window["webpackJsonp"]=window["webpackJsonp"]||[],l=m.push.bind(m);m.push=t,m=m.slice();for(var u=0;u<m.length;u++)t(m[u]);var d=l;c.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"4e7f":function(e,t,o){"use strict";o("5d66")},"56d7":function(e,t,o){"use strict";o.r(t);var r=o("7a23");function n(e,t,o,n,a,c){const s=Object(r["R"])("utils-for-naive"),i=Object(r["R"])("router-view"),m=Object(r["R"])("n-message-provider"),l=Object(r["R"])("n-dialog-provider"),u=Object(r["R"])("n-loading-bar-provider"),d=Object(r["R"])("n-config-provider");return Object(r["I"])(),Object(r["i"])(d,{theme:a.darkTheme},{default:Object(r["bb"])(()=>[Object(r["n"])(u,null,{default:Object(r["bb"])(()=>[Object(r["n"])(l,null,{default:Object(r["bb"])(()=>[Object(r["n"])(m,{placement:a.placement},{default:Object(r["bb"])(()=>[Object(r["n"])(s),Object(r["n"])(i)]),_:1},8,["placement"])]),_:1})]),_:1})]),_:1},8,["theme"])}var a=o("8f5d"),c=o("8a56");function s(e,t,o,n,a,c){const s=Object(r["R"])("dialog-naive"),i=Object(r["R"])("loading-bar-naive"),m=Object(r["R"])("message-naive");return Object(r["I"])(),Object(r["k"])(r["b"],null,[Object(r["n"])(s),Object(r["n"])(i),Object(r["n"])(m)],64)}function i(e,t,o,n,a,c){return Object(r["I"])(),Object(r["k"])("div")}var m=o("d420"),l=Object(r["o"])({setup(){window.$dialog=Object(m["a"])()}}),u=o("6b0d"),d=o.n(u);const p=d()(l,[["render",i]]);var b=p;function h(e,t,o,n,a,c){return Object(r["I"])(),Object(r["k"])("div")}var S=o("9ec0"),E=Object(r["o"])({setup(){window.$loading=Object(S["a"])()}});const O=d()(E,[["render",h]]);var f=O;function _(e,t,o,n,a,c){return Object(r["I"])(),Object(r["k"])("div")}var y=o("7317"),T=Object(r["o"])({setup(){window.$message=Object(y["a"])()}});const v=d()(T,[["render",_]]);var g=v,R={name:"UtilsForNaive",components:{DialogNaive:b,LoadingBarNaive:f,MessageNaive:g}};const k=d()(R,[["render",s]]);var j=k,I=o("5502"),C={name:"App",components:{UtilsForNaive:j},data(){return{darkTheme:a["a"],placement:Object(r["O"])("top")}},created(){c["a"].setupSocketConnection()},mounted(){this.listenGetRooms()},beforeUnmount(){c["a"].disconnect()},methods:{...Object(I["b"])("room",["listenGetRooms"])}};o("4e7f");const A=d()(C,[["render",n]]);var P=A,M=o("6605");const N=[{path:"/",name:"Home",component:()=>Promise.all([o.e("chunk-0304abc9"),o.e("chunk-65d4a46a")]).then(o.bind(null,"bb51"))},{path:"/room/:id?",name:"Room",component:()=>Promise.all([o.e("chunk-0304abc9"),o.e("chunk-5981fb30")]).then(o.bind(null,"3ab1"))}],w=Object(M["a"])({history:Object(M["b"])("/"),routes:N});var D=w,L={namespaced:!0,state:{enemyData:[],game:"",scoreToReach:1,numberOfPlayer:2,playedCell:"",victoryWay:"",chosenItem:""},mutations:{SET_ENEMY_DATA(e,t){e.enemyData=t},SET_GAME(e,t){e.game=t},SET_SCORE_TO_REACH(e,t){e.scoreToReach=t},SET_NUMBER_OF_PLAYER(e,t){e.numberOfPlayer=t},SET_PLAYED_CELL(e,t){e.playedCell=t},SET_VICTORY_WAY(e,t){e.victoryWay=t},SET_CHOSEN_ITEM(e,t){e.chosenItem=t}},actions:{emitPlayToRockPaperScissors(e,t=!1){const o={socketId:e.rootState.player.socketId,roomId:e.rootState.player.roomId,username:e.rootState.player.username,chosenItem:e.state.chosenItem,score:e.rootState.player.score,newRound:t};c["a"].socket.emit("toServer_playRockPaperScissors",o)},listenPlayToRockPaperScissors(e){c["a"].socket.on("toClient_playRockPaperScissors",t=>{e.commit("SET_ENEMY_DATA",t)})},emitPlayToMorpion(e){const t={socketId:e.rootState.player.socketId,roomId:e.rootState.player.roomId,username:e.rootState.player.username,playedCell:e.state.playedCell,turn:e.rootState.player.turn,isWinner:e.rootState.player.isWinner,victoryWay:e.state.victoryWay};c["a"].socket.emit("toServer_playToMorpion",t)},listenPlayToMorpion(e){c["a"].socket.on("toClient_playToMorpion",t=>{e.commit("SET_ENEMY_DATA",t)})},changeEnemyData(e,t){e.commit("SET_ENEMY_DATA",t)},resetEnemyData(e){e.commit("SET_ENEMY_DATA",[])},changeGame(e,t){e.commit("SET_GAME",t)},changeScoreToReach(e,t){e.commit("SET_SCORE_TO_REACH",t)},changeNumberOfPlayer(e,t){e.commit("SET_NUMBER_OF_PLAYER",t)},changePlayedCell(e,t){e.commit("SET_PLAYED_CELL",t)},changeVictoryWay(e,t){e.commit("SET_VICTORY_WAY",t)},changeChosenItem(e,t){e.commit("SET_CHOSEN_ITEM",t)}}},Y={namespaced:!0,state:{socketId:"",username:"",roomId:null,host:!1,turn:!1,isWinner:!1,outcome:"",score:0},mutations:{SET_SOCKET_ID(e,t){e.socketId=t},SET_USERNAME(e,t){e.username=t},SET_ROOM_ID(e,t){e.roomId=t},SET_HOST(e,t){e.host=t},SET_TURN(e,t){e.turn=t},SET_IS_WINNER(e,t){e.isWinner=t},SET_OUTCOME(e,t){e.outcome=t},SET_SCORE(e,t){e.score=t}},actions:{changeSocketId(e,t){e.commit("SET_SOCKET_ID",t)},changeUsername(e,t){e.commit("SET_USERNAME",t)},changeRoomId(e,t){e.commit("SET_ROOM_ID",t)},changeHost(e,t){e.commit("SET_HOST",t)},changeTurn(e,t){e.commit("SET_TURN",t)},changeIsWinner(e,t){e.commit("SET_IS_WINNER",t)},changeOutcome(e,t){e.commit("SET_OUTCOME",t)},changeScore(e,t){e.commit("SET_SCORE",t)}}},W={namespaced:!0,getters:{room(e,t,o){return e.rooms.find(e=>e.id===o.player.roomId)},enemy(e,t,o){if(void 0!==t.room)return t.room.players.find(e=>e.socketId!==o.player.socketId)}},state:{rooms:[],replay:!1},mutations:{SET_ROOMS(e,t){e.rooms=t},SET_REPLAY(e,t){e.replay=t}},actions:{emitCreateOrJoinRoom(e){e.commit("player/SET_SOCKET_ID",c["a"].socket.id,{root:!0});const t={socketId:e.rootState.player.socketId,username:e.rootState.player.username,roomId:e.rootState.player.roomId,host:e.rootState.player.host,game:e.rootState.game.game,scoreToReach:e.rootState.game.scoreToReach};c["a"].socket.emit("toServer_createOrJoinRoom",t)},emitGetRooms(e){c["a"].socket.emit("toServer_getRooms",e.state)},listenGetRooms(e){c["a"].socket.on("toClient_getRooms",t=>{e.commit("SET_ROOMS",t)})},emitLeaveRoom(){c["a"].socket.emit("toServer_leaveRoom")},emitReplay(e){c["a"].socket.emit("toServer_replay",e.rootState.player.roomId)},listenReplay(e){c["a"].socket.on("toClient_replay",()=>{e.commit("SET_REPLAY",!0)})},changeReplay(e,t){e.commit("SET_REPLAY",t)}}},U=Object(I["a"])({modules:{game:L,player:Y,room:W}}),H=o("5333");Object(r["h"])(P).use(U).use(D).use(H["a"]).mount("#app")},"5d66":function(e,t,o){},"8a56":function(e,t,o){"use strict";var r=o("ade3"),n=o("daa8");class a{constructor(){Object(r["a"])(this,"socket",void 0)}setupSocketConnection(){this.socket=Object(n["a"])("http://node.playground.rodolphe-cabotiau.com")}disconnect(){this.socket&&this.socket.disconnect()}}t["a"]=new a}});
//# sourceMappingURL=app.9d31c0bd.js.map