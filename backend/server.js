let express     = require('express'),
    path        = require('path'),
    mongoose    = require('mongoose'),
    cors        = require('cors'),
    bodyParser  = require('body-parser'),
    dbConfig    = require('./database/db');


// Connecting with Mongo DB

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
})
.then(() => {
      console.log('MongoDB Successfully Connected');
   },
   error => {
      console.log('MongoDB Not Connected: ' + error);
   }
);

// Initialising The Express and Setting Up The Port

const employeeRoute = require('../backend/routes/employee.route')
const app = express();//initialising the express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));//Integrating Angular and Express file -mean-stack-crud-app
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));//virtual path
app.use('/api', employeeRoute);


app.get('/home',(req,res)=>{
  res.send("Welcome to my Server");
})

// Assign Port Number

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server started on port:${port}`);
});

// Error Handler

app.use(function (err, req, res, next) {
    console.error(err.message);                   // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500;    // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
  });