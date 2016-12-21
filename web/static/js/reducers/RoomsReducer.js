const RoomsReducer = (state={}, action) => {
  switch(action.type) {
    case "INITIAL_PAYLOAD":
      return action.payload.rooms
    case "NEW_MESSAGE":
      let {room, content, user} = action.payload //ES2015 destructuring. Object has keys; assign the value of the key room to room, content to content, user to user
      let roomToBeUpdated = state[room] || []
      let newMessage = { content, user}
      let newMessageList = roomToBeUpdated.concat([newMessage]) //new array with both things in it
      // same as let newMessageList = [...roomToBeUpdated, newMessage] // spread operator 
      let newRooms = Object.assign({}, state, {
        [room]: newMessageList //new version of room with new messages
      })
      
      // Object spread operator, available in babel plugin. THe cleaner version of this...take all keys and values from old object, add new key value for object. 
      // let newRooms = {
      //   ...state,
      //   [room]: newMessageList
      // }
 
      // need to return new object 
       // need to interpolate the value of room so we know what key to update dynamically. dynamic keys
      return newRooms
    default:  
      return state
  }
}

export default RoomsReducer

// Immutability Important in Redux
/* 
  - Redux expects you to write pure functions
  - When it figures out if you should re-render page, it checks if it is the same object
  - Redux counts on you to return a new object if there's a change in order to do faster diffs 
  - Trying to optimize whether or not to redraw something
*/
