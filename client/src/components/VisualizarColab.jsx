import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VisualizarColab() {
  const params = useParams();
  const [colab, setColab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileNames, setFileNames] = useState(['']);
  const [files, setFiles] = useState([null]);
  const [expiryDates, setExpiryDates] = useState(['']);

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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className='text-red-600 text-center'>{error}</p>;

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Visualizar Colaborador</h1>
      <section>
        <form className='flex flex-col gap-4 p-3' onSubmit={handleSubmit}>
          <h2>Colaborador: {colab?.nome}</h2>
          {fileNames.map((_, index) => (
            <div key={index} className='flex gap-4'>
              <input
                className='border p-3 rounded-lg'
                name='name'
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
            Adicionar outro PDF
          </button>
          <button
            className='bg-blue-500 text-white p-3 rounded-lg'
            type='submit'
          >
            Enviar
          </button>
        </form>
        <section className='p-3'>
          {colab.pdfs?.map((pdf, index) => (
            <div key={index}>
              <a href={`/api/colab/pdf/${params.id}/file/${index}`} target='_blank' rel='noopener noreferrer'>
                {pdf.name}
              </a>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}