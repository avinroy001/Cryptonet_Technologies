import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const search = window.location.search;
  const urlParams = new URLSearchParams(search);

  const page = urlParams.get("page");
  const results = urlParams.get("results");
  const seed = urlParams.get("seed");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}`);
        setData(res.data.results);
        console.log(res.data);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [page, results, seed]);

  console.log(data);

  return (
    <div>
      {isLoading ? (
        <div className='load'><p>Loading...</p></div>
      ) : (
        <div className='wrapper'>
          {data && data.map((card, index) => (
            <div className='cardWrapper' key={index}>
              <div>
                <img src={card.picture.large} alt='pic' /> 
              </div>
              <div className='block'>
              <div className='fullname'>
                <p>{card.name.first}</p> 
                <p>{card.name.last}</p>
              </div>
              <div>
                <p>{card.gender[0].toUpperCase()}{card.gender.slice(1)}</p>
              </div>
              <div>
                <p>{card.phone}</p>
              </div>
              </div>
            </div>
          ))}
          
        </div>
      )}
      
    </div>
  );
}

export default App;
