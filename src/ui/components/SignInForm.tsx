import AvelinoMusicLogo from './AvelinoMusicLogo'

interface SignInFormProps {
  onSubmit: () => void
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <section className="flex flex-col justify-start items-start h-screen">
      <AvelinoMusicLogo onClasses={{ className: 'md:hidden' }} />
      <h4 className="text-black dark:text-white text-3xl font-light md:mt-28 leading-9 md:leading-10">
        <span className="font-medium">Olá, seja bem vindo(a) ao Avelino Music.</span> <br />
        <span className="text-xl md:text-2xl">Entre com sua conta do Spotify para poder montar sua playlist favorita</span>
      </h4>
      <form className="mt-8" onSubmit={handleSubmit}>
        <button
          type="submit"
          className={`
          bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 border-b-4 
          border-green-700 hover:border-green-500 rounded mr-5 transition duration-300 ease-out`}
        >
          Entrar com Spotify
        </button>
      </form>
    </section>
  )
}

export default SignInForm
