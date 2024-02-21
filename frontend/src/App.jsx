import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateToDo } from './assets/components/CreateToDo'
import { ToDos } from './assets/components/ToDos'
// const {baseUrl} = require("./BaseUrl.js")
import baseUrl from "./BaseUrl.js"

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         Hi There
//         <br></br>
//         <br />
//         <CreateToDo></CreateToDo>
//         <ToDos todos={[{
//           tittle:"title1",
//           description: "description1",
//           isDone: false
//         },
//         {
//           tittle:"title2",
//           description: "description2",
//           isDone: true
//         }]}></ToDos>
//       </div>
//     </>
//   )
// }

function App() {
  const [todos, setToDos] = useState([/*{title:"titulo1",description:"desc1",isDone:false}*/])
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  
  async function fetchData(){
    let res = await fetch(`${baseUrl}todos`);
    let data = await res.json();
    // console.log(`hello ji data dekhya jaye: ${data.data}`)
    setToDos(data.data);
  }
  // fetchData();

  return (
    <>
      <div className='container'>
      <h1 className="heading">Don't Forget To...</h1>
        <br></br>
        <br />
        <CreateToDo fetchData={fetchData} setToDos={setToDos}></CreateToDo>
        <ToDos todos={todos} fetchData={fetchData} ></ToDos>
      </div>
    </>
  )
}


export default App
