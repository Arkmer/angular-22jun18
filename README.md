# angular-22jun18

## How to Start an Angular App
1. Make a new folder.
2. Create .gitignore; with minimum text:
```
.DS_STORE
node_modules/
.idea/
*.log
*.logs
.vscode/
.env
```
3. npm init -y
4. npm i angular angular-ui-bootstrap body-parser bootstrap express express-session jquery pg --save
5. Set up basic file structure.
```
node_modules
server
    public
        scripts
            client.js
        styles
        vendors
        views
        index.html
    routes
.gitignore
package-lock.json
package.json
README.md
```
6. Display "Hello World" as starting place.
7. Begin sourcing vendor files into vendor folder with corresponding scripts in index.html
```
<script src="vendors/angular.min.js"></script>
<script src="scripts/client.js"></script>
```
8. Build "handshakes" that verify angular is working.
```
-- index.html --
<body ng-app="myApp"> // Links everything to client.js
	<div ng-controller="TestController as vm"> // Links to the specific controller within client.js
		<p>{{ vm.message }}</p> // Links to the specific variable within the controller within client.js
	</div>
</body>
```
```
-- client.js --
const app = angular.module('myApp', []); // Declares what the app is so you can link to it from index.html
app.controller('TestController', function () { // Declares the controller name so you can link to it
	let self = this; // Required line because it is required
	console.log('Self is:', self); // Empty object at this point, but it showing up is a very good thing
	self.message = 'Hello Controller!'; // Variable to be displayed on the index.html
});
```
## Multiple Views
Alright, we've got our super basic setup. We can display things from client.js using the two way binding that AngularJS is known for. Now we're going to set up multiple views so we can navigate through multiple pages of content. For now we'll just keep a simple 2 pages and a home page for 3 total.

1. Clean off all the things in your body tags in index.html. Your index should look like this:
```
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="vendors/angular.min.js"></script>
	<script src="scripts/client.js"></script>
</head>

<body ng-app="myApp">
</body>

</html>
```
2. Let's also get rid of the related things in your clint.js file. Should look like this now:
```
const app = angular.module('myApp', []);
```
3. npm i angular-route --save
4. Put that "angular-route" where it needs to be.
```
const app = angular.module('myApp', [ngRoute]);
```
5. The following will headline where your routes are kept, this is like your directory.
```
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
        redirectTo: 'home' // Typically home, but really just referencing the default route upon arrival
        })
    -- All routes will be built here --
        .otherwise({ // This is defaulted to if the targeted URL does not exist, it tries all the above "otherwise" go here
        template: '<h1>404</h1>'
        });
}]);
```
6. Routes are a .when method that follow the $routeProvider. A basic route template looks like this:
```
.when('/home', { // The URL
    templateUrl: 'FILE.html', // The file displayed upon targeting that URL
    controller: 'CONTROLLER as vm', // The controller created upon targeting that URL
})
```
There's some implication here that I'll clear up. Controllers are their own files. They do not go in the client.js file. The same is true for all pages you make in this app going forward; even "home" will be its own file targeted by the client.js. This is because client.js is now just a file for routes to pages. Similar is true of index.html; it is not just a page for sourcing dependencies and holding your "ng-app='myApp'" tag to display the entire app.

### Services and Controllers
Services are kind of hidden in all this but serve an important part of what happens in your app and on each page.

Services hold data as long as the app is open. Controllers hold data as long as you are on that particular page in the app. Typically speaking the stack flows as follows:
```
HTML <--> Controller <--> Service <--> Server <--> Database
```
There is some difficulty when getting information back to the Service from the Controller because it's not always obvious that the data made it back. Additionally, sometimes information is created in a controller and it gets stuck there.

### Important!
Controller and Service files need to be sourced into your index.html as dependancies. They are sourced the same way as client.js. However new html files do not because their file is directly targeted by the client.js where the controller is only declared as named.
7. Building Controllers
Let's first add to our file structure a place for these Controllers to exist so that we can find and target them easier later. We're going to short cut and also build a place for our Services as well because it's the same thing.
```
node_modules
server
    public
        scripts
            controllers // New
            services // New
            client.js
        styles
        vendors
        views
        index.html
    routes
.gitignore
package-lock.json
package.json
README.md
```
Suffice to say which goes where.

Let's build a controller. We'll give it a pretty generic name "HomeController". The headline template for a controller is as follows:
```
myApp.controller('HomeController', ['HomeService', function(HomeService) {
    let self = this;
    -- All Logic Here --
}]);
```
You'll notice that the headline contains the service name as well. You'll see in a moment that the service declares its name and is then referenced in this way by the Controller.

Typically all the logic that goes into a controller is the passing of variables from the service to the html and the status of UI components. It may also contain user information that is checked and rechecked each time a URL is targeted.

### Important!
Controllers can have more than one Service attached to them and Services can be attached to ore than one Controller. Here is an example:
```
myApp.controller('HomeController', ['HomeService', 'AwayService', function(HomeService, AwayService) {
    -- All Logic Here --
}]);
```
Notice how they are organized. HomeService is first in the brackets and is therefore first in the function, AwayService is second and second. If there was a third Service it would also be third and third, and so on.
8. Building Services
We've already created the folder home for our services, so go ahead and drop your related Services into that folder.

The headline template:
```
myApp.service('ScheduleService', ['$http', '$location', function($http, $location){
    let self = this;
    -- All Logic Here --
}]);
```
The Services are where you'll make all your server calls and they will hold the bulk of your logic for the front end.
9. Controller and Service Handshakes
Often when creatng new pages, controllers, and services you will put a simple console.log() at the top of them that simply says the name of the controller or service. This is done to prove with as little effort as possible that the page has been linked properly and is functioning.