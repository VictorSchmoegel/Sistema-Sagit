import { useState } from 'react'

export default function CadastroColab() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setSuccess(false)
      const res = await fetch('/api/colab/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      setSuccess(true)
      setFormData({ nome: '', cpf: '', rg: ''})
    } catch (error) {
      setError('Erro ao cadastrar')
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <main className='bg-slate-100 min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-lg mx-auto p-20'>
        <input
          className='border p-3 rounded-lg'
          type='text'
          id='nome'
          placeholder='Nome'
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          className='border p-3 rounded-lg'
          type='number'
          id='cpf'
          placeholder='CPF'
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <input
          className='border p-3 rounded-lg'
          type='number'
          id='rg'
          placeholder='RG'
          value={formData.rg}
          onChange={handleChange}
          required
        />
      <button
        disabled={loading}
        className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700'
      >
        {loading ? 'Carregando...' : 'Cadastrar'}
      </button>
      </form>
      {error && <p className='text-red-600 text-center'>{error}</p>}
      {success && <p className='text-green-600 text-center'>Colaborador cadastrado com sucesso</p>}
    </main>
  )
}

