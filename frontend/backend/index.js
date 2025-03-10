const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = 8000
const dbconnect=()=>{
    const con = mongoose.connect('mongodb://localhost:27017/DataSIr')
    if(con){
        console.log('Database is connected');
    }else{
        console.log('Database is not connected');
    }
}
dbconnect()

// const dataSchema = mongoose.Schema({
//     Duration: Number,
//     Pulse: Number,
//     Maxpulse: Number,
//     Calories: Number
// })

const citySchema = mongoose.Schema({
    cityCode: String,
    cityName: String,
    stateCode: String
})

const countrySchema = mongoose.Schema({
    countrCode: String,
    countryName: String,
})
const stateSchema = mongoose.Schema({
    stateCode: String,
    stateName: String,
    countryCode :String
})
// const datamodel =  mongoose.model('hellos',dataSchema)
const citymodel =  mongoose.model('citys',citySchema)
const countrymodel =  mongoose.model('countrys',countrySchema)
const statemodel =  mongoose.model('states',stateSchema)


// app.get('/pdata',async(req,res)=>{
//     // const {Duration,Pulse,Maxpulse,Calories} = req.body
//     const {page=1,limit=5,name} = req.query
//     const pagevalue = Number(page)
//     const limitvalue = Number(limit)
//     const skip = (pagevalue-1)*limitvalue
//     if(name.length>0){
//         const Data = await datamodel.find({$or:[{Name:{$regex: new RegExp(name,'i')}},{Duration:{$regex: new RegExp(name,'i')}}]}).skip(skip).limit(limitvalue)
//         const total = await datamodel.find({Name:{$regex:new RegExp(name,'i')}}).countDocuments()
//         try{
//           return  res.json({
//                 total:total,
//                 page:pagevalue,
//                 limit:limitvalue,
//                 totalPage: Math.ceil(total / limitvalue),
//                 message:"Data get Successfully",
//                 status:200,
//                 data:Data
    
//             })
//         }catch(err){
//             console.log(err);
            
//         }
//     }else{    
//         const Data = await datamodel.find().skip(skip).limit(limitvalue)
//         const total = await datamodel.find().countDocuments()
//         try{
//             res.json({
//                 total:total,
//                 page:pagevalue,
//                 limit:limitvalue,
//                 totalPage: Math.ceil(total / limitvalue),
//                 message:"Data get Successfully",
//                 status:200,
//                 data:Data
    
//             })
//         }catch(err){
//             console.log(err);
            
//         }
//     }
    
    
// })


app.get('/api/city',async(req,res)=>{
    const {stateCode} = req.query
    const City = await citymodel.find({stateCode});
    res.json({
        status:200,
        message:"Successfully Get City",
        city:City
    })
})

app.get('/api/country',async(req,res)=>{
    
    const Country = await countrymodel.find();    
    try{
        res.json({
            status:200,
            message:"Successfully Get Country",
            Country:Country
        })
    }catch(err){
        console.log(err);
        
    }
   
})

app.get('/api/state',async(req,res)=>{
    const {countryCode} = req.query
    const State = await statemodel.find({countryCode});
    res.json({
        status:200,
        message:"Successfully Get State",
        State:State
    })
})
app.listen(port,async()=>{
    console.log("Server is connected Successfully")
    
})