const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const dotenv = require('dotenv')
dotenv.config(); //intitalise env variables


// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)//any req coming to /admin/____ , will be directed to the imported "adminRouter'
app.use("/user", userRouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


