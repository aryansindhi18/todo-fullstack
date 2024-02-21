import { useState } from "react"
import baseUrl from "../../BaseUrl.js"

export function CreateToDo(props){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [message, setMessage] = useState("");

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 5000); // Hide message after 2 seconds
    }

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


                await fetch(`${baseUrl}add-todo`,{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({title:title,description:description})
                  });
                setTitle("");
                setDescription("");
                  props.fetchData();
                  showMessage("ToDo added successfully!"); 
            }}>Add To Do</button>
            <button onClick={props.fetchData}>Refresh</button>
            {message && <div className="alert">{message}</div>} 
        </div>
    )
}
