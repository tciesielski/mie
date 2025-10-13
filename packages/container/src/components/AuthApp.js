import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

const AuthApp = ({onSignIn}) => {
    const content = useRef(null); 
    const history = useHistory();

    useEffect(() => {
        if (content.current) {
            const { onParentNavigate } = mount(content.current, {
                onNavigate: ({ pathname: nextPathname }) => {
                    const { pathname } = history.location;
                    if (pathname !== nextPathname) {
                        history.push(nextPathname);
                        console.log("Container App - Auth onNavigate", nextPathname);
                    }
                },
                initialPath: history.location.pathname,
                onSignIn: (isSignedIn) => {
                    onSignIn(isSignedIn);
                }
            });
            history.listen(onParentNavigate);
        }
    }, []);

    return (
        <div>
            <div ref={content} />
        </div>
    );
};
export default AuthApp;