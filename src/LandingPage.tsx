import { useState } from 'react'
import useNewsSearch from './Hooks/useNewsSearch'
import News from './components/News';

function LandingPage() {
    const [page,setPage] = useState(0);
    const [query,setQuery] = useState('');
    const {hasMore,loading,news,error} = useNewsSearch(page,query); 
    const options = [
        {label : "Choose Specific topic", value : 0},
        {label : "business" , value : 1},
        {label : "entertainment",  value :2},
        {label : "health" , value : 3},
        {label : "science" , vlaue : 4},
        {label : "sports", value :5},
        {label: "technology", value : 6},
    ]
  return (
    <div>
        <div>
            <div className='m-auto'>
           <select name="" id="" defaultValue={query} onChange={(e)=>setQuery(e.target.value)}>
            {options.map(item=>(
                <option value={item.value}>{item.label}</option>
            ))}
           </select>
            </div>
            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {news.map(item=>(
                    <News key={item.url} items = {item} />
                ))}
            </div>
            <div>{loading && 'Loading'}</div>
            <div>{error && 'Error'}</div>
        </div>
    </div>
  )
}

export default LandingPage