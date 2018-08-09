/*!
 * jQuery restful plugin
 * https://github.com/myspace-nu
 *
 * Copyright 2018 Johan Johansson
 * Released under the MIT license
 */
(function($) {
  $.fn.serializeObject = function() {
		var obj = {};
		var arr = this.serializeArray();
		$.each(arr, function() {
			if (obj[this.name]) {
				if (!obj[this.name].push) {
					obj[this.name] = [obj[this.name]];
				}
				obj[this.name].push(this.value || '');
			} else {
				obj[this.name] = this.value || '';
			}
		});
		return obj;
	};
	$.fn.restful = function(options) {
		var settings = $.extend({
			url: null,
			method: 'POST',
			onComplete: function(){ },
			onSuccess: function(){ },
			onError: function(){ },
			dataType: 'json',
			defaultValue: null
		}, options);
		if(settings.url)
			settings.url=settings.url.replace(/\/+$/,'');
		this.each(function() {
		  	if(this.tagName.toLowerCase() == 'form'){
				$(this).submit(function(event) {
					event.preventDefault();
					var data = $(this).serializeObject();
					var url = $(this).attr("action");
					if(!url.match(/^(\w{3,5}\:)?\/+/) && settings.url){
						url = settings.url + "/" + url.replace(/^\/+/,'');
					}
					var matches = url.match(/{+\:?\w+}+/g);
					for (var i in matches){
						var name = matches[i].match(/\w+/);
						url = url.replace(matches[i],data[name[0]] || data[name[0].toLowerCase()] || settings.defaultValue);
						delete data[name[0]];
					}
					var as = {
						url: url,
						type: $(this).attr('method') || settings.method,
						context:this,
						success: function(json){ settings.onSuccess.call(this,json); },
						error: function(json){ settings.onError.call(this,json); },
						complete: function(json){ settings.onComplete.call(this,json); }
					};
					if(as.type.toLowerCase() == 'get'){
						as.url += '?'+$.param(data);
					} else {
						if(settings.dataType.toLowerCase() == 'json'){
							as.contentType = 'application/json; charset=utf-8';
							as.dataType = 'json';
							as.data = JSON.stringify(data);
						} else {
							as.data = data;
						}
					}
					$.ajax(as);
				});
			} else { // if(['a','button','input','img'].includes(this.tagName.toLowerCase()))
				$(this).click(function(event) {
					event.preventDefault();
					var data = $(this).data();
					var url = $(this).attr('href');
					if(!url.match(/^(\w{3,5}\:)?\/+/) && settings.url){
						url = settings.url + "/" + url.replace(/^\/+/,'');
					}
					var matches = url.match(/{+\:?\w+}+/g);
					for (var i in matches){
						var name = matches[i].match(/\w+/);
						url = url.replace(matches[i],data[name[0]] || data[name[0].toLowerCase()] || settings.defaultValue);
						delete data[name[0].toLowerCase()];
					}
					var as = {
						url: url,
						type: settings.method,
						context:this,
						success: function(json){ settings.onSuccess.call(this,json); },
						error: function(json){ settings.onError.call(this,json); },
						complete: function(json){ settings.onComplete.call(this,json); }
					}
					if(as.type.toLowerCase() == 'get'){
						as.url += '?'+$.param(data);
					} else {
						if(settings.dataType.toLowerCase() == 'json'){
							as.contentType = 'application/json; charset=utf-8';
							as.dataType = 'json';
							as.data = JSON.stringify(data);
						} else {
							as.data = data;
						}
					}
					$.ajax(as);
				});
			}
		});
	};
}(jQuery));