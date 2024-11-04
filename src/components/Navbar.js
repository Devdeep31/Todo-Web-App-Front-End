import { useEffect, useState } from 'react';
import Logo from '../Resources/Logo1.png'

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    })
    return (
        <>
            <nav className="flex h-16 bg-yellow-200 shadow-sm w-full p-4 gap-2 justify-between">
                <div className='flex gap-2'>
                    <img className='h-8' src={Logo} />
                    <h1 className=' font-bold'>To-Do App</h1>
                </div>
                <div className='gap-2 flex'>
                <button
                    className="justify-end w-8 h-8 dark:bg-white dark:text-black bg-black text-white rounded-full text-lg"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    <i class='bx bx-adjust text-xl'></i>
                </button>
                
                </div>
            </nav>
        </>
    );
}

