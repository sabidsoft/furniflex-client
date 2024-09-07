import useTitle from "../hooks/useTitle";

export default function Categories() {
    useTitle('Categories');
    
    return (
        <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold">Categories Page</h1>
        </div>
    );
}