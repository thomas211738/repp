import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="bg-gray-500 p-4">
            <ul className="flex justify-center space-x-4">
                <li className="text-white"><Link to="/">Home</Link></li>
                <li className="text-white"><Link to="/experiments">Experiments</Link></li>
            </ul>
        </div>
    )
}
