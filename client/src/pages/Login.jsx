import Logo from '../assets/sagit-logo.png'
import Header from '../components/Header'

export default function Home() {
  return (
    <main className='bg-slate-100 min-h-screen'>
      <Header />
      <div className='flex flex-col gap-4 max-w-lg mx-auto p-20'>
        <img
          className='mx-auto'
          src={Logo}
          alt='STM SAGIT'
        />
        <h1 className='text-red-600 text-3xl text-center font-semibold my-7'>STM SAGIT</h1>
        <form className='flex flex-col gap-4'>
          <input
            className='border p-3 rounded-lg'
            type='text'
            id='usuario'
            placeholder='Usuário'
          />
          <input
            className='border p-3 rounded-lg'
            type='password'
            id='senha'
            placeholder='Senha'
          />
          <button
            className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700'
            type='submit'
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}