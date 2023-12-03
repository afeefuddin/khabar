import { useCallback, useRef, useState } from 'react'
import useNewsSearch from './Hooks/useNewsSearch'
import News from './components/News';
import './LandingPage.css'

function LandingPage() {
    const [page,setPage] = useState(1);
    const [query,setQuery] = useState('');
    const {hasMore,loading,news,error} = useNewsSearch(page,query); 
    const options = [
        {label : "Choose Specific topic", value : ''},
        {label : "Business" , value : 'business'},
        {label : "Entertainment",  value :'entertainment'},
        {label : "Health" , value : 'health'},
        {label : "Science" , vlaue : 'science'},
        {label : "Sports", value :'sports'},
        {label: "Technology", value : 'technology'},
    ]
    const observer = useRef();
    const lastNews = useCallback(node=>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                console.log('Visible');
                setPage(prev=>prev+1)
            }
        })
        if(node) observer.current?.observe(node)
    },[loading,hasMore])


  return (
    <div className='m-0' >
        <div >
            <div className='bg-gray-950 h-20 rounded flex flex-row justify-between pl-6 pr-12 items-center'>
                <div className='text-4xl text-yellow-50'>Khabar</div>
            <div className=''>
           <select name="" id="" defaultValue={query} onChange={(e)=>setQuery(e.target.value)}>
            {options.map(item=>(
                <option value={item.value}>{item.label}</option>
            ))}
           </select>
            </div>
            </div>
            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {news.map((item,index)=>{
                    if(index + 1 == news.length){
                        return <div ref ={lastNews}><News key={item}  items = {item} /></div>
                    }
                    return <div><News key={item.url} items = {item} /></div>
                })}
            </div>
            <div className='loader m-auto'>{loading &&  hasMore && ''}</div>
            <div>{error && !hasMore && 'Error'}</div>
        </div>
    </div>
  )
}

export default LandingPage