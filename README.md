# angular-22jun18

## How to Start an Angular App
1. Make a new folder.
2. Create .gitignore; with text:
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
        styles
        vendors
        views
    routes
.gitignore
package-lock.json
package.json
README.md
```
6. Begin sourcing vendor files.
```
<script src="vendors/angular.min.js"></script>
<script src="scripts/client.js"></script>
```