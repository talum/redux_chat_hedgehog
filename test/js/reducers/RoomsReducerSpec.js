import { expect } from 'chai'
import RoomsReducer from '../../../web/static/js/reducers/RoomsReducer'

describe("RoomsReducer", () => {
  it("has a default state", () => {
    let nextState = RoomsReducer(undefined, {type: "NOTHING THAT WILL MATCH I HOPE"})
    expect(nextState).to.eql({})
  })

  it("adds a message for an existing channel correctly", () => {
    let initialState = {
      "general":
        [
          {
            user: "Steven",
            cotent: "Coding is hard"
          }
        ]
    }
    let newMessage = {room: "general", content: "No it's not, you're just dumb", user: "JessRudder"}
    let nextState = RoomsReducer(initialState, {type: "NEW_MESSAGE", payload: newMessage})
    expect(nextState).to.eql({"general": [
        {
            user: "Steven",
            cotent: "Coding is hard"
          },
        {
            user: "JessRudder",
            cotent: "No it's not, you're just dumb"
          }
      ]
    }})
  })
})
