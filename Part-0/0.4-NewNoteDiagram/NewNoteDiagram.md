# New Note Diagram
:::mermaid
sequenceDiagram
participant Browser
participant Server

Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate Server

note left of Server: Server update the note with the new conntent from new_note 

Server -->> Browser: Redirect browser to fetch "notes" from location "/exampleapp/notes"
deactivate Server

Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate Server
Server -->> Browser: HTML Document
deactivate Server

Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate Server
Server -->> Browser: CSS Document
deactivate Server

Browser->>Server: GET  https://studies.cs.helsinki.fi/exampleapp/main.js
activate Server
Server -->> Browser: JS Document
deactivate Server

note right of Browser: The browser start executing the JS code in the document

Browser->>Server: GET /exampleapp/data.json
activate Server
Server -->> Browser:[{"content":"testing", "date": "2023-02-28T19:20:13.462Z"},....]
deactivate Server

note right of Browser: The browser execute the callback function that display the notes

:::

