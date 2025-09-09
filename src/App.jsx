import {AuthContextProvider} from "./context/AuthContext"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

export default function App() {
  return (
    <div className="container">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  )
}
