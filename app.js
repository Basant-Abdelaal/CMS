//import { globalVariables } from "./config/configuration.mjs";

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const fileupload = require('express-fileupload');

const { mongoDbURL, PORT, globalVariables } = require('./config/configuration.js');
const { selectOption } = require('./config/customFunctions');

const app = express();

//Configure Mongoose
mongoose
  .connect(mongoDbURL, { useUnifiedTopology: true })
  .then((res) => { console.log('Mongoose Connected successfully!'); })
  .catch((err) => { console.log('Mongoose Connection failed!'); });

//configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Flash and session
app.use(session({
  secret: 'anysecret',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());


/*Use Global Variables*/
app.use(globalVariables);

/*File Upload Middleware*/
app.use(fileupload());

//Setup engine to use handlebars
app.engine('handlebars', hbs({
  defaultLayout: 'default',
  helpers: { select: selectOption }
}));
app.set('view engine', 'handlebars');

/* Method Override Middleware */
app.use(methodOverride('newMethod'));


//Routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
