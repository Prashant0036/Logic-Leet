const express = require('express');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('path');
const main = require("./config/db")
const client = require("./config/redis_db");


const authRouter = require("./routes/userAuth");
const problemRouter = require("./routes/problemHandler");
const submitRouter = require('./routes/submit')
const aiRouter = require("./routes/aiChatting");
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')


app.use(express.static(path.join(__dirname, '../public')));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://logicleet.run.place",
];

if (process.env.ALLOWED_ORIGINS) {
  const envOrigins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
  allowedOrigins.push(...envOrigins);
}

app.use(cors((req, callback) => {
  const origin = req.header('Origin');
  const host = req.get('host'); // e.g. "logicleet.com" or "localhost:3000"
  
  let corsOptions = { credentials: true };
  
  if (!origin) {
    corsOptions.origin = true;
  } else {
    // Strip protocol (http:// or https://) to match hostname + port
    const originHost = origin.replace(/^https?:\/\//, '');
    
    if (allowedOrigins.includes(origin) || originHost === host) {
      corsOptions.origin = true;
    } else {
      corsOptions.origin = false;
    }
  }
  
  callback(null, corsOptions);
}));


app.use(express.json()); // converts json req.body into JS Object
app.use(cookieParser()); //middleware lets Express read and parse cookies from the Cookie header in incoming requests.

app.use("/user", authRouter); //authRouter will handle the /user request  
app.use("/problem", problemRouter); //problemRouter will handle the /problem request  
app.use("/submission", submitRouter);
app.use('/ai', aiRouter);
app.use("/video", videoRouter);

// Fallback for React Router client-side routing
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

async function initializeConnection() {


  try {



    await client.connect();
    console.log("Connected To Redis");

    await main();
    console.log("Connected to DB");

    app.listen(process.env.PORT, () => {
      console.log("Server listening at port number: " + process.env.PORT);

    })


  }
  catch (err) {
    console.error(err);


  }


}

initializeConnection();

