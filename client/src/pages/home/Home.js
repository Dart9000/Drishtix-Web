import React from 'react'

const Home = ({isAdmin}) => {
  return <>
    {isAdmin ? (
      <div>Admin Dashboard <a href="/register">Create New Station</a></div>

    ) : (
      <div>User Page <a href="/create_criminal">Add Criminal</a></div>
    )}
  </>
}

export default Home;
