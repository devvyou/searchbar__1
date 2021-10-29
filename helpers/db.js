const { connect } = require('mongoose');

const connectToAtlas = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDb Atlas has been reached successfully !')
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = connectToAtlas;