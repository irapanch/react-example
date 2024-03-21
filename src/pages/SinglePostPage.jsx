import React from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { useHttp } from '../hooks/useHttp'
import { getPostsById } from '../services/postApi'

const SinglePostPage = () => {
    const {postId} = useParams()
    const {data} = useHttp(getPostsById, postId)
    const location = useLocation()

  return (
    <>
    <Link to={location.state?.from}>Go back</Link>
     <h1>Post #{postId} </h1>
    <hr/>
    <h2>{data?.title}</h2>
    <p>{data?.body}</p>
    <hr />
    <Link to={'comments'}>Show comments by post</Link>
    <Outlet/>
    </>
   

  )
}

export default SinglePostPage