import { Link } from "react-router-dom";
// import Slider from "./Slider";
import heroImage from '../assets/hero-section1.webp';

function HeroSection() {

    return (
        <>
            {/* <Slider/> */}
        <section className=" h-full mx-auto max-w-6xl p-3 md:p-4">
            <div className="mt-32">
                <img className="" src={heroImage} alt="mockup"/>
            </div>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80"
                aria-hidden="true"
                >
                <div
                    className=" left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8a60ff] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="grid max-w-screen-xl px-4 py-10 lg:py-0 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    {/* <h1 className="w-full mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome To Ar Gallery</h1> */}
                    {/* <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Make awesome things</p> */}
                        <Link to="/products"
                            
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center dark:text-teal-50 text-sky-600 rounded-lg bg-primary-700 hover:bg-primary-800 ring-2 ring-sky-400 hover:bg-sky-400 hover:text-teal-50">
                            
                        Shop Products
                        <svg className="w-5 h-5 ml-2 -mr-1 transition-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule={'evenodd'}></path></svg>
                    </Link>
                    
                </div>
                {/* <div className=" lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
                </div>                 */}
            </div>
        </section>

        </>
        
    )
}

export default HeroSection;