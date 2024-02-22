import { useState,useEffect } from 'react'
import './App.css'
import { CreateToDo } from './assets/components/CreateToDo'
import { ToDos } from './assets/components/ToDos'
import { Footer } from './assets/components/Footer.jsx'

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
  // console.log(`line 40`)
  // console.log(import.meta.env.VITE_REACT_APP_BASEURL)
  async function fetchData(){
    let res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}todos`);
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
        <Footer></Footer>
      </div>
    </>
  )
}


export default App
