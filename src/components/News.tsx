import React from 'react'

interface IProps {
    items : {
        source : {};
        author : string;
        title : string;
        description : string;
        url : string;
        urlToImage : string;
        publishedAt : string;
    }
   
}

function News(props : IProps) {
    console.log(props)
  return (
    <div >
        <div className='flex flex-col rounded w-72 lg:w-96 bg-neutral-300 mt-4 mb-4'>
            <div className='h-60'>< img src={props.items.urlToImage} className='h-60 w-auto rounded' alt="" /></div>
            <div className='flex flex-col text-left p-5'>
                <div className='font-bold text-lg text-left'>{props.items.title}</div>
                <div>{props.items.description}</div>
                <div className='flex flex-row justify-between'>
                    <div>{props.items.author || 'afeefuddin' }</div>
                    <div>{props.items.publishedAt}</div>
                </div>
            <div><button className='border-none bg-blue-500 mt-2 p-2 rounded'><a href={props.items.url}>Read More</a></button></div>
            </div>
        </div>

    </div>
  )
}

export default News