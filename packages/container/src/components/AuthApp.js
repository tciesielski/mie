import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mount } from "auth/AuthApp";

const AuthApp = ({ onSignIn }) => {
    const content = useRef(null);
    const onParentNavigateRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { onParentNavigate } = mount(content.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                navigate(nextPathname);
            },
            initialPath: location.pathname,
            onSignIn: (isSignedIn) => {
                onSignIn(isSignedIn);
            }
        });
        onParentNavigateRef.current = onParentNavigate;
    }, []);

      // Sync navigation from container to child
      useEffect(() => {
        if (onParentNavigateRef.current) {
          onParentNavigateRef.current({ pathname: location.pathname });
        }
      }, [location]); // Only run when location changes

    return (
        <div ref={content} />
    );
};
export default AuthApp;