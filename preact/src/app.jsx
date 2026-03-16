import Router from "preact-router"

import Home from "./pages/Home"
import AddHabit from "./pages/AddHabit"

export function App(){

  return(

    <Router>

      <Home path="/" />

      <AddHabit path="/add" />

    </Router>

  )

}