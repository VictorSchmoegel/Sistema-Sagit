import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <main className='flex h-screen'>
      <section>
      <aside className=' bg-gray-200 p-4'>
        <nav>
          <ul>
            <Link to={'/Divinópolis'}>
              <li className='hover:underline'>Divinópolis</li>
            </Link>
            <Link to={'/imperatriz'}>
              <li className='hover:underline'>Imperatriz</li>
            </Link>
            <Link to={'pedro-leopoldo'}>
              <li className='hover:underline'>Pedro Leopoldo</li>
            </Link>
            <Link to={'/rumo'}>
              <li className='hover:underline'>Rumo</li>
            </Link>
            <Link to={'klabin'}>
              <li className='hover:underline'>Klabin</li>
            </Link>
          </ul>
          </nav>
      </aside>
      </section>
      <section className='flex-1 flex justify-center'>
        <h1 className="text-4xl font-bold text-center">Hello, world!</h1>
      </section>
    </main>
  )
}
