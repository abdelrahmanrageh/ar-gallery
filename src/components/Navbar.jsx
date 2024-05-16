import { Disclosure, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon  } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../rtk/slices/shoppingCartSlice'
import logo from '../assets/logo.png'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { setSearchValue } from '../rtk/slices/productsSlice'
import { MdDarkMode , MdLightMode  } from "react-icons/md"
import { FaCartShopping } from 'react-icons/fa6'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const linkLocation = useLocation();
    const navigation = [
        { name: 'Home', href: '/', current: linkLocation.pathname === '/' },
        { name: 'Products', href: '/products', current: linkLocation.pathname === '/products' }]
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.shoppingCart.cart);
    let cartLength = Object.keys(cart).length;
    const searchInputRef = useRef(null);
    const [darkMode , setDarkMode] = useState(window.localStorage.darkMode === 'true' ? true : false );
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            window.localStorage.darkMode = 'true';
        } else {
            document.body.classList.remove('dark');
            window.localStorage.darkMode = 'false';
        }
    }, [darkMode]);
    return (
        <>
        
        <Disclosure as="nav" className=" fixed w-full top-0 z-40 bg-slate-950 transition">
        {({ open }) => (
            <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                <div className="relative flex h-20 items-center justify-between ">
                    {/* Mobile menu button*/}
                <div className="flex flex-1 items-center ">
                    <div className="flex items-center sm:hidden">
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg mr-2 p-2 text-gray-400 hover:bg-gray-700 hover:text-white  ">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                    </div>
                    
                        <div className="flex flex-shrink-0 items-center"
                                    onClick={() => {
                                        dispatch(setSearchValue(''));
                                        searchInputRef.current.value = '';
                                        window.scrollTo(0, 0);    
                                    }}
                                >
                            <Link
                                to='/'>
                                <img
                                    className="h-10 w-auto"
                                    src={logo}
                                    alt="Ar Gallery"
                                />
                            </Link>            
                        </div>
                        {/* menu */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        onClick={() => { 
                                            dispatch(setSearchValue(''));
                                            searchInputRef.current.value = '';
                                            window.scrollTo(0, 0);
                                        }}
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* search bar */}
                        <div className="relative  rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">
                                    <IoSearch />
                                </span>
                            </div>
                            <form action=""
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(setSearchValue(searchInputRef.current.value));
                                    navigate('/products');
                                    searchInputRef.current.blur();
                                    setTimeout(() => window.scrollTo(0, 0), 100);
                                }}
                            >
                                <input
                                type="text"
                                name="price"
                                id="price"
                                className="block max-w-24  bg-gray-800 ring-gray-600 sm:max-w-full lg:mr-0 rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-300 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                placeholder="Search"
                                autoComplete='off'
                                spellCheck='false'
                                ref={searchInputRef}
                                />
                            </form>
                        </div>
                    </div>                
                    {/* dark mode */}
                    {
                    darkMode &&
                        <MdLightMode
                        onClick={() => setDarkMode(!darkMode)}
                        className='w-9 h-9 mx-1 p-1.5 text-gray-400 hover:text-gray-100 cursor-pointer transition hover:bg-gray-700 rounded-lg' />
                    }
                    
                    {
                    !darkMode &&
                        <MdDarkMode 
                        onClick={() => setDarkMode(!darkMode)}
                        className=' w-9 h-9 mx-1 p-1.5 text-gray-400 hover:text-gray-100 cursor-pointer transition hover:bg-gray-700 rounded-lg' />
                    }
                                
                    {/* Cart */}
                    <div className="inset-y-0 flex justify-strat  pr-2 sm:static sm:inset-auto ml-0 sm:pr-0 ">
                            
                        <button
                            type="button"
                            onClick={() => dispatch(toggleCart())}
                            className="flex relative  "
                                    >
                                        {/* <FaCartShopping /> */}
                            <FaCartShopping
                            className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-200 transition"
                            aria-hidden="true"
                            />
                            <Transition
                                show={cartLength > 0}
                                enter="transition-all duration-500"
                                enterFrom="opacity-0 px-0"
                                enterTo="opacity-100 px-1"
                                leave="transition-all duration-500"

                            >
                                <p className='text-gray-400 px-1'>
                                {cartLength }
                                </p>
                            </Transition>
                        </button>

                        {/* Profile dropdown */}
                        <div>
                        {/* <Menu as="div" className="relative ml-3">
                        
                        <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            </Menu.Button>
                        </div>
                        <Transition
                            as {fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Your Profile
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Settings
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Sign out
                                </a>
                                )}
                            </Menu.Item>
                            </Menu.Items>
                        </Transition>
                        </Menu> */}
                        </div>
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden z-50 bg-slate-900">
                <div className="space-y-1 px-2 pb-3 pt-2 w-full">
                                
                {navigation.map((item) => (
                    <Disclosure.Button
                    key={item.name}
                    className={classNames(
                        item.current ? 'bg-gray-700 text-white w-full ' : 'text-gray-300 hover:bg-gray-700 hover:text-white w-full',
                        'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    <Link className='block w-full' to={item.href}>{item.name}</Link>    
                    </Disclosure.Button>
                ))}
                </div>
            </Disclosure.Panel>
            </>
            )}
            </Disclosure> 
        </>
    )
}
export default Navbar;