import useTitle from "../hooks/useTitle";

export default function Blog() {
    useTitle('Blogs');
    
    return (
        <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold">Blog Page</h1>
        </div>
    );
}