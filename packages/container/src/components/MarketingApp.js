import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mount } from "marketing/MarketingApp";

const MarketingApp = () => {
    const content = useRef(null);
    const onParentNavigateRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { onParentNavigate } = mount(content.current, {
            onNavigate: ({ location: { pathname: nextPathname } }) => {
                console.log("MarketingApp - Container onNavigate", nextPathname);
                navigate(nextPathname);
            },
            initialPath: location.pathname
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
export default MarketingApp;