import React, { useEffect, useRef } from "react";
import { mount } from "dashboard/DashboardApp";

const DashboardApp = () => {
    const content = useRef(null); 

    useEffect(() => {
        if (content.current) {
            mount(content.current);
        }
    }, []);

    return (
        <div>
            <div ref={content} />
        </div>
    );
};
export default DashboardApp;