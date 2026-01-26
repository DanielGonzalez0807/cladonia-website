import Link from 'next/link';

export default function ReserveBtn() {
    return (
        <Link
            href="/form"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition">
            Reservar
        </Link>
    );
}