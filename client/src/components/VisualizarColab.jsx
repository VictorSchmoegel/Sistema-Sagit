import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VisualizarColab() {
  const params = useParams();
  const [colab, setColab] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);

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
    };
    getColab();
  }, [params.id]);

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const handleNameChange = (e, index) => {
    const newNames = [...fileNames];
    newNames[index] = e.target.value;
    setFileNames(newNames);
  };

  const handleExpiryDateChange = (e, index) => {
    const newDates = [...expiryDates];
    newDates[index] = e.target.value;
    setExpiryDates(newDates);
  };

  const handleAddField = () => {
    setFileNames([...fileNames, '']);
    setFiles([...files, null]);
    setExpiryDates([...expiryDates, '']);
  };

  const deletePdf = async (index) => {
    try {
      const res = await fetch(`/api/colab/pdf/${params.id}/file/${index}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setColab(data.updatedColab); // Atualize a lista de PDFs após exclusão
      } else {
        console.error('Error deleting PDF');
      }
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('pdfs', file);
      formData.append('names', fileNames[index]);
      formData.append('expiryDates', expiryDates[index]);
    });
    try {
      const res = await fetch(`/api/colab/pdf/${params.id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setColab(data.updatedColab);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className='text-red-600 text-center'>{error}</p>;

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Visualizar Colaborador</h1>
      <section className='flex flex-col gap-4 text-center'>
        <h2>Colaborador: {colab?.nome}</h2>
        <form className='flex flex-col gap-4 p-3' onSubmit={handleSubmit}>
          {fileNames.map((_, index) => (
            <div key={index} className='flex gap-4'>
              <input
                className='border p-3 rounded-lg'
                name='fileNames'
                type='text'
                placeholder='Nome do PDF'
                value={fileNames[index]}
                onChange={(e) => handleNameChange(e, index)}
              />
              <input
                className='border p-3 rounded-lg'
                name='expiryDate'
                type='date'
                value={expiryDates[index]}
                onChange={(e) => handleExpiryDateChange(e, index)}
              />
              <input
                className='border p-3 rounded-lg text-center'
                name='file'
                type='file'
                accept='application/pdf'
                onChange={(e) => handleFileChange(e, index)}
              />
            </div>
          ))}
          <button
            className='bg-blue-500 text-white p-3 rounded-lg'
            type='button'
            onClick={handleAddField}
          >
            Adicionar Documento
          </button>
          <button
            className='bg-blue-500 text-white p-3 rounded-lg'
            type='submit'
          >
            Enviar
          </button>
        </form>
        <section className='p-3'>
          {colab && colab.pdfs && colab.pdfs.map((pdf, index) => (
            <div key={index} className='flex gap-4'>
              <p>{pdf.name}</p>
              <p>{pdf.expiryDate}</p>
              <div>
                <a className='ml-2 bg-green-500 p-2 rounded' href={`/api/colab/pdf/${params.id}/file/${index}`} download>
                  Download
                </a>
                <button
                  className='ml-2 bg-red-500 text-white p-2 rounded'
                  onClick={() => deletePdf(index)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}