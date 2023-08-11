const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
const db = require('./models');

const userRoot = require('./routes/Users');
app.use('/auth', userRoot);

const linkRoot = require('./routes/Links');
app.use('/link', linkRoot);

const resetPassword = require('./routes/ResetPassword')
app.use('/reset', resetPassword)

db.sequelize.sync().then(() => {
    app.listen("8800", () => console.log("Server start on 8880"));
});
