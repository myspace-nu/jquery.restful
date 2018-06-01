# jquery.restful

A jQuery plugin for communicating with REST APIs.

## Installation

Include script *after* the jQuery library

    <script src="/path/to/jquery.cookie-consent.min.js"></script>

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
