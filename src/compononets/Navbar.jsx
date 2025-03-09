import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    {/* <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
    <div className="flex items-center justify-center max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center lg:order-2">
        </div>
        <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                <li>
                    <a href={Link}
                        className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                        aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Product</a>
                </li>
                <li>
                    <a href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                </li>
                <li>
                    <a href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                </li>
                <li>
                    <a href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>

            </ul>
        </div>
    </div>
</nav> */}

{/* <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script> */}
   
<nav>
        <ul className='flex justify-center items-center h-[10vh] gap-5'>
            <a href="/"><li>Home</li></a>
            <a href="/product"><li>Product</li></a>
            <a href="/login1"><li>Login1</li></a>
            <a href="/register"><li>Register</li></a>
            <a href="/create"><li>Create A Post</li></a>
        </ul>
    </nav>
    </>
  )
}
