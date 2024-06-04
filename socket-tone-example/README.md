## If serving via ngrok
Remember to open two port, 8000 for max client to send control message and 3000 for the final user client. To do this:
- ngrok config edit
and modify to add
'''
tunnels:
  first:
    addr: 3000
    proto: http    
  second:
    addr: 8080
    proto: http
'''
after this
- ngrok start --all
- node server.js