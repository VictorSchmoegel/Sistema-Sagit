import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/sagit-logo.png'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/home');
    } catch (error) {
      setError('Erro ao fazer login');
      console.log(error);
    }
  };

  return (
    <main className='bg-slate-100 min-h-screen'>
      <div className='flex flex-col gap-4 max-w-lg mx-auto p-20'>
        <img
          className='mx-auto'
          src={Logo}
          alt='STM SAGIT'
        />
        <h1 className='text-red-600 text-3xl text-center font-semibold my-7'>STM SAGIT</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            className='border p-3 rounded-lg'
            type='text'
            id='usuario'
            placeholder='Usuário'
            onChange={handleChange}
          />
          <input
            className='border p-3 rounded-lg'
            type='password'
            id='senha'
            placeholder='Senha'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700'
          >
            { loading ? 'Carregando...' : 'Entrar' }
          </button>
        </form>
        {error && <p className='text-red-600 text-center'>{error}</p>}
      </div>
    </main>
  )
}