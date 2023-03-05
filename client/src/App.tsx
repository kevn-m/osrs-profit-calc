import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"

export type User = {
  name: string
  username: string
  email: string
}

export const App = () => {
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    Axios.get("http://localhost:3001/users").then(
      (res: AxiosResponse<User[]>) => {
        setUserList(res.data)
      }
    )
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
