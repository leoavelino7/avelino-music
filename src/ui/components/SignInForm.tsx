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
      <h4 className="text-black dark:text-white text-xl font-light mt-20">
        <span className="font-medium">Olá, seja bem vindo(a) ao Avelino Music.</span> <br />
        <span className="text-lg">Entre com sua conta do Spotify para poder montar sua playlist favorita</span>
      </h4>
      <form className="mt-3" onSubmit={handleSubmit}>
        <button
          type="submit"
          className={`
          bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 border-b-4 
          border-green-700 hover:border-green-500 rounded mr-5 transition duration-300 ease-out`}
        >
          Entrar com Spotify
        </button>
      </form>
    </section>
  )
}

export default SignInForm
