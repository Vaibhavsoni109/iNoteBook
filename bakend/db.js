const mongoose=require("mongoose")


connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
    await mongoose.connect("mongodb+srv://vaibhavsoni5179:Wvhk5UFSx7DWQGnH@cluster0.wlrvjqs.mongodb.net/?retryWrites=true&w=majority");
    console.log("conneted to mongo succesfully")
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  

module.exports=connectToMongo;