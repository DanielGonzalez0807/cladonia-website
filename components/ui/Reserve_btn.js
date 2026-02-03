"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReserveBtn() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/form');
    };
    
    return (
        <button
            onClick={handleClick}
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition cursor-pointer">
            Reservar
        </button>
    );
}