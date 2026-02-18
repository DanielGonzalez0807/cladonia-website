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
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition cursor-pointer">
            Reservar
        </button>
    );
}