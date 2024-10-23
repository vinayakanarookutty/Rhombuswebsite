var express=require("express")
var app=express()
var bodyparser=require("body-parser")
var mongoose=require("mongoose")
var router=express.Router()
app.use(bodyparser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/cardcollection")
app.listen(3000,()=>{
    console.log("Server Started 3000")
})
var cardSchema=mongoose.Schema({
    cvv:String,
    cardHolderName:String,
    cardNumber:String,
    expiryDate:String
 })

 var cardModal=mongoose.model("cardList",cardSchema)

router.get("/cards",async (req,res)=>{
    var card= await cardModal.find({})
    res.json(card)
})
router.post("/create",async (req,res)=>{
    console.log(req.body)
    var newCard=new cardModal(req.body)
    await newCard.save()
    res.status(200).json(newCard)
})