import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/home'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <p className='text-red-600'>Sagittarius</p>
          </h1>
        </Link>

        <form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home
            </li>
          </Link>
          <Link to='about'>
            <li
              className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Sobre
            </li>
          </Link>
          <Link to='contact'>
            <li
              className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Contato
            </li>
          </Link>
        </ul>
        </form>
      </div>
    </header>
  )
}

