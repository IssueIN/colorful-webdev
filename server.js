if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const Manufacturer = require('./models/manufacturer')
const Product = require('./models/product')
const Solution = require('./models/solution')
const User = require('./models/user')

const initializePassport = require('./passport-config')
initializePassport(passport, 
  username => User.findOne({username: username}),
  id => User.findById(id)
)

const indexRouter = require('./routes/index')
const manufacturerRouter = require('./routes/manufacturers')
const productRouter = require('./routes/products')
const solutionRouter = require('./routes/solutions')
const userRouter = require('./routes/user')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(async (req, res, next) => {
  try {
    res.locals.categories = await Product.schema.path('category').enumValues;;
    res.locals.manufacturers = await Manufacturer.find({}).exec();
    res.locals.solutions = await Solution.find({}).exec();
    res.locals.searchOptions = req.query;
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/greeting', (req, res) => {
  const reponse = 'hello!';
  res.status(200);
  res.send(response);
})

app.use('/', indexRouter)
app.use('/manufacturers',manufacturerRouter)
app.use('/products', productRouter)
app.use('/solutions', solutionRouter)
app.use('/user', userRouter)

app.listen(process.env.PORT || 3000)