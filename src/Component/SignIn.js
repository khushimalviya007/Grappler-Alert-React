import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus } from "../Slices/SignInSlice";
import '../App.css';
import { DoLogin } from "../Authentication";
import { Navigate, useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const signin = useSelector((state) => state.SignIn);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    dispatch(getLoginStatus(loginDetails))
      .then((data) => {
        if (data != undefined) {
          DoLogin(data);
          // Navigate("/users/dashboard");
          navigate("/users/dashboard");
        }
        else {
          console.log("Invalid credentials");
        }
      })
  };

  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    })
  }
  return (
    <>
      <h2 className='headline'>Login</h2>
      <form className='formClass'
        onSubmit={handleFormSubmit}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={loginDetails.email}
            onChange={(e) => handleChange(e, 'email')}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={loginDetails.password}
            onChange={(e) => handleChange(e, 'password')}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
export default SignIn;