import { useState } from 'react'
import SearchIcon from './icons/SearchIcon'

interface SearchFormProps {
  inputProps: React.HTMLProps<HTMLInputElement>
  onHandleSearch(text: string): void
}

const SearchForm: React.FC<SearchFormProps> = ({ inputProps, onHandleSearch }) => {
  const [text, setText] = useState('')

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    onHandleSearch(text)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="pt-2 my-2 mx-auto md:mx-0 relative text-black dark:text-gray-700">
        <input
          className={`
            bg-white border-2 border-gray-200 w-11/12 h-10 md:w-full px-9 pr-16 
            rounded-3xl text-sm focus:outline-none disabled:opacity-25`}
          {...inputProps}
          name="search"
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-4 mr-10" onClick={handleSubmit}>
          <SearchIcon />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
