import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VisualizarColab() {
  const params = useParams();
  const [fileNames, setFileNames] = useState('');
  const [fileUpload, setFileUpload] = useState('');
  const [colab, setColab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getColab = async () => {
      try {
        const res = await fetch(`/api/colab/${params.id}`);
        const data = await res.json();
        setColab(data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar colaboradores');
        setLoading(false);
      }
    }
    getColab();
  }, [params.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileUpload);

    try {
      const res = await fetch(`/api/colab/pdf/${params.id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!colab) {
    return <p>Carregando...</p>;
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className='text-red-600 text-center'>{error}</p>;

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Visualizar Colaborador</h1>
      <section>
        <form className='flex gap-4 p-3' onSubmit={handleSubmit}>
        <h2>Colaborador: {colab?.nome}</h2>
          <input 
            className='border p-3 rounded-lg'
            name='nome'
            type='text'
            placeholder='Nome'
            onChange={(e) => setFileNames(e.target.value)}
          />
          <input
            className='border p-3 rounded-lg text-center'
            name='file'
            type='file'
            accept='application/pdf'
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button
            className='bg-blue-500 text-white p-3 rounded-lg'
          >
            Enviar
          </button>
        </form>
        {fileUpload && (
          <section className='flex flex-col gap-4 p-3'>
            <h2>Nome: {fileUpload.name}</h2>
            <h2>Tamanho: {fileUpload.size}</h2>
            <h2>Tipo: {fileUpload.type}</h2>
          </section>
        )}
      </section>
    </main>
  )
}
