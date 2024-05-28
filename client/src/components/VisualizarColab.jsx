import { useEffect, useRef, useState } from 'react';

export default function VisualizarColab() {
  const [fileUpload, setFileUpload] = useState(null);

  const handleFileUpload = (e) => {
    e.preventDefault();
    setFileUpload(e.target.files[0])
    console.log(e.target.files[0]);
  }

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <h1 className='text-3xl p-3 text-center border'>Visualizar Colaborador</h1>
      <section>
        <form className='flex gap-4 p-3'>
          <h2>cara um</h2>
          <input
            className='border p-3 rounded-lg text-center'
            name='file'
            type='file'
          />
          <button
            onChange={handleFileUpload}
            className='bg-blue-500 text-white p-3 rounded-lg'
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  )
}
