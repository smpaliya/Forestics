import  React from 'react';
import nat1 from '/Forsetics/forestics/src/Image/nat1.jpeg';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import '../Social/Post.css'
export default function Post({post}){
    return(
        <>
    <div className='postWrapper'>
    <div className='postTop'>
        <img className='PostImage' src={post.photo} alt="Image"></img>
    </div>
    <div className='postBottomSide'>
        <FaRegHeart className="EmptyHeart"></FaRegHeart>
        <p className='likes'> {post.id}{post.like}</p>
    </div>
    </div>

    </>
    )
    
    

}

