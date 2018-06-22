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
4. npm i angular angular-route angular-ui-bootstrap body-parser bootstrap express express-session jquery pg --save
5. Set up basic file structure.
```
node_modules
server
    public
        scripts
            controllers
            services
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
	console.log('Self is:', self);
	self.message = 'Hello Controller!'; // Variable to be displayed on the index.html
});
```