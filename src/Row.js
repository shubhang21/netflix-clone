import React,{useState,useEffect} from 'react'
import axios from './axios';
import './Row.css'
import Youtube from 'react-youtube';
const base_url="https://image.tmdb.org/t/p/original/";
function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
        }
        fetchData();
        
        
    }, [fetchUrl])
const opts={
    height:"390",
    width:"100%",
    playerVars:{
        autoplay:1,
    },
};
const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
    return (
        <div className="row">
            <h2 style={{textAlign:"left"}}>{title}</h2>
            <div className="row_posters">
                {
                    movies.map((movie)=>(
                        <img className={`row_poster ${isLargeRow&& "row_posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path}`}
                        alt={movie.name} 
                        onClick={() => handleClick(movie)}
                        />
                        
                    ))
                }

            </div>
            {trailerUrl&&<Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
