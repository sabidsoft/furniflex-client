import Header from "../components/Header";
import useTitle from "../hooks/useTitle";

export default function TermsAndPolicy() {
    useTitle('Terms and Policy');

    return (
        <>
            <Header />
            <div className="mt-10 text-center">
                <h1 className="text-4xl font-bold">Terms and Policy Page</h1>
            </div>
        </>
    );
}