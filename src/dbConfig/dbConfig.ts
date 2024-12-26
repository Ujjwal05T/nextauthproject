import mongoose from "mongoose";


export async function connect(){
    try {
        //argument is in string we have to make sure it is always string either check type using if else or if u know directly than write exclaimaition at the end(!)
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        console.log("Connected to MongoDB");
        //To check if connection is made or not
        //When connected
        connection.on('connected',()=>{
            console.log("Connected")
        })

        //When error
        connection.on('error',(err)=>{
            console.log("Connection Error:"+ err)
            process.exit()
        })
    }
    catch(error){
        console.error(error);
        console.log("Something went wrong")
    }
}