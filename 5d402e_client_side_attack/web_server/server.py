# server.py
import http.server # Our http server handler for http requests
import socketserver # Establish the TCP Socket connections
import socket,os,pty
PORT = 80
 

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.path = 'index.html'
        print("incoming request")
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
 
Handler = MyHttpRequestHandler
 
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Http Server Serving at port", PORT)
    httpd.serve_forever()
