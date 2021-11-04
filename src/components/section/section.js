import {
      BrowserRouter as Router,
      Routes,
      Switch,
      Route,
      Redirect
} from "react-router-dom";
import Login from "../layout/login";
const Section = () => {
      return (
            <>
                  <Routes>
                        <Route exact path="/" element={<Login />} />
                  </Routes>
            </>
      )
}
export default Section