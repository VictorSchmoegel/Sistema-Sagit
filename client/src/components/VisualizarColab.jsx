import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VisualizarColab = () => {
  const { id } = useParams();
  const [colab, setColab] = useState({ pdfs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchColab = async () => {
      try {
        const response = await fetch(`/api/colab/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do colaborador');
        }
        const data = await response.json();
        setColab(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColab();
  }, [id]);

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    const newPdfFiles = [...pdfFiles];
    newPdfFiles[index] = files[0];
    setPdfFiles(newPdfFiles);
  };

  const handleNameChange = (e, index) => {
    const newNames = [...names];
    newNames[index] = e.target.value;
    setNames(newNames);
  };

  const handleExpiryDateChange = (e, index) => {
    const newExpiryDates = [...expiryDates];
    newExpiryDates[index] = e.target.value;
    setExpiryDates(newExpiryDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    pdfFiles.forEach((file, index) => {
      formData.append('pdfs', file);
      formData.append('names', names[index]);
      formData.append('expiryDates', expiryDates[index]);
    });

    try {
      const response = await fetch(`/api/colab/pdf/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload dos documentos');
      }

      const updatedColab = await response.json();
      setColab(updatedColab);
      setPdfFiles([]);
      setNames([]);
      setExpiryDates([]);
      setAlertMessage('Documentos enviados com sucesso');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Carregando...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Colaborador: {colab.nome}</h2>

      {alertMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Sucesso!</strong>
          <span className="block sm:inline"> {alertMessage}</span>
        </div>
      )}

      <h3 className="text-xl font-medium mt-8 mb-4">Adicionar Novo Documento</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {pdfFiles.map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <label className="flex-1">
                Nome:
                <input
                  type="text"
                  value={names[index] || ''}
                  onChange={(e) => handleNameChange(e, index)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
              <label className="flex-1">
                Data de Validade:
                <input
                  type="date"
                  value={expiryDates[index] || ''}
                  onChange={(e) => handleExpiryDateChange(e, index)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <label>
              Documento PDF:
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, index)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setPdfFiles([...pdfFiles, null])}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Adicionar Outro Documento
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar Documentos
          </button>
        </div>
      </form>

      <section className='flex flex-col gap-4'>
        <h3 className="text-xl font-medium mb-2 p-3 mt-2">Documentos:</h3>
        <ul className="space-y-4">
          {colab.pdfs && colab.pdfs.map((pdf, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium">Nome: {pdf.name}</p>
              <p className="text-sm text-gray-600">Data de Validade: {new Date(pdf.expiryDate).toLocaleDateString('pt-BR')}</p>
              <a
                href={`/api/colab/pdf/${id}/file/${index}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Baixar
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default VisualizarColab;
