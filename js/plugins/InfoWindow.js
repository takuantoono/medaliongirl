//=============================================================================
// InfoWindow.js
//=============================================================================

/*:
 * @plugindesc 情報表示ウィンドウをメニュー画面に追加するプラグイン
 * @author Me
 *
 * @help 情報表示ウィンドウをメニュー画面上に追加します。
 *
 */

(function() {

	// マップ上にウィンドウ表示するよ宣言
	var Scene_map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
	     
		Scene_map_start.call(this);
	    this._InfoWindow = new Window_Info();
	    this.addWindow(this._InfoWindow);
	    this._InfoWindow.hide();
	};
 

	
var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);


if($gameSwitches._data[14]){
	this._InfoWindow.show();
	//this._InfoWindow.updateTone();
    this._InfoWindow.setText();
    $gameSwitches._data[14] = false;
}

if($gameSwitches._data[15]){
	this._InfoWindow.hide();
}

Scene_Map.prototype.isMenuCalled = function() {
    return false//Input.isTriggered('menu') || TouchInput.isCancelled();
};

    };

	// ここからメニューウィンドウ作り始まります。
	function Window_Info() {
	    this.initialize.apply(this, arguments);
	}

	Window_Info.prototype = Object.create(Window_Base.prototype);
	Window_Info.prototype.constructor = Window_Info;
	Window_Info.prototype.initialize = function() {
		var x = 0;
		var y = 0;
	    var width = 100;
	    var height = this.lineHeight()*4;
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	Window_Info.prototype.setText = function(str) {
		this._text = str;
		this.refresh();
	};
	
	// ウィンドウに載せる内容
	Window_Info.prototype.refresh = function() {
	    this.contents.clear();
this.resetTextColor();
this.drawIcon(82, 0, 0);
this.resetTextColor();
this.drawText($gameVariables._data[89],40,0);
this.drawIcon(314, 0, 32);
this.resetTextColor();
this.drawText($gameVariables._data[3],40,32);
this.drawIcon(313, 0, 64);
this.resetTextColor();
this.drawText($gameParty.gold(),40,64);
this.drawIcon(311, 0, 96);
this.resetTextColor();
this.drawText($gameVariables._data[99],40,96);

}


	// フォントサイズ
	Window_Info.prototype.standardFontSize = function() {
    	return 20;
    };
	// ウィンドウの透明度
	Window_Info.prototype.standardBackOpacity = function() {
    	return 255;
	};
    // ウィンドウの余白
	Window_Info.prototype.standardPadding = function() {
    	return 6;
	};
	// ウィンドウの色調
	Window_Info.prototype.updateTone = function() {
	if($gameVariables._data[56] && $gameVariables._data[56]._enemy){
    	this.setTone(128, 0, 64);
    }else{
    	this.setTone(64, 0, 128);
    };
	};
	



})();