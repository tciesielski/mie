import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";
const MarketingApp = () => {
    const content = useRef(null);

    useEffect(() => {
        if (content.current) {
            mount(content.current);
        }
    }, [content]);

    return (
        <div>
            <div ref={content} />
        </div>
    );
};
export default MarketingApp;