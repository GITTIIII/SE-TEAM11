import { Link } from "react-router-dom";
import logo1 from "../../asset/logo1.png"
import login from "../../asset/login.jpg"
import "./register.css"
import "../login/login.css"

const Register = () => {
  return (
    <>
        <section className="login-bg" style={{ backgroundImage: `url(${login})` }}>
            <div className="login-box">
                <form action="">

                    <div className="icon">
                        <img src={logo1} alt="logo"/>
                        <h2>Register</h2>
                    </div>

                        <div className="input-box">
                            <input type="text" required/>
                            <label>Email Address</label>
                        </div>

                        <div className="input-box">
                            <input type="password" required/>
                            <label>Password</label>
                        </div>

                        <div className="input-box">
                            <input type="text" required/>
                            <label>Name</label>
                        </div>

                        <div className="input-box">
                            <input type="number" min="0" max="100" required/>
                            <label>Age</label>
                        </div>

                        <div className="input-box">
                            <select >
                                <option value="" selected disabled hidden>Sex</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                            
                        </div>

                        
                        
                        <div className="buttom-area">

                            <button type="submit">Sign up</button> 
                            <Link to="/">Have Account?</Link>
                    
                        </div>
                </form>
            </div>
        </section>
    </>
  );
};

export default Register;