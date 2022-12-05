import Link from "next/link";
import { useEffect, useState } from "react";
import { themeChange } from 'theme-change';
const NavBarAuthenticated = () => {
    useEffect(() => {
        themeChange(false);
        }, []);
    return (
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/wallet">Wallet</Link></li>
                            <li><Link href="/auth/logout">Logout</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        bowie
                    </Link>
                </div>
                <div className="navbar-end">
                    <select className="select select-ghost max-w-xs" data-choose-theme>
                        <option disabled value="">
                            Theme
                        </option>
                        <option value="synthwave">Synthwave</option>
                        <option value="dark">Dark</option>
                        <option value="business">Business</option>
                        <option value="aqua">Aqua</option>
                        <option value="dracula">Dracula</option>
                        <option value="luxury">Luxury</option>
                        <option value="coffee">Coffee</option>
                    </select>
                </div>
            </div>
            );
};
export default NavBarAuthenticated;
