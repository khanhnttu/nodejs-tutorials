import express  from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.static('src/public'))
app.use(express.json())

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');


mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Connect DB success')
})
.catch((err) => {
    console.log(err)
})

routes(app)

app.listen(port, () => {
    console.log('Server is running in port:', port)
})