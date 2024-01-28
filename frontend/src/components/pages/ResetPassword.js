import "../Style.css";
import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const ResetPassword = ( ) => {


    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, error, success } = useSelector(state => state.forgotPassword);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword( params.token, myForm));
    };

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, error, alert, navigate, success]);


  return (
    <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">

                            <h2 className="homeHeading2 mauto">Reset Password</h2>

                            <form className="loginForm" onSubmit={resetPasswordSubmit} >
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" id="password" placeholder="Enter New Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password" id="conpassword" placeholder="Enter New Password Again" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input type="submit" value="Update Password" className="loginBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment>
  )
}

export default ResetPassword