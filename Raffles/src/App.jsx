import { useState, useEffect } from 'react'

import './App.css'

const API_URL = import.meta.env.VITE_BASE_URL

function App() {
  const [raffles, setRaffles] = useState([])


  const fetchData = async () => {
    try {
      // setLoading(true);
      // setError("");
      console.log(API_URL);
      const response = await fetch(`${API_URL}/api/raffles`);
      const {data}  = await response.json();
      if (response.ok) {
        console.log(data);

        setRaffles(data);
      } else {
        throw new Error(errorMsg);
      }
    } catch (err) {
      throw new Error(err.message);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);




  return (
    <>
     <div className="App">  
     <h1>Raffles</h1>
      <ul>
        {raffles.map((raffle) => (
          <li key={raffle.id}>{raffle.name}</li>
        ))} 
        </ul>
     </div>
    </>
  )
}

export default App
