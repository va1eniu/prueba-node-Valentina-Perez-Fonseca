import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connectionDB =await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `Incializado en ${connectionDB.connection.host} en el puerto ${connectionDB.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(error);
    }
}

export default conectarDB;