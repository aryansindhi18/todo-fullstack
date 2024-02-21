export function ToDos({todos,fetchData}){
    return(
        <div className="list-wrapper" onTouchMove={fetchData}> 
            {todos.map((todo)=>{
                return(
                    <div className="item">
                        <div>
                        {/* <div><h3>{todo.description}</h3></div> */}
                        <div class="item-title">{todo.title}</div><div>{todo.description}</div>
                        <button className={todo.isDone==true?"done":""} type="button" onClick={async ()=>{
                            await fetch(`http://localhost:3000/complete-todo/${todo._id}`,{
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                  }
                            })
                            fetchData();
                        }}>
                            {todo.isDone==true ? "Completed!":"Done..."}
                        </button>
                        </div>
                        {/* {todo.isDone==true ? "Completed!":"Done..."} */}
                    </div>
                )
            })}
        </div>
    )    
}





