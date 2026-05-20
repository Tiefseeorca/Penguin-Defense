"use strict";

class Languages {
	static AVAILABLE_LANGUAGES = [ "German", "English" ];
	static language = "English";
	
	static Attributes = {
		Range:		Symbol("Range"),
		AtkSpeed:	Symbol("AtkSpeed"),
		StatName:	Symbol("StatName"),
		Amount:		Symbol("Amount")
	}
	
	static CardTexts = {
		"German":	{
			"Tower":	["Turm"],
			"Range":	["Reichweite: ", this.Attributes.Range],
			"AtkSpeed":	["Geschwindigkeit: ", this.Attributes.AtkSpeed],
			"Upgrade":	["Upgrade"],
			"Increase":	["Erhöhe die ", this.Attributes.StatName],
			"By":		["um ", this.Attributes.Amount]
		},
		"English":	{
			"Tower":	["Tower"],
			"Range":	["Range: ", this.Attributes.Range],
			"AtkSpeed":	["Attack Speed: ", this.Attributes.AtkSpeed],
			"Upgrade":	["Upgrade"],
			"Increase":	["Increase the ", this.Attributes.StatName],
			"By":		["by ", this.Attributes.Amount]
		}
	};
	
	static _getAttributeValue(card, symbol) {
		switch(symbol) {
			case this.Attributes.Range: return card.data.range;
			case this.Attributes.AtkSpeed: return card.data.attackSpeed;
			case this.Attributes.StatName: return card.data.statName;
			case this.Attributes.Amount: return card.data.amount;
			default: return "null";
		};
	}
	
	static _assembleSingleText(card, dict, text) {
		let snippets = dict[text];
		let res = "";
		for(let element of snippets) {
			if(typeof element == "string") {
				res += element;
			} else {
				res += Languages._getAttributeValue(card, element);
			}
		}
		return res;
	}
	
	static getCardDescByLanguage(card) {
		let dict = Languages.CardTexts[Languages.language];
		let texts = [];
		if(card.type == "tower") {
			texts.push(this._assembleSingleText(card, dict, "Tower"));
			texts.push(this._assembleSingleText(card, dict, "Range"));
			texts.push(this._assembleSingleText(card, dict, "AtkSpeed"));
		} else if(card.type == "upgrade") {
			texts.push(this._assembleSingleText(card, dict, "Upgrade"));
			texts.push(this._assembleSingleText(card, dict, "Increase"));
			texts.push(this._assembleSingleText(card, dict, "By"));
		} else {
			console.log("Invalid or unimplemented card type:");
			console.log(card);
		}
		return texts;
	}
	
	static BUTTON_IDS = {
		"German": {
			"Play":		"PLAY_BUTTON",
			"Pause":	"PAUSE_BUTTON",
			"Continue":	"CONTINUE_BUTTON",
			"MainMenu":	"MAIN_MENU_BUTTON",
			"Reroll":	"REROLL_BUTTON"
		},
		"English": {
			"Play":		"PLAY_BUTTON",
			"Pause":	"PAUSE_BUTTON",
			"Continue":	"CONTINUE_BUTTON",
			"MainMenu":	"MAIN_MENU_BUTTON",
			"Reroll":	"REROLL_BUTTON"
		}
	}
	
	static get START_MESSAGE() {
		return {
			"German":	"Klicke zum Starten",
			"English":	"Click to Start"
		}[Languages.language];
	}
}