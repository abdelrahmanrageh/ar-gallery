import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
    <section className="border-t-2 dark:border-slate-600 mt-36">
        <div className="max-w-screen-xl flex justify-between px-4 pb-8  mx-auto space-y-8 overflow-hidden sm:px-6 lg:px- fs:flex-col-reverse">
            <p className="mt-8 text-base leading-6 text-center text-gray-400">
                © {new Date().getFullYear()} AR Gallery, All rights reserved.
            </p>
            <div className="flex justify-center mt-8 space-x-6">
                <a href="https://www.instagram.com/ar.gallery09/" className="text-gray-400 hover:text-gray-500" target="_blank">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-6 h-6" />
                </a>     
                <a href="https://www.facebook.com/AR.Gallery99" className="text-gray-400 hover:text-gray-500" target="_blank">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6"/>
                </a>
                
            </div>
            
        </div>
    </section>
    );
}