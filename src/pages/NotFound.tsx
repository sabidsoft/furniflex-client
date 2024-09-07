import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Button from "../components/Button";

export default function NotFound() {
    useTitle('Not Found');
    
    const navigate = useNavigate();

    // Go backward
    const handleGoBack = () => {
        navigate(-1)
    };

    return (
        <div className="flex justify-center items-center pb-5">
            <div className="mt-56 text-center">
                <h2 className="text-4xl font-semibold mb-8">Opps!</h2>
                <h1 className="text-8xl text-[#000] font-bold mb-8">404</h1>
                <h2 className="text-4xl font-semibold mb-16">Page Not Found!</h2>
                <Button
                    onClick={handleGoBack}
                    buttonName="Go Back"
                />
            </div>
        </div>
    );
}
