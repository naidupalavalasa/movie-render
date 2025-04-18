import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const[search,setSearch] = useState('');
  const[data,setData] = useState([]);

  const submitHandler=(e)=>{
      e.preventDefault();
      fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
        response => response.json()
      ).then(value => setData(value.Search));
  }

  const download=(url)=>{
    fetch(url).then(response =>{
      response.arrayBuffer().then(function(buffer){
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download','image.png');
        document.body.appendChild(link);
        link.click();
      })
    })
    .catch(err => {
      alert(err);
    });
  }

  return (
   <>
   <div>
    <center><br/><br/>
    <h1 style={{color : 'white'}}>Show Time</h1>
    <form onSubmit={submitHandler} style={{margin:'2em'}}>
    <input type='text' placeholder='Search your favourite movies and webseries...' 
    value={search} 
    onChange={(e)=>setSearch(e.target.value)}
     />

    <input type='submit' value='Search' className='search'/>

    </form>
    <div className='row'>
    {data.map(movie => 
    <div className='col-md-4'>
    <div className='card' style={{"width":"18rem","height":"30rem","margin":"2em"}}>
      <img src={movie.Poster} className='card-img' alt={movie.Title} style={{height:'22rem',width:'18rem'}}/>
      <div className='card-body'>
        <h5 className='card-text'>{movie.Title}</h5>
        <a href={movie.Poster} className='btn btn-primary' onClick={()=>download(movie.Poster)} download>Download</a>
      </div>
    </div>
    </div>

    )}
    </div>
    </center>
   </div>
   </>
  );
}
export default App;
