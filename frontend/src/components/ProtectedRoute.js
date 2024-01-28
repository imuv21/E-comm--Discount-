import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            element={
                <Fragment>
                    {!loading && isAuthenticated ? (
                        <Component  />
                    ) : (
                        <Navigate to="/login" />
                    )}
                </Fragment>
            }
        />
    )
}

export default ProtectedRoute;

