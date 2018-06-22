const app = angular.module('myApp', []);
app.controller('TestController', function () {
	let self = this;
	console.log('Self is:', self);
	self.message = 'Hello Controller!';
});