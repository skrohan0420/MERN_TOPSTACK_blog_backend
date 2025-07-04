express = require('express');
const app = express()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const mongoDB = require('./database/db')
const cors = require('cors');
mongoDB();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 



app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/blog', blogRoutes)



// REST METHODS
// GET - to request data from the server
// POST - to send data to the server
// PUT - to update data on the server
// DELETE - to delete data from the server
// PATCH - to apply partial modifications to a resource
// OPTIONS - to describe the communication options for the target resource
// HEAD - to retrieve the headers for a resource without the body
// TRACE - to perform a message loop-back test along the path to the target resource
// CONNECT - to establish a tunnel to the server identified by the target resource

// MVC 
// Model - Represents the data and business logic
// View - Represents the user interface
// Controller - Handles user input and interacts with the model

app.listen(8000)