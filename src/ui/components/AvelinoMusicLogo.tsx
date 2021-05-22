interface AvelinoMusicLogoProps {
  onClasses?: React.HTMLAttributes<HTMLDivElement>
}

const AvelinoMusicLogo: React.FC<AvelinoMusicLogoProps> = ({ onClasses }) => (
  <div className={`flex flex-row justify-center items-center ${onClasses?.className}`}>
    <img src="images/avelino-music.png" alt="Logo Avelino Music" title="Avelino Music" className="w-7 h-7" />
    <strong
      className={`
          lg:block p-2 text-customGreen my-8 font-sans font-medium tracking-tight text-2xl
        `}
    >
      Avelino Music
    </strong>
  </div>
)

export default AvelinoMusicLogo
