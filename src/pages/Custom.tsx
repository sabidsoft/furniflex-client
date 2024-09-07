import useTitle from "../hooks/useTitle";

export default function Custom() {
    useTitle('Custom');
    
    return (
        <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold">Custom Page</h1>
        </div>
    );
}