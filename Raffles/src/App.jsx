import { useState, useEffect } from 'react'

import './App.css'

const API_URL = import.meta.env.VITE_BASE_URL

function App() {
  const [raffles, setRaffles] = useState([])
  const [name, setName] = useState("");
  const [secretToken, setSecretToken] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/raffles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, secret_token: secretToken}),
      });
      if (response.ok) {
        const newRaffle= await response.json();
        console.log(newRaffle);
        setRaffles([...raffles, newRaffle])
        setName("");
        setSecretToken("");
        fetchData();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const fetchData = async () => {
    try {
      // setLoading(true);
      // setError("");
      console.log(API_URL);
      const response = await fetch(`${API_URL}/api/raffles`);
      const {data}  = await response.json();
      if (response.ok) {
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
     <h1>RaffleMania App</h1>
     <h2>Create a raffle</h2>
     <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Raffle name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div> 
        <label htmlFor='secretToken'>secret Token</label>
        <input
          type='text'
          id='secretToken'
          value={secretToken}
          onChange={(e) => setSecretToken(e.target.value)}
        />
      </div>
      <button type='submit'>Create Raffle</button>
    </form>

      <h2>Current Raffles</h2>
      <div>
        {raffles.map((raffle) => (
          <p key={raffle.id}>{raffle.name}</p>
        ))} 
        </div>
     </div>
    </>
  )
}

export default App
