var pickColor = {
	id: "pickColor",
	title: "Pick color",
	contexts: ["all"]
};

var colors = {
	black: {
		id: "black",
		title: "Black",
		contexts: ["all"],
		parentId: "pickColor"
	},
	white: {
		id: "white",
		title: "White",
		contexts: ["all"],
		parentId: "pickColor"
	},
	red: {
		id: "red",
		title: "Red",
		contexts: ["all"],
		parentId: "pickColor"
	},
	green: {
		id: "green",
		title: "Green",
		contexts: ["all"],
		parentId: "pickColor"
	},
	blue: {
		id: "blue",
		title: "Blue",
		contexts: ["all"],
		parentId: "pickColor"
	},
	pink: {
		id: "pink",
		title: "Pink",
		contexts: ["all"],
		parentId: "pickColor"
	},
	purple: {
		id: "purple",
		title: "Purple",
		contexts: ["all"],
		parentId: "pickColor"
	},
	yellow: {
		id: "yellow",
		title: "Yellow",
		contexts: ["all"],
		parentId: "pickColor"
	},
	orange: {
		id: "orange",
		title: "Orange",
		contexts: ["all"],
		parentId: "pickColor"
	}
};

var clear = {
	id: "clear",
	title: "Clear/Stop",
	contexts: ["all"],
};

chrome.contextMenus.create(pickColor);

var colorKeys = showObject(colors);
for(key of colorKeys){
	chrome.contextMenus.create(colors[key]);
}

chrome.contextMenus.create(clear);

chrome.contextMenus.onClicked.addListener(function(clickData){
	var params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {txt: clickData.menuItemId});
	});
});

function showObject(object) {
	var result = [];
	for (var property in object) {
		if(object.hasOwnProperty(property)){
			result.push(property);
		} 
	}              
	return result;
}