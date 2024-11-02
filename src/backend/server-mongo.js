import express from "express"
import mongoose from "mongoose"

const app = express()
const PORT = 5173

const mongoURI = "mongodb+srv://fatimatariq8:AIebicgo8wqu3sf8@cluster0.gmcfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURI)
.then(()=> console.log('mongo connected'))
.catch(err=> console.log(err))