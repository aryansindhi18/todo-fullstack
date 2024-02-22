import baseUrl from "../../BaseUrl.js"
import { useState } from "react"
import { RiChatDeleteFill } from "react-icons/ri";
import { BiSolidCommentEdit } from "react-icons/bi";
import { CgUndo } from "react-icons/cg";


export function ToDos({todos,fetchData}){
    const [message, setMessage] = useState("");
    const [editTodo, setEditTodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
    }

    const handleEdit = (todo) => {
        setEditTodo(todo);
        setEditedTitle(todo.title);
        setEditedDescription(todo.description);
    };

    const handleSave = async () => {
        if(!editedTitle.trim()){
            showMessage("Title cannot be empty...");
            // alert("Title cannot be empty...")
            return;
        }
        const editedTodo = {
            ...editTodo,
            title: editedTitle,
            description: editedDescription,
        };

        // Make API call to update todo item with edited values
        await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}update-todo/${editTodo._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTodo),
        });
        // Fetch updated todos
        fetchData();
        // Reset edit state
        setEditTodo(null);
    };


    return(
        <div className="list-wrapper" > 
            {todos.map((todo)=>{
                return(
                    <div key={todo._id} className="item">
                        <div>
                        { editTodo===todo ? (
                            <>
                            <input style={{ overflowX: "auto" }}
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <input style={{ overflowX: "auto" }}
                                type="text"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={()=>{
                                setEditTodo(null);
                            }}>Cancel</button>
                        </>
                        ) : (
                        <>
                        <div className="item-title">{todo.title}</div>
                        <div>{todo.description}</div>
                        {/* -------------------------------------------------------------------------- */}
                        <button className={todo.isDone==true?"done":""} type="button" onClick={async ()=>{
                            await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}complete-todo/${todo._id}`,{
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                        }}>
                            {todo.isDone==true ? "Completed!":"Done..."}
                        </button>
                        {/* -------------------------------------------------------------------------- */}
                        {!todo.isDone && <BiSolidCommentEdit title="Edit ToDo" className="edit" onClick={() => handleEdit(todo)}/>}
                        {/* -------------------------------------------------------------------------- */}
                        {todo.isDone && <CgUndo title="Undo Completed..." className="undo" onClick={async ()=>{
                            await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}complete-todo/${todo._id}`,{
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                        }}/>}
                        {/* -------------------------------------------------------------------------- */}
                        <RiChatDeleteFill title="Delete ToDo" className="delete" onClick={async()=>{
                            await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}delete/${todo._id}`,{
                                method:"DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                            showMessage("ToDo deleted successfully..."); 
                        }} />
                        {message && <div className="alert-delete">{message}</div>} 
                    </>
            )}
            </div>
                    </div>
                )
            })}
        </div>
    )    
}





