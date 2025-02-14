import { useState, useEffect } from 'react';
import './App.css';
import Image1 from './assets/mob.jpg'
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.restful-api.dev/objects");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Product List:</h2>
      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
              <img src={Image1} alt="Mobile" className="product-image" />
            <h3 >{item.name}</h3>
            {item.data ? (
              <ul>
                {Object.entries(item.data).map(([key, value], index) => (
                   ( 
                    <li key={index}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <p>No additional data available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
