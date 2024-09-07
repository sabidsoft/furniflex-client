import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `FurniFlex`;
        } else {
            document.title = `${title} | FurniFlex`;
        }
    }, [title]);
};

export default useTitle;