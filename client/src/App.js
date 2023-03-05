import "./App.css"
import { useState, useEffect } from "react"
import Axios from "axios"

function App() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/users").then((res, err) => {
      setUserList(res.data)
    })
  }, [])

  return (
    <div>
      {userList.map((user) => {
        return (
          <div>
            <h1> {user.name} </h1>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        )
      })}
      <h1> </h1>
    </div>
  )
}

export default App
