import { useEffect, useRef } from 'react'

interface Image {
  src: string
  title?: string
  alt?: string
}

export interface AudioPlayerProps {
  image: Image
  mainText: string
  secondaryText: string
  audioSrc: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ image, mainText, secondaryText, audioSrc }) => {
  const audioElementRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = 0.05
    }
  }, [])

  useEffect(() => {
    if (audioElementRef.current && audioSrc) {
      audioElementRef.current.src = audioSrc
      audioElementRef.current.play()
    }
  }, [audioSrc])

  return (
    <div
      className={`
        grid grid-cols-7 bg-gray-300 dark:bg-customBlack border-t-2 border-gray-900 dark:border-gray-200 
        border-opacity-5 dark:border-opacity-5`}
    >
      <div className="col-span-4 md:col-span-5 flex flex-row items-start">
        <img src={image.src} title={image.title} alt={image.alt} className="md:m-4 md:rounded-md w-14 h-15" />
        <div className="flex flex-col justify-center m-3 text-black dark:text-white">
          <span className="md:hidden text-sm font-medium">{mainText.length > 15 ? mainText.slice(0, 15).concat('...') : mainText}</span>
          <span className="hidden md:block text-sm font-medium">{mainText}</span>
          <span className="text-xs mt-1">{secondaryText}</span>
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 flex justify-center items-center lg:mr-5">
        <audio controls ref={audioElementRef} className="h-10">
          <source type="audio/mpeg" src={audioSrc} />
          Seu navegador não suporta audio
        </audio>
      </div>
    </div>
  )
}

export default AudioPlayer
