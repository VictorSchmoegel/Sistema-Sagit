import { Link } from "react-router-dom";

export default function Divinopolis() {
  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border;'>Divinópolis - MG CONTRATO 4600010284</h1>
      <section className=''>
        <aside>
          <nav>
            <ul className='flex gap-4 justify-between border p-3'>
              <Link to={'/cadastro'}>
                <li>Cadastrar colaborador</li>
              </Link>
              <li>Imperatriz</li>
              <li>Pedro Leopoldo</li>
              <li>Rumo</li>
              <li>Klabin</li>
            </ul>
          </nav>
        </aside>
      </section>
      <form className='flex flex-col'>
        <input
          className='border p-3 rounded-lg' 
          type='text'
          placeholder='Digite o número do pedido'
        />
      </form>
    </main>
  )
}
