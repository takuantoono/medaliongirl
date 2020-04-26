(function() {

Game_Interpreter.prototype.actorMedal = function(id) {
var x = Math.randomInt(7)+4;
var y = Math.randomInt(6)+5;
var extend = false;
if($gameMap.eventIdXy(x, y)==0){
$gameMap.spawnEvent(id, x, y);
}else{
var did = $gameMap.eventIdXy(x, y);
if(!this.character(did).get_self_variable("coins")){
this.character(did).set_self_variable("coins", 1);
this.character(did).set_self_variable("pcoins", 1);
}
if($gameSelfVariables.value($gameMap._mapId, did, "coins")<10&&this.character(did)._originalEventId==id){
$gameSelfVariables.setValue($gameMap._mapId, did, "coins", $gameSelfVariables.value($gameMap._mapId, did, "coins")+1);
this.character(id).refresh();
}else{
$gameSwitches._data[2]=true;
};
};
};


Game_Interpreter.prototype.randomMedals = function() {
var x = Math.randomInt(7)+4;
var y = Math.randomInt(6)+5;
var extend = false;
if($gameMap.eventIdXy(x, y)==0){
var ary = [41];
if($gameParty.members().contains($gameActors.actor(2)))ary.push(1);
if($gameParty.members().contains($gameActors.actor(3)))ary.push(4);
if($gameParty.members().contains($gameActors.actor(4)))ary.push(23);
$gameMap.spawnEvent(ary[Math.floor(Math.random() * ary.length)], x, y);
}else{
var id = $gameMap.eventIdXy(x, y);
if(!this.character(id).get_self_variable("coins")){
this.character(id).set_self_variable("coins", 1);
this.character(id).set_self_variable("pcoins", 1);
}
if($gameSelfVariables.value($gameMap._mapId, id, "coins")<10&&this.character(id)._originalEventId!=41){
$gameSelfVariables.setValue($gameMap._mapId, id, "coins", $gameSelfVariables.value($gameMap._mapId, id, "coins")+1);
this.character(id).refresh();
}else{
$gameSwitches._data[2]=true;
};
};
};

Game_Interpreter.prototype.checkGraphic = function() {
var id = this._eventId;
if(!this.character(id))return;
if(!this.character(id).get_self_variable("coins")){
this.character(id).set_self_variable("coins", 1);
this.character(id).set_self_variable("pcoins", 1);
}
var name = "";
var num = 0;
if(!this.character(id).get_self_variable("coins")>1){
if(this.character(id).get_self_variable("coins")==10){
name="Actor1_o";
if(this.character(id)._originalEventId==1)num=4;
if(this.character(id)._originalEventId==4)num=6;
if(this.character(id)._originalEventId==23)num=5;
}else{
if(this.character(id)._originalEventId==1)name="Actor1_1_1";
if(this.character(id)._originalEventId==4)name="Actor1_3_1";
if(this.character(id)._originalEventId==23)name="Actor1_2_1";
num=this.character(id).get_self_variable("coins")-2;
};
}else{
name="Actor1_o";
if(this.character(id)._originalEventId==1)num=0;
if(this.character(id)._originalEventId==4)num=2;
if(this.character(id)._originalEventId==23)num=1;
};
if(this.character(id)._characterName!=name||this.character(id)._characterIndex!=num){
this.changeChara(id);
};
};

Game_Interpreter.prototype.checkPosition = function(id) {
if(!this.character(id))return;
if(this.character(id).isMoving())return;
if(this.character(id).isStarting())return;
if(this.character(id).x<4 || this.character(id).x>10){
AudioManager.playSe({"name": "Key","volume":50,"pitch":70,"pan":50});
$gameMap.eraseEvent(id);
return;
};
if(this.character(id).y>10){
var medals = this.character(id).get_self_variable("coins");
if(medals>=10){
AudioManager.playSe({"name": "Item2","volume":50,"pitch":150,"pan":50});
medals *= 2;
}else{
AudioManager.playSe({"name": "Item1","volume":50,"pitch":150,"pan":50});
};
if(this.character(id)._originalEventId==1){
if(!$gameSwitches._data[4]&&$gameVariables._data[5]<20)$gameVariables._data[5]+=medals;
$gameVariables._data[9]+=medals;
};
if(this.character(id)._originalEventId==4){
if(!$gameSwitches._data[4]&&$gameVariables._data[6]<20)$gameVariables._data[6]+=medals;
$gameVariables._data[10]+=medals;
}
if(this.character(id)._originalEventId==23){
if(!$gameSwitches._data[4]&&$gameVariables._data[7]<20)$gameVariables._data[7]+=medals;
$gameVariables._data[11]+=medals;
}
$gameVariables._data[3]+=medals;
if($gameVariables._data[3]>$gameVariables._data[24])$gameVariables._data[3]=$gameVariables._data[24];
$gameParty.gainGold($gameVariables._data[19]*medals);
$gameSwitches._data[14]=true;
$gameMap.eraseEvent(id);
};
};


Game_Interpreter.prototype.medalionA = function(id) {
var mo = Math.randomInt(5);
var dame = false;
if(mo<=2){
dame = this.moveDown(id);
}else{
if(mo==3){
dame = this.moveLeft(id);
}else{
dame = this.moveRight(id);
};
};
return dame;
};

Game_Interpreter.prototype.medalionB = function(id) {
var mo = Math.randomInt(4);
var dame = false;
if(mo<=1){
dame = this.moveDownLeft(id);
}else{
if(mo==2){
dame = this.moveLeft(id);
}else{
dame = this.moveLeftD(id);
};
};
return dame;
};

Game_Interpreter.prototype.medalionC = function(id) {
var mo = Math.randomInt(4);
var dame = false;
if(mo<=1){
dame = this.moveDownRight(id);
}else{
if(mo==2){
dame = this.moveRight(id);
}else{
dame = this.moveRightD(id);
};
};
return dame;
};

Game_Interpreter.prototype.upLevel = function(id, image) {
if(this.character(id).get_self_variable("coins")==2)this.character(id).setImage(image, 0);
if(this.character(id).get_self_variable("coins")==3)this.character(id).setImage(image, 1);
if(this.character(id).get_self_variable("coins")==4)this.character(id).setImage(image, 2);
if(this.character(id).get_self_variable("coins")==5)this.character(id).setImage(image, 3);
if(this.character(id).get_self_variable("coins")==6)this.character(id).setImage(image, 4);
if(this.character(id).get_self_variable("coins")==7)this.character(id).setImage(image, 5);
if(this.character(id).get_self_variable("coins")==8)this.character(id).setImage(image, 6);
if(this.character(id).get_self_variable("coins")==9)this.character(id).setImage(image, 7);
};



Game_Interpreter.prototype.changeChara = function(id) {
if(!this.character(id)) return;
if(!this.character(id).get_self_variable("coins"))this.character(id).set_self_variable("coins", 1);
if(this.character(id)._originalEventId==1){
if(this.character(id).get_self_variable("coins")==1)this.character(id).setImage("Actor_o", 0);
this.upLevel(id, "Actor1_1_1");
if(this.character(id).get_self_variable("coins")==10)this.character(id).setImage("Actor_o", 4);
};
if(this.character(id)._originalEventId==4){
if(this.character(id).get_self_variable("coins")==1)this.character(id).setImage("Actor_o", 2);
this.upLevel(id, "Actor1_3_1");
if(this.character(id).get_self_variable("coins")==10)this.character(id).setImage("Actor_o", 6);
};
if(this.character(id)._originalEventId==23){
if(this.character(id).get_self_variable("coins")==1)this.character(id).setImage("Actor_o", 1);
this.upLevel(id, "Actor1_2_1");
if(this.character(id).get_self_variable("coins")==10)this.character(id).setImage("Actor_o", 5);
};
this.character(id).refresh();
};

Game_Interpreter.prototype.medalContents = function(id) {
var x = this.character(id).x;
var y = this.character(id).y;
var did = $gameMap.eventIdXy(x, y+1);
if(did>0){
if(this.character(id)._originalEventId!=41){
if(this.character(id)._originalEventId==this.character(did)._originalEventId){
if(Math.randomInt(2)==1){
if(!this.character(id).get_self_variable("coins"))this.character(id).set_self_variable("coins", 1);
if(!this.character(did).get_self_variable("coins"))this.character(did).set_self_variable("coins", 1);
var coins = this.character(id).get_self_variable("coins");
var dcoins = this.character(did).get_self_variable("coins");
if(dcoins>=10) return true;
if(coins>=10) return false;
dcoins += 1;
coins -= 1;
if(coins!=this.character(id).get_self_variable("coins")){
this.character(did).set_self_variable("coins", dcoins);
this.changeChara(did);
if(coins>0){
this.character(id).set_self_variable("coins", coins);
this.changeChara(id);
}else{
$gameMap.eraseEvent(id);
return true;
};
};
if(y==3){
id = $gameMap.getLastSpawnEventId();
}else{
return true;
};
};
};
};
};
if(this.character(did))this.changeChara(did);
if(this.character(id))this.changeChara(id);
return false;
};

Game_Interpreter.prototype.moveDown = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":1},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x, "A");
}
return false;
};

Game_Interpreter.prototype.moveLeft = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id).x<=4&&this.character(id).get_self_variable("coins")>1){
if(this.character(id).get_self_variable("coins")==10&&Math.randomInt(10)>0)return true;
AudioManager.playSe({"name": "Key","volume":50,"pitch":70,"pan":50});
this.character(id).set_self_variable("coins", this.character(id).get_self_variable("coins")-1);
return true;
};
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":2},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x-1, "B");
}
return false;
};

Game_Interpreter.prototype.moveDownLeft = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":1},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x-1, "B");
}
return false;
};

Game_Interpreter.prototype.moveLeftD = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id).x<=4&&this.character(id).get_self_variable("coins")>1){
if(this.character(id).get_self_variable("coins")==10&&Math.randomInt(10)>0)return true;
AudioManager.playSe({"name": "Key","volume":50,"pitch":70,"pan":50});
this.character(id).set_self_variable("coins", this.character(id).get_self_variable("coins")-1);
return true;
};
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":5},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x, "A");
this.checkOthers(id, this.character(id).x-1, "B");
}
return false;
};

Game_Interpreter.prototype.moveRight = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id).x>=10&&this.character(id).get_self_variable("coins")>1){
if(this.character(id).get_self_variable("coins")==10&&Math.randomInt(10)>0)return true;
AudioManager.playSe({"name": "Key","volume":50,"pitch":70,"pan":50});
this.character(id).set_self_variable("coins", this.character(id).get_self_variable("coins")-1);
return true;
};
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":3},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x+1, "C");
}
return false;
};

Game_Interpreter.prototype.moveDownRight = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":1},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x+1, "C");
}
return false;
};

Game_Interpreter.prototype.moveRightD = function(id) {
if(id==0)return;
if(this.character(id)&&this.character(id).isMoving())return;
var es = this.medalContents(id);
if(es)return true;
if(this.character(id).x>=10&&this.character(id).get_self_variable("coins")>1){
if(this.character(id).get_self_variable("coins")==10&&Math.randomInt(10)>0)return true;
AudioManager.playSe({"name": "Key","volume":50,"pitch":70,"pan":50});
this.character(id).set_self_variable("coins", this.character(id).get_self_variable("coins")-1);
return true;
};
if(this.character(id)){
$gameMap.event(id).forceMoveRoute({
"list":[{"code":6},
{"code":0}],
"repeat":false,
"skippable":true})
this._character = this.character(id)
this.setWaitMode('route')
this.checkOthers(id, this.character(id).x, "A");
this.checkOthers(id, this.character(id).x+1, "C");
}
return false;
};

Game_Interpreter.prototype.checkOthers = function(id, x, ss) {
var y = this.character(id).y
var did = $gameMap.eventIdXy(x, y+1)
if(did>0){
$gameSelfSwitches.setValue([this._mapId, did, ss], true);
$gameSelfSwitches.setValue([this._mapId, did, "D"], true);
};
};





})();
