import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";

export default function Divinopolis() {
  const [colabs, setColabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getColabs = async () => {
      try {
        const res = await fetch('/api/colab/divinopolis');
        const data = await res.json();
        setColabs(data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar colaboradores');
        setLoading(false);
      }
    }
    getColabs();
  }, []);

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Divinópolis - MG CONTRATO 4600010284</h1>
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
          className='border p-3 rounded-lg text-center'
          type='text'
          placeholder='Buscar colaborador'
        />
      </form>
      <section className='max-w-lg mx-auto p-20'>
        <h2 className='text-2xl font-bold mb-4'>Colaboradores Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className='text-red-600 text-center'>{error}</p>}
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2'>Nome</th>
              <th className='py-2'>CPF</th>
              <th className='py-2'>RG</th>
            </tr>
          </thead>
          <tbody>
            {colabs.map((colab) => (
              <tr key={colab._id} className='border-b'>
                <td className='py-2 px-4 border'>{colab.nome}</td>
                <td className='py-2 px-4 border'>{colab.cpf}</td>
                <td className='py-2 px-4 border'>{colab.rg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
