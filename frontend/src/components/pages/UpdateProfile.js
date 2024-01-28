import "../Style.css";
import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import inAvatar from '../images/profile.png';
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";


const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(inAvatar);


    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log("Avatar preview loaded");
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">

                            <h2 className="homeHeading2 mauto">Update Profile</h2>

                            <form className="loginForm" encType="multipart/form-data" onSubmit={updateProfileSubmit} >
                                <div className="loginEmail">
                                    <TagFacesIcon />
                                    <input type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                                </div>
                                <input type="submit" value="Update Profile" className="loginBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default UpdateProfile