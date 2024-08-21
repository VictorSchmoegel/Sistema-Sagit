import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Divinopolis() {
  const [colabs, setColabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getColabs = async () => {
      try {
        const res = await fetch('/api/colab/location/Divinópolis');
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

  const deleteColab = async (id) => {
    try {
      const res = await fetch(`/api/colab/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setColabs(data);
        setModalIsOpen(false);
      } else {
        setError('Erro ao excluir colaborador');
      }
    } catch (error) {
      setError('Erro ao excluir colaborador');
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteColab(deleteId);
  };

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Divinópolis - MG CONTRATO 4600010284</h1>
      <section>
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
      <section className='max-w-lg mx-auto p-30 mt-10'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Colaboradores Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className='text-red-600 text-center'>{error}</p>}
        <table className='min-w-full bg-white'>
          <thead className="border">
            <tr>
              <th className='p-2 border'>Nome</th>
              <th className='p-2 border'>CPF</th>
              <th className='p-2 border'>RG</th>
              <th className='p-2 border'>Visualizar</th>
              <th className='p-2 border'>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {colabs.map((colab) => (
              <tr key={colab._id} className='border px-4'>
                <td className='py-2 px-4 border'>{colab.nome}</td>
                <td className='py-2 px-4 border'>{colab.cpf}</td>
                <td className='py-2 px-4 border'>{colab.rg}</td>
                <td className='py-2 px-4 border'>
                  <Link to={`/visualizar/${colab._id}`}>
                    <FaEye className="text-center ml-5" />
                  </Link>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDeleteClick(colab._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal de confirmação */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirmação de Exclusão"
        className='max-w-md mx-auto bg-gray-700 p-4 rounded-lg text-white'
      >
        <h2>Tem certeza que deseja excluir este colaborador?</h2>
        <div className="flex gap-4">
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Sim
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Não
          </button>
        </div>
      </Modal>
    </main>
  );
}
