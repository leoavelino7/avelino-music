export function useAudioPlayer(): [(audio: HTMLAudioElement) => boolean, (audio: HTMLAudioElement) => void] {
  const audioIsPlaying = (audio: HTMLAudioElement): boolean => !audio.paused

  const resetAudio = (audio: HTMLAudioElement): void => {
    audio.currentTime = 0
  }

  return [audioIsPlaying, resetAudio]
}
