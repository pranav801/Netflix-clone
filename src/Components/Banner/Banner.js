import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'

function Banner() {
    const [movie,setMovie] = useState()
    function randomIntFromInterval(size) { 
        let min = 0;
        let max = size-1;
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    useEffect(()=>{
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            setMovie(response.data.results[randomIntFromInterval(20)])
        })
    },[])
    return (
        <div style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path : ''})`}} className='banner'>
            <div className='content'>
                <h1 className='title'>{movie? movie.title : ''}</h1>
                <div className='banner_buttons'>
                    <button className='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg>
                        &nbsp;Play
                    </button>
                    <button className='button'>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg> 
                        &nbsp;More Info
                    </button>
                </div>
                <h1 className='description'>{movie? movie.overview : ''}</h1>
            </div>
            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner
