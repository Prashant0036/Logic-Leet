import { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import  getVideoData  from '../utils/getVideoData';


const Editorial =  ({problemId}) => {
  
  // console.log(problemId);
  // { secureUrl, thumbnailUrl, duration }
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const[videoData,setVideoData] = useState(null);

  const fetchVideo = async()=>{
    const returnedVideoData = await getVideoData(problemId);
    // console.log(returnedVideoData);
    // console.log(returnedVideoData);
  setVideoData(returnedVideoData);
  }

  useEffect(
()=>{
fetchVideo();
},[problemId]

  )


  // if video data is not loaded yet
   if (!videoData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // console.log(videoData);
  // console.log(videoData.secureUrl);
  const {videoAvailable, secureUrl,thumbnailUrl,duration} = videoData;

       

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // const togglePlayPause = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  // // Update current time during playback
  // useEffect(() => {
  //   const video = videoRef.current;
    
  //   const handleTimeUpdate = () => {
  //     if (video) setCurrentTime(video.currentTime);
  //   };
    
  //   if (video) {
  //     video.addEventListener('timeupdate', handleTimeUpdate);
  //     return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  //   }
  // }, []);

  return (
  //   <div 
  //     className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
  //     onMouseEnter={() => setIsHovering(true)}
  //     onMouseLeave={() => setIsHovering(false)}
  //   >
  //     {/* Video Element */}
  //     <video
  //       ref={videoRef}
  //       src={secureUrl}
  //       poster={thumbnailUrl}
  //       onClick={togglePlayPause}
  //       className="w-full aspect-video bg-black cursor-pointer"
  //     />
      
  //     {/* Video Controls Overlay */}
  //     <div 
  //       className={`absolute bottom-0 left-0 right-0 bg-gradient-to from-black/70 to-transparent p-4 transition-opacity ${
  //         isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
  //       }`}
  //     >
  //       {/* Play/Pause Button */}
  //       <button
  //         onClick={togglePlayPause}
  //         className="btn btn-circle btn-primary mr-3"
  //         aria-label={isPlaying ? "Pause" : "Play"}
  //       >
  //         {isPlaying ? (
  //           <Pause/>
  //         ) : (
  //           <Play/>
  //         )}
  //       </button>
        
  //       {/* Progress Bar */}
  //       <div className="flex items-center w-full mt-2">
  //         <span className="text-white text-sm mr-2">
  //           {formatTime(currentTime)}
  //         </span>
  //         <input
  //           type="range"
  //           min="0"
  //           max={duration}
  //           value={currentTime}
  //           onChange={(e) => {
  //             if (videoRef.current) {
  //               videoRef.current.currentTime = Number(e.target.value);
  //             }
  //           }}
  //           className="range range-primary range-xs flex-1"
  //         />
  //         <span className="text-white text-sm ml-2">
  //           {formatTime(duration)}
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  <>
  { videoAvailable  ? (
    
    <>
     <div className="alert alert-success">
                    <div>
                      <h3 className="font-bold">Here's the Video Solution of this problem for your better understanding. </h3>
                      <p className="text-sm">Duration: { formatTime(duration) }</p>
                
                    </div>
    </div>
    <div className='m-2'></div>

    <video autoplay muted controls className="w-full aspect-video bg-black cursor-pointer">
<source src={secureUrl} type="video/mp4"></source>
        </video>
        
    </>
      
      ) : 
        (
                  <div className="flex flex-col alert alert-error">

                     <h3 className="font-bold text-2xl ">No video solution available yet. </h3>
                    <p className='text-center'>This is a great opportunity to strengthen your problem-solving skills!
Our team is working on it. stay tuned 👀</p>
                  </div>
                )
        }

  </>
  
  );
};


export default Editorial;