import { useState, useEffect } from 'react';
import "./App.css";


const url = "http://localhost:3000/products"

import { useFetch } from './hooks/useFetch';

function App() {
  // salvar e controlar os dados
  const [products, setProducts] = useState([]);

  // 1 - resgatar os dados da Api
  
  // 4 - custom hook
  // renomeando o data para items
  const {data: items, httpConfig, loading} = useFetch(url);

  // Substituido pelo custom hook
  // useEffect(() => {
    
  //   // função assincrona em "fetch", recurso do javascript para chamadas assincronas
  //   async function getData() {
      
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     // console.log(data);
  //     setProducts(data);
  //   }

  //   // executando a função de resgatar os dados
  //   getData();
  // }, []);

  // 2 - envio de dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // função para o envio dos dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // objeto com os dados dos 'states'
    const product = {
      name,
      price,
    };

    // 5 - refatorando POST
    
    
    // // console.log(product);
    
    // // variavel POST
    // const res = await fetch(url, {
      //   // configuração da requisição
      //   method: "POST",
      //   // padronizando os dados trafegados entre aplicação e api
      //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   // dados da requisição. enviando em formato de 'texto'
        //   body: JSON.stringify(product),
        // });
        
        // // 3 - carregamento dinâmico
        // const addedProduct = await res.json();
        
        // setProducts ((prevProducts) => [...prevProducts, addedProduct]);
    httpConfig(product, "POST");
  };

  return (
      <div className='App'>
        <h1>HTTP em React</h1>
        {/* 6 - loading */}
        {loading && <p>Carregando...</p>}
        {/* apresentação dos dados */}
        <ul>
          {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
          {items &&
          items.map ((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
          ))}
        </ul>
        {/* enviando dados */}
        <div className='add-product'>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input 
              type="text" 
              value={name} 
              name="name"
              onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Preço:
              <input 
              type="text" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}/>
            </label>
            {/* <input type="submit" value="Enviar"/> */}
            {/* 7 - loading post */}
            {loading && <input type='submit' disabled value="Aguarde"/> }
            {!loading && <input type='submit' value="Criar"/> }
          </form>
        </div>
      </div>
  );
}

export default App;
