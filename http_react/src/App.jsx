import { useState, useEffect } from 'react'

const url = "http://localhost:3000/products"

import './App.css'

function App() {
  // salvar e controlar os dados
  const [products, setProducts] = useState([]);

  // resgatar os dados da Api
  useEffect(() => {
    
    // função assincrona em "fetch", recurso do javascript para chamadas assincronas
    async function getData() {
      
      const res = await fetch(url);

      const data = await res.json();

      // console.log(data);
      setProducts(data);
    }

    // executando a função de resgatar os dados
    getData();
  }, []);

  // envio de dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    console.log(product);
  };


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
        {/* enviando dados */}
        <div className='add-product'>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome: </span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              <span>Preço: </span>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </label>
            <input type="submit" value="Enviar"/>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
