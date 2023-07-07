import logo from './logo.svg';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import ContentCard from './Components/ContentCard';
import { useState } from 'react';
import axios from 'axios';
function App() {


  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.chucknorris.io/jokes/categories',
      headers: {}
    }
    axios.request(config)
      .then((res) => {
        // console.log(res.data);
        let data = res.data
        setCategories(data)
      }).catch((error) => {
        console.log("Error Occoured", error);
      })
  }
  useState(() => {
    getCategories()
  }, [])


  console.log("carteette", categories);
  return (
    <div className='app'>
      <Container>
        <div className="header">
          <h1>
            Chuck Norries
          </h1>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <>
              <ContentCard cardkey={category} key={category} category={category} />
            </>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
