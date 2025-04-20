express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/list', (req, res) => {
    res.send('list')
})

app.listen(8000)