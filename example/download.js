/*!
 * Helper functions for data download
 * https://github.com/myspace-nu
 *
 * Copyright 2021 Johan Johansson
 * Released under the MIT license
 */

// Usage: downloadDataURL('data:plain/text;base64,MTIz','data.txt');
function downloadDataURL(Base64data, fileName='Untitled.dat') {
	var matches = Base64data.substring(0,Base64data.indexOf(',')).match(/^\w+\:(.+?\/.+?);(\w+)/);
	Base64data = Base64data.substring(Base64data.indexOf(',')+1)
	var data = atob(Base64data);
	var byteArray = [];
	for (var offset = 0; offset < data.length; offset += 512) {
		var s = data.slice(offset, offset + 512);
		var bytes = new Array(s.length);
		for (var i = 0; i < s.length; i++) {
			bytes[i] = s.charCodeAt(i);
		}
		byteArray.push(new Uint8Array(bytes));
	}
	var blob = new Blob(byteArray, { type: matches[1]});
	var a = document.createElement("a");
	a.style.display = "none";
	document.body.appendChild(a);
	a.href = URL.createObjectURL(blob);
	a.setAttribute("download", fileName);
	a.click();
	window.URL.revokeObjectURL(a.href);
	document.body.removeChild(a);
}
// Usage: downloadData('123','data.txt');
function downloadData(data, fileName, type="text/plain") {
	var a = document.createElement("a");
	a.style.display = "none";
	document.body.appendChild(a);
	a.href = window.URL.createObjectURL(
		new Blob([data], { type })
	);
	a.setAttribute("download", fileName);
	a.click();
	window.URL.revokeObjectURL(a.href);
	document.body.removeChild(a);
}