import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();


app.get('/health', (req, res) => {

  res.status(200).json({

    status: 'ok'

  });

});

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL =
    process.env.CONNECTION_URL;

const PORT =
    process.env.PORT || 5000;



mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>
        app.listen(PORT,
            () =>
                console.log(
                    `Server Running on Port ${PORT}`
                )
        )
    )
    .catch((error) =>
        console.log(error)
    );
//initial commit for pipeline testing in the github action 

mongoose.set(
    'useFindAndModify',
    false
);