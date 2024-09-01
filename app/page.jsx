
import UserGreeting from '@/app/components/UserGreeting';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <main className="main flex items-center justify-center md:h-screen">
            <div className="div-greeting relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-gray-900">
                <Image 
                    src="/images/logo-bildy.png" 
                    alt="Logo Bildy" 
                    width={100} 
                    height={50} 
                    className='logo'
                />
                <UserGreeting />
                <h1>Genera albaranes digitales fácilmente con bildyapp</h1>
                <div className='link-start'>
                    <Link href="/user/client">COMENZAR</Link>
                </div>
            </div>
        </main>
    );
}