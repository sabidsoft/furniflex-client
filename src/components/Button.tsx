interface ButtonProps {
    buttonName: string;
    onClick: () => void;
}

export default function Button({ buttonName, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                text-white
                bg-[#000]
                hover:bg-[#202020]
                duration-300
                font-medium
                py-2
                px-5
                rounded-full
            "
        >
            {buttonName}
        </button>
    );
}