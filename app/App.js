import React, { useContext, useState } from 'react';
import Login from './stacks/login'
import Student from './stacks/student'
import Teacher from './stacks/teacher'

import { UserContext } from "./userContext"

export default function App() {
  const user = useContext(UserContext)
  const [ userContext, setUser ] = useState(user)
  
  let comp = false

  if (!userContext) {
    comp = <Login setUser={setUser} />
  }

  else if (userContext.type == "teacher") {
    comp = <Teacher />
  }

  else {
    comp = <Student />
  }

  return (
    <UserContext.Provider value={userContext}>
      {comp}
    </UserContext.Provider>
  )
}

