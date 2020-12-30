import React, { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/client'


const Feed = () => {
  const [session] = useSession()
  const [feedMsg, setFeedMsg] = useState('')
  const [newFeed, setNewFeed] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/feeds', {
        body: feedMsg
      }, {
        headers: {
          Authorization: `Bearer ${session.jwt}`
        }
      })
      setNewFeed(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-1/2 bg-blue-800 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4 rounded-xl">
        <h1 className="text-gray-200 text-center font-extrabold -mt-3 text-3xl">Add To Feed</h1>
        <div className="container py-5 max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <textarea
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="message" rows={10} cols={50} placeholder="Message"
                value={feedMsg} onChange={e => setFeedMsg(e.target.value)} >

              </textarea>

            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Add Feed
            </button>
              <button
                type="button"
                className="font-bold text-sm text-gray-400"
                onClick={() => setFeedMsg('')}>
                Reset
            </button>
            </div>
          </form>
        </div>
      </div>
      {newFeed && JSON.stringify(newFeed)}
    </>
  )
}

export default Feed
