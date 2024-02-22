import { useState } from "react"
import baseUrl from "../../BaseUrl.js"

export function CreateToDo(props){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [message, setMessage] = useState({msg:"",type:""});

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage({msg:"",type:""}), 5000); // Hide message after 5 seconds
    }   

    return(
        <div className="input">
            <input type="text" id="title" placeholder="title" value={title} onChange={(e)=>{
                setTitle(e.target.value);
            }}/>
            <br />
            <input type="text" id = "description"placeholder="description" value={description} onChange={(e)=>{
                // console.log(`description: ${e.target.value}`);
                setDescription(e.target.value);
            }}/>
            <br />
            <button onClick={async ()=>{
                setTitle(title);
                setDescription(description);

                if(!title.trim()){
                    showMessage({msg:"Title cannot be empty...",type:"delete"});
                    // alert("Title cannot be empty...")
                    return;
                }
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
                  showMessage({msg:"ToDo added successfully!",type:"green"}); 
            }}>Add To Do</button>
            <button onClick={props.fetchData}>Refresh</button>
            {/* console.log(`${message}`) */}
            {/* {message.msg && <div className={`alert-${message.type}`}>{message.msg}</div>}  */}
            {message.msg && <div className={`alert-${message.type}`}>{message.msg}</div>}
        </div>
    )
}