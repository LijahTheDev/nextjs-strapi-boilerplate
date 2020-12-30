import React from 'react'
import { useSession } from 'next-auth/client'

const Navbar = () => {
  const [session] = useSession()

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-red-500 shadow-lg">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="/">
                <h2 className="text-xl">Home</h2>
              </a>
              <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              </button>
            </div>
            {
              session &&
              (
                <div className="flex lg:flex-grow items-center" id="example-navbar-info">
                  <ul className="flex flex-col lg:flex-row list-none ml-auto">
                    <li className="nav-item flex items-center justify-center">
                      <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                        <h4 className="pr-3">{session && session.user.name}</h4>
                        <img className="rounded-full shadow-lg" src={session.user.image} alt={session.user.name} width="50" height="50" />
                      </a>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
