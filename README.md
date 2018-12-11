# jquery.restful

A jQuery plugin for communicating with REST APIs.

[![Build Status](https://travis-ci.org/myspace-nu/jquery.restful.svg?branch=master)](https://travis-ci.org/myspace-nu/jquery.restful)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/myspace-nu/jquery.restful/blob/master/LICENSE)

## Live demo

See a live demo on [CodePen](https://codepen.io/myspace-nu/full/ebYRMY)

## Installation

Using npm

	npm install @myspace-nu/jquery.restful --save

Using CDN

	<script src="https://cdn.jsdelivr.net/npm/@myspace-nu/jquery.restful/dist/jquery.restful.min.js"></script>

Or manually by including the script *after* the jQuery library

	<script src="/path/to/jquery.restful.min.js"></script>

## Usage

Sending data from a HTML form to a REST API and log the answer.

	<form class="myClass" action="https://jsonplaceholder.typicode.com/posts" method="post">
		<input type="text" name="foo" value="bar">
		<input type="text" name="userId" value="1">
		<input type="submit" value="Go">
	</form>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.myClass').restful({
				onSuccess:function(data){
					console.log(data);
				}
			});
		});
	</script>

Sending data from a HTML link to a REST API, converting all data attributes to JSON.

	<a class="myClass" data-foo="bar" href="https://jsonplaceholder.typicode.com/posts">Go</a>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.myClass').restful({
				onSuccess:function(data){
					console.log(data);
				}
			});
		});
	</script>

Using GET method and paramaters as part of the URL.

	<a class="myClass" data-id="1" href="posts/{id}/comments">Go</a>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.myClass').restful({
				method:'GET',
				url:'https://jsonplaceholder.typicode.com',
				onSuccess:function(data){
					console.log(data);
				}
			});
		});
	</script>

## Options
**dataType** - Data type to use

    dataType: 'form'

*Default: 'json'*

**defaultValue** - Default value to use for URL paramaters

    defaultValue: 'foo'

*Default: null*

**preventHammering** - Attempts to prevent hammering if the users click multiple times on a submit button or link before the server has responded.

    preventHammering: false

*Default: true*

**url** - Base URL for the API

    url: 'https://jsonplaceholder.typicode.com'
	
**method** - HTTP method / Verb to use

    method: 'GET'

*Default: 'POST'*

**onComplete** - Function called after completed request

	onComplete:function(data){
		console.log({ element:this, data:data });
	}

**onError** - Function called in case an error was raised

	onError:function(data){
		console.log({ element:this, data:data });
	}

**onSuccess** - Function called after a successful request

	onSuccess:function(data){
		console.log({ element:this, data:data });
	}

### Author: [Johan Johansson](https://github.com/myspace-nu)
