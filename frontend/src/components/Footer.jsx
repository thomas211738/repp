import React from 'react'

export default function Footer() {
    return (
            <footer className="bg-gray-800 text-white py-4 relative">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 REPP. All rights reserved.</p>
                    <div className="mt-2">
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
                    </div>
                </div>
            </footer>
    )
}
