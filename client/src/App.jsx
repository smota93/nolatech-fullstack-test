import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <>
     <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        /> */}
      </Routes>
    </>
  )
}

export default App
