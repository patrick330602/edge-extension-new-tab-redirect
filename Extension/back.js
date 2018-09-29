browser.tabs.onCreated.addListener(start);
browser.tabs.onUpdated.addListener(start);

var last_tab = -1;
var defs = {
	"settings_applied": 1,
	"main_page": "about:blank",
}

function init(){
	// CHECK FOR SETTINGS
	settings();
	// START
	start();
}

function settings(){
	browser.storage.local.get(function(obj){
		if(obj.settings_applied == undefined){ // NOT FOUND
			//alert("Defs not found");
			setSettings(defs);
		}else{ // FOUND
			//alert("Defs encontradas");
			defs = obj;
			//$.each(obj,function(k,v){
			//	alert(k+" -> "+v);
			//});
		}
	});

}

function start(){
	browser.tabs.query({'active': true}, function(tabs){
		var tab = tabs[0];
		if(last_tab != tab.id && tab.url.indexOf("msn.com/spartan/") > -1){
			last_tab = tab.id;
			url = defs["main_page"];
			setTimeout(function(){browser.tabs.update(tab.id,{url: url});},60);
		}
	});
}

browser.runtime.onMessage.addListener(function(r, sender, sendResponse){
    if(r.code == "get")
		sendResponse({msg: defs});
    if(r.code == "set")
    	setSettings(r.msg);
  });

function setSettings(obj){
	defs = obj; // LOCAL REP OF THE STORAGE
	browser.storage.local.set(obj,onSet());
}

function onSet() {
	if(browser.runtime.lastError) alert(browser.runtime.lastError);
}

init();