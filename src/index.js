const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('address', 'localhost')

//Midelwares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, authentication, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.json())

app.use(require('./routes/boats'))
app.use(require('./routes/user'))
app.use(require('./routes/cotizations'))


app.listen(app.get('port'), () => {
    console.log('server in the port ', app.get('port'))
})