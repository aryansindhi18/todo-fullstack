const express = require("express");
const app = express();
const {createToDoSchema,updateToDoSchema} = require("./types.js");
const { toDo } = require("./db.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.get("/todos",async (req,res)=>{
    //fetch data from mongodb

    const todos = await toDo.find({});

    return res.status(200).json({msg:"Ok Report",data: todos});
})

app.post("/add-todo",async (req,res)=>{
    const createPayLoad = {title: req.body.title,
    description: req.body.description};
    // console.log(`line 21 ${createPayLoad}`)
    const parsedPayLoad = createToDoSchema.safeParse(createPayLoad)
    if(!parsedPayLoad.success){
        return res.status(411).json({msg: "wrong inputs..."})
    }
    //put data in mongodb
    try{
    const result = await toDo.create({...createPayLoad,isDone: false})
    return res.status(200).json({msg:"data added succesfully...",
    data: {...createPayLoad,id: result._id}});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"Error in saving data, please try again..."})
    }

})

app.put("/complete-todo/:todoid",async (req,res)=>{
    const updatePayload = {id: req.params.todoid}
    const parsedPayLoad = updateToDoSchema.safeParse(updatePayload)

    if(!parsedPayLoad.success){
        return res.status(411).json({ms: "wrong inputs..."})
    }
    //update in mongodb
    await toDo.updateOne({
        _id: req.params.todoid
    },{
        isDone: true
    })


    return res.status(200).json({msg:"todo marked as done..."})
})

app.listen(3000);