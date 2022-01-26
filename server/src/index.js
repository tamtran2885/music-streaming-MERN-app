import express from 'express';
import 'dotenv/config'

const app = express();


//?settings

app.set('port', process.env.PORT || 4000)

//?middlewares



//?routes



//?static files



//?port

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});