import { useState } from 'react'
const tabs = ['Divinóplis', 'Imperatriz', 'Pedro Leopoldo', 'RUMO', 'Klabin']

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <main className='flex h-screen'>
      <section>
      <aside className=' bg-gray-200 p-4'>
        <nav>
          <ul>
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`p-3 hover:underline cursor-pointer shadow-md ${activeTab === tab ? 'bg-gray-400' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
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
