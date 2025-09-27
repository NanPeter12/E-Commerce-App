import Image from "next/image";
import error from "../assets/images/error.svg";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
            <div className="relative w-72 h-72">
                <Image
                    src={error}
                    alt="Error 404"
                    fill
                    className="object-contain"
                />
            </div>
            <p className="mt-2 text-gray-600 text-4xl">Oops! Page not found</p>
        </div>
    );
}
