import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url) => {
    const [data, setData] = useState(null);

    // 5 - refatorando post
    // config do request
    const [config, setConfig] = useState(null);
    // pode ser post ou update
    const [method, setMethod] = useState(null);
    // ativar minha requisição
    const [callFetch, setCallFetch] = useState(null);

    // 6 - loading
    const [loading, setLoading] = useState(false);

    // 7 - erros
    const [error, setError] = useState(null); 

    // Config do cabeçalho da requisição POST
    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        }
    };

    // Codigo para o metodo get
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
        const fetchData = async () => {
            // 7 - tratando erros
            try {
                // 6 - loading
                setLoading(true);

                const res = await fetch(url);
                // transformar em um objeto javascript
                const json = await res.json();
            
                setData(json);

            } catch (error) {
                console.log(error.message);

                setError("Houve algum erro ao carregar os dados!");
            }
            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    // 5 - refatorando post
    useEffect(() => {
        const httpRequest = async () => {
            let json;

            if (method === "POST") {
                // 6 - loading
                setLoading(true);

                // biome-ignore lint/style/useConst: <explanation>
                let fetchOptions = [url, config];
                // coletando os dados url e config
                const res = await fetch(...fetchOptions);

                // inserindo os dados
                json = await res.json();

                setLoading(false);
            }
            // chamada para atualizar os dados
            setCallFetch(json);
        };

        // invocar função
        httpRequest();
    }, [config, method, url]); 
    // a mudança dos parametros acima "config, method e url", dispara essa função 

    return {data, httpConfig, loading, error};
};