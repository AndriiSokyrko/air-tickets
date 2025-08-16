import React, {useContext} from 'react';
import {adminRoutes, publicRoutes} from "../routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "../index";

const AppRouter =  () => {
    const {user} = useContext(Context)
    return (
            <Routes>

                {!user.isAuth ? publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                    )
                :
                 adminRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
    );
};

export default AppRouter;