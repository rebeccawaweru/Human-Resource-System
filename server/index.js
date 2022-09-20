require('dotenv').config()
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
require('express-async-errors')
const app = express();
const connectDB = require('./db/connect')
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.raw({type:'application/octet-stream'}));
app.use(express.json())
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));
//routes
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/job')
const appRouter = require('./routes/application')
const ipayRouter = require('./routes/i-pay')
const messageRouter = require('./routes/message')
const uploadRouter = require('./routes/upload')






app.use('/', authRouter)
app.use('/', jobRouter)
app.use('/',appRouter)
app.use('/', ipayRouter)
app.use('/',messageRouter)
app.use('/', uploadRouter )
const port = process.env.PORT || 5000
const server = http.createServer(app);

const start = async()=>{
    try{
     connectDB(process.env.MONGO_URI)
     server.listen(port, ()=>{
        console.log(`Server is listening on port ${port}.......`);
     })
    }catch(err){
        console.log(err);
    }
}
start()



