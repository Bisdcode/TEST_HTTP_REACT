import { useState, useEffect } from 'react'

const url = "http://localhost:3000/products"

import './App.css'

function App() {
  // salvar e controlar os dados
  const [products, setProducts] = useState([]);

  // buscar os dados da Api
  useEffect(() => {
    
    // função assincrona em "fetch", recurso do javascript para chamadas assincronas
    async function getData() {
      
      const res = await fetch(url);

      const data = await res.json();

      // console.log(data);
      setProducts(data);
    }

    // executando a função
    getData();
  }, []);

  return (
    <>
      <div className='App'>
        <h1>HTTP em React</h1>
        {/* apresentação dos dados */}
        <ul>
          {products.map ((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
