# Max MSP + SocketIO + Tonejs
The purpose of this example is to create an app that creates a webpage. This webpage will send audio to all connected clients with Tonejs library, and receivesz from max msp instruction via a socket io connection for realtime data exchange. 

## To start the server 
- node install socket.io
- node server.js

## To start client
Rember to change 'script.js' to point at the website hosting the socket.io channel. At line 4 of the script change:
'''
const ioClient = io.connect("insert.your.ws");
'''