import React from 'react'
import RoomList from '../components/RoomList'
import RoomDetails from '../components/RoomDetails'

//functional component
const App = () => {
  return (
    <div id="app">
      <RoomList />
      <RoomDetails />
    </div>
  )
}

export default App
