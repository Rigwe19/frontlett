import { type PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, open }: PropsWithChildren<{ open: boolean }>) => {
    const mount = useRef(document.getElementById("portal-root"));
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        console.log(mount)
        const element = el.current
        const mounted = mount.current
        mounted?.appendChild(element);
        // return () => mounted?.removeChild(element);
    }, [el, mount]);
    if (!open) return null;
    return createPortal(<div className="absolute inset-0 h-screen z-[9999] bg-black/80">{children}</div>, el.current)
};

export default Portal;