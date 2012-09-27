
chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
	var url = tab.url;
    if (url !== undefined && changeInfo.status == "complete") {
		console.log('Exentsion working');	
		chrome.tabs.executeScript(tabid,{file:  'addExportButton.js'},function(){});
	};
});
