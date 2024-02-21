import baseUrl from "../../BaseUrl.js"
import { useState } from "react"
import { RiChatDeleteFill } from "react-icons/ri";

export function ToDos({todos,fetchData}){
    const [message, setMessage] = useState("");

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000); // Hide message after 2 seconds
    }
    return(
        <div className="list-wrapper" > 
            {todos.map((todo)=>{
                return(
                    <div className="item">
                        <div>
                        {/* <div><h3>{todo.description}</h3></div> */}
                        <div class="item-title">{todo.title}</div><div>{todo.description}</div>
                        <button className={todo.isDone==true?"done":""} type="button" onClick={async ()=>{
                            await fetch(`${baseUrl}complete-todo/${todo._id}`,{
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                        }}>
                            {todo.isDone==true ? "Completed!":"Done..."}
                        </button>
                        <RiChatDeleteFill className="delete" onClick={async()=>{
                            await fetch(`${baseUrl}delete/${todo._id}`,{
                                method:"DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                            showMessage("ToDo deleted successfully..."); 
                        }} />
                        {message && <div className="alert-delete">{message}</div>} 
                        </div>
                        {/* {todo.isDone==true ? "Completed!":"Done..."} */}
                    </div>
                )
            })}
        </div>
    )    
}





