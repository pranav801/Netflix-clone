import React,{useEffect,useState} from 'react'
import './RowPost.css';
import Youtube from 'react-youtube'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios';

function RowPost(props) {
    const [movies,setMovies] = useState([])
    const [urlId,setUrlId] = useState('')
    useEffect(()=>{
        axios.get(props.url).then(response=>{
            console.log(response.data)
            setMovies(response.data.results)
        })
    },[])
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const handleMovie=(id)=>{
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!=0){
                setUrlId(response.data.results[0])
                console.log(response.data)
                if(urlId==response.data.results[0].key){
                    setUrlId(null)
                    return;
                  }
                  setUrlId(response.data.results[0].key)

            }else{
                console.log('Empty array')
            }
        })
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
                )}
            
            </div>
            { urlId && <Youtube opts={opts} videoId={urlId.key} /> }
        </div>
    )
}

export default RowPost