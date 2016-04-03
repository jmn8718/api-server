# api-server

## Server
The server runs in [localhost:3000](http:///localhost:3000)

## Folder structure
- Folder for web app
```
/app
|--/js
|--/scss
```
- Folder for server configuration & starter
```
/bin
|--www
```
- Folder for public files that can be accesible from the outside. The sever expose this folder
```
/public
|--/javascripts
|--/stylesheets
|--/images
```
- Folder for server code
```
/src
|--/api
|--/models
|--/routes
|--/views
|--app.js
```
- Folder for test
```
/test
```

## Dependencies
- gulp

- Command for general dependencies
```bash
$ npm install -g express nodemon gulp
```


## References
- https://travismaynard.com/writing/getting-started-with-gulp
- https://anotheruiguy.gitbooks.io/nodeexpreslibsass_from-scratch/content/gulp.html