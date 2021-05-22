interface TitleHeaderProps {
  title: string
  description?: string
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, description }) => (
  <header className="my-5 md:mt-8">
    <h2 className="text-xl text-black dark:text-gray-300 font-light">
      {title}
      {description && <span className="font-medium ml-1">{description}</span>}
    </h2>
  </header>
)

export default TitleHeader
