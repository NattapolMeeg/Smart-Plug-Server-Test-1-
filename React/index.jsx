import React from 'react'

function MyProject(){
    const [electrical, setVolt] = useState([]);

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/electrical')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setVolt(data);
        });
      }, []);
    


    return(
      <>
        <div>
            <h1>Hello From React</h1>
        </div>
        <div>
          <h2>This is Electrical Data</h2>
        </div>
        <div>
          <h2>Electrical Data</h2>
        {electrical.map((photo) =>(
          <img key={electrical.id} src={electrical.url} alt={electrical.title}/>
        ))} 
      </div>
    </>    
    )
}
