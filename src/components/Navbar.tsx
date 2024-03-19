'use client'
import Link from 'next/link';



function Navbar() {


    return (
        <>
            <div className="navbar bg-indigo-900 text-primary-content fixed w-full z-10 top-0 top-0 ">
                <div className="w-4/5 mx-auto flex items-center justify-between">
                    <div className="text-indigo-50 ">
                        <a className="text-xl">NODE CRON APP !</a>
                    </div>
                    <div className="flex-none mb-4">
                        <div className="flex-none mt-4">
                            <ul className="menu menu-horizontal text-indigo-50 px-1 ">
                                <li className="">  <Link href="/tareas">Tareas</Link></li>
                                <li className="">  <Link href="/function">Funciones</Link></li>
                            </ul >
                        </div >
                    </div >
                </div>
            </div>
        </>
    )
}

export default Navbar;
