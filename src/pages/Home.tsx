import useTitle from "../hooks/useTitle";

export default function Home() {
    useTitle('Home');
    
    return (
        <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold">Home Page</h1>
        </div>
    );
}