import useTitle from "../hooks/useTitle"

export default function Checkout() {
    useTitle('Checkout');
    
    return (
        <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold">Checkout Page</h1>
        </div>
    )
}