import "../Style.css";
import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";



const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, error, isUpdated } = useSelector(state => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Password" />
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">

                            <h2 className="homeHeading2 mauto">Update Password</h2>

                            <form className="loginForm" onSubmit={updatePasswordSubmit} >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input type="password" id="oldpassword" placeholder="Enter Old Password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" id="newpassword" placeholder="Enter New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password" id="confirmpassword" placeholder="Enter New Password Again" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input type="submit" value="Change Password" className="loginBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default UpdatePassword