// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server object
var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url);
  var resource = parsedUrl.pathname;
  console.log('resource='+resource);
  // if client request is '/hello'
  if(resource == '/hello'){
    var name = 'Guest';
    // get query string
    var query = qs.parse(parsedUrl.query);
    if(query.name != undefined){
      name = query.name;
    }
    // send response
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('<h1>Hello, '+name+'</h1>');
  }else if(resource == '/comment'){
    // get post data from client
    request.on('data', function(data){
      var parsedQuery = qs.parse(data.toString());
      var comment = parsedQuery.comment;
      console.log('comment='+comment);
      // save comment to file
      fs.appendFile('comment.txt', comment+'\n', 'utf8', function(error){
        console.log('write comment to file!');
        // send response
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(comment);
      });
    });
  }else{
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Page Not Found');
  }
});
// 3. start web server
server.listen(8080, function(){
  console.log('Server is running...');
});