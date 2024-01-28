import "../Style.css";
import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';



const ForgotPassword = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message } = useSelector(state => state.forgotPassword);
  const [email, setEmail] = useState(" ");

  const forgotProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
};

useEffect(() => {
 
  if (error) {
      alert.error(error);
      dispatch(clearErrors());
  }
  if (message) {
      alert.success(message);
  }
}, [dispatch, error, alert, message]);


  return (
    <Fragment>
    {loading ? (
        <Loader />
    ) : (
        <Fragment>
            <MetaData title="Forgot Password" />
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <h2 className="homeHeading2 mauto">Forgot Password</h2>
                    <form className="loginForm" onSubmit={forgotProfileSubmit} >
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <input type="submit" value="Send" className="loginBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    )
    }
</Fragment>
  )
}

export default ForgotPassword