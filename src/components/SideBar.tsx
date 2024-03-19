import { ReactNode } from 'react';
import '../app/globals.css'
interface SidebarProps {
    children: ReactNode;
}

const SideBar: React.FC<SidebarProps> = ({ children }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">

                {children}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <button className="btn btn-outline btn-accent">Recuperar Ejecuciónes</button>
                </ul>

            </div>
        </div>
    )
}

export default SideBar
