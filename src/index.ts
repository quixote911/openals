import express from "express";
import  {JSONRPCServer as JSONRPCServer} from "json-rpc-2.0"
import * as bodyParser from "body-parser";

const app = express();
const server = new JSONRPCServer();

app.use(bodyParser.json());


server.addMethod("echo", ( text ) => text);
server.addMethod("log", ( message ) => console.log(message));



app.post("/do", (req, res) => {
    const jsonRPCRequest = req.body;
    // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
    // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            // If response is absent, it was a JSON-RPC notification method.
            // Respond with no content status (204).
            res.sendStatus(204);
        }
    });
});


app.listen(8081, ()=>{
    console.log("yolo started at http://127.0.0.1:8081")
});
