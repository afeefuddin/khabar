import axios from "axios";
import { useEffect, useState } from "react";

export default function useNewsSearch(page:number,query: string){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [news,setNews] = useState([
        
    ]);


//     {
//         source : {},
//         author : 'afeef',
//         title : 'Single Slit Experiment',
//         description : 'lorem32jaldkjfhhhh hola amigokdasfkadsk;l hahgdslfjhads;hfkjladsblfkhkjadsgf;jdsafjk;ldsf adsmf kladshfhasu',
//         url : 'url',
//         urlToImage : 'https://images.cnbctv18.com/wp-content/uploads/2023/12/2023-12-01t121615z-2009818674-rc2bo4az653z-rtrmadp-3-apple-paramount-global-streaming-1019x573.jpg',
//         publishedAt : '32/12/2022',
    
// }

    useEffect(()=>{
        setNews([])
    },[query])

    const[hasMore,  setHasMore] = useState(false);
    useEffect(()=>{
        setLoading(true);
        setError(false);
       let params = {}
        if(query!==''){
             params = {
                'country' : 'in',
                'category' : query,
                'apiKey' : import.meta.env.VITE_API_KEY,
                'page' : page,
    
            }
        } else{
                params = {
                    'country' : 'in',
                    'apiKey' : import.meta.env.VITE_API_KEY,
                    'page' : page
        
                }
            }
        async function getData(){ 
            // 'https://newsapi.org/v2/top-headlines'
            try{

                const res = await axios.get(import.meta.env.VITE_API_URL,{ params })
                const data = await res.data;
                console.log(data.articles);
                setNews(prevBooks => {
                    return [...prevBooks,...data.articles]
                })
                setHasMore(data.totalResults>0)
                setLoading(false);
            }
            catch(error){
                console.log("Error Fetching the Data");
                setError(true);
            }
            
        }
        getData();
    },[page,query])
    return {hasMore,loading,news,error}
}