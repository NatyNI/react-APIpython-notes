import { useState, useEffect } from 'react'
import axios from "axios";
import Notes from "./Notes/Notes"



function App() {
 
  const [data, setData] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://127.0.0.1:5001/get")
      .then(response => {
        setData(response.data); 
        console.log(response.data) 
      })
      .catch((error) =>{
        console.error("An error occurred:", error);
      })
  }, []);  


  return (
    <div>
      <Notes notes={data} />
    </div>
  );
};

export default App;
