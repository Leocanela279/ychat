import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import {createServer} from 'http'
import 'dotenv'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on('message', (msg) => {
    if (msg.trim() === "") {
      return;
    }
    console.log(`message received: ${msg}`)
    socket.broadcast.emit("message", msg)
  })
})

app.get("/health", (req,res) =>{

return res.send({
message:"ok",
})
});


httpServer.listen(PORT);
