import { useState } from "react"

export function CreateToDo(props){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    return(
        <div className="input">
            <input type="text" id="title" placeholder="title" value={title} onChange={(e)=>{
                setTitle(e.target.value);
            }}/>
            <br />
            <input type="text" id = "description"placeholder="description" value={description} onChange={(e)=>{
                console.log(`description: ${e.target.value}`);
                setDescription(e.target.value);
            }}/>
            <br />
            <button onClick={async ()=>{
                setTitle(title);
                setDescription(description);


                await fetch("http://localhost:3000/add-todo",{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({title:title,description:description})
                  });
                //   props.SetToDos([]);
                // document.getElementById("title").innerHTML=""
                // document.getElementById("description").innerHTML=""
                setTitle("");
                setDescription("");
                  props.fetchData();
            }}>Add To Do</button>
            <button onClick={props.fetchData}>Refresh</button>
        </div>
    )
}