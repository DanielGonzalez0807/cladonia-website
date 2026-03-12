"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReserveButton({ slug = '' }) {
    const router = useRouter();
    
    const handleClick = () => {
        const url = slug ? `/form?experience=${slug}` : '/form';
        router.push(url);
    };
    
    return (
        <button
            onClick={handleClick}
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold transition-all duration-500 hover:scale-[1.02] shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer">
            Reservar
        </button>
    );
}
