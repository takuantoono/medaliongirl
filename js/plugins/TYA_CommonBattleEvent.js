/*:
 * @plugindesc 全ての敵グループ共通のイベントを設定できます。
 * @author 茶の助
 *
 * @param commonEventTroopId
 * @desc バトルイベントを参照する敵グループＩＤ
 * @default 1
 *
 * @param commonEventPriority
 * @desc イベントの優先順
 (0: 共通 1: グループ)
 * @default 0
 *
 * @param commonEventInvalidation
 * @desc 共通イベントを発生させなくする文字列
 * @default <共通イベント無し>
 */
 
 (function() {

    var parameters = PluginManager.parameters('TYA_CommonBattleEvent');
    var commonEventTroopId = Number(parameters['commonEventTroopId']);
    var commonEventPriority = Number(parameters['commonEventPriority']) != 0;
    var commonEventInvalidation = parameters['commonEventInvalidation'];
	
	Game_Troop.prototype.pages = function() {
		var pages = [];
		var page1 = this.troop().pages;
		var page2 = $dataTroops[commonEventTroopId].pages;
		if (this.troop().name.match(commonEventInvalidation) || this.troop().id == commonEventTroopId) {
			pages = page1;
		} else {
			if (commonEventPriority){
				pages = page1.concat(page2);
			} else {
				pages = page2.concat(page1);
			}
		}
		return pages;
	};
		
	Game_Troop.prototype.setupBattleEvent = function() {
		if (!this._interpreter.isRunning()) {
			if (this._interpreter.setupReservedCommonEvent()) return;
			pages = this.pages();
			for (var i = 0; i < pages.length; i++) {
				var page = pages[i];
				if (this.meetsConditions(page) && !this._eventFlags[i]) {
					this._interpreter.setup(page.list);
					if (page.span <= 1) {
						this._eventFlags[i] = true;
					}
					break;
				}
			}
		}
	};
	
	Game_Troop.prototype.increaseTurn = function() {
		var pages = this.pages();
		for (var i = 0; i < pages.length; i++) {
			var page = pages[i];
			if (page.span === 1) {
				this._eventFlags[i] = false;
			}
		}
		this._turnCount++;
	};
	
})();