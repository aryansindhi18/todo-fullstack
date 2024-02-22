const express = require("express");
const app = express();
const {createToDoSchema,updateToDoSchema} = require("./types.js");
const { toDo } = require("./db.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.get("/todos",async (req,res)=>{
    //fetch data from mongodb

    const todos = await toDo.find({}).sort({ CreatedOn: -1 });

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


    const todo = await toDo.findById(req.params.todoid);
    if (!todo) {
      // Handle the case where todo is not found
      console.log('Todo not found');
      return res.status(401).json({msg:'wrong inputs...'});
    }
    
    // Toggle the value of isDone
    todo.isDone = !todo.isDone;
    
    // Save the updated todo
    await todo.save();


    /*await toDo.updateOne({
        _id: req.params.todoid
    },{
        isDone: true,
        CreatedOn: Date.now()
    })*/


    return res.status(200).json({msg:"todo marked as done..."})
})


app.put("/update-todo/:todoid",async (req,res)=>{
    //update in mongodb
    const updatePayLoad = {title: req.body.title,
        description: req.body.description};
        // console.log(`line 21 ${createPayLoad}`)
        const parsedPayLoad = createToDoSchema.safeParse(updatePayLoad)
        if(!parsedPayLoad.success){
            return res.status(411).json({msg: "wrong inputs..."})
        }

        try{
            const result = await toDo.updateOne({
                _id: req.params.todoid
            },{
                title: req.body.title,
                description:req.body.description,
                CreatedOn: Date.now()
            })
            return res.status(200).json({msg:"data updated succesfully...",
            data: {...updatePayLoad,id: result._id}});
            }
            catch(err){
                console.log(err)
                return res.status(500).json({msg:"Error in saving data, please try again..."})
            }

})

app.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    await toDo.deleteOne({_id:id})
    res.status(200).json({msg:"data deleted successfully!"})
})

app.listen(3000);