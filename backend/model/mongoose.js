import mongoose from 'mongoose'

const mongooseConnect = async (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected'))
        .catch((err) => console.log(`Error connecting to database: ${err}`));
}

export default mongooseConnect