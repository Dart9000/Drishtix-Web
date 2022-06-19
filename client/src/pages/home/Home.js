import React from 'react'

const Home = ({isAdmin}) => {
  return <>
    {isAdmin ? (
      <div>Admin Dashboard</div>
    ) : (
      <div>User Page</div>
    )}
  </>
}

export default Home;
