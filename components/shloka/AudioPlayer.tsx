'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
    src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const setAudioData = () => {
            setDuration(audio.duration)
            setProgress(audio.currentTime)
        }

        const setAudioTime = () => setProgress(audio.currentTime)
        const setAudioEnded = () => {
            setIsPlaying(false)
            setProgress(0)
        }

        audio.addEventListener('loadeddata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)
        audio.addEventListener('ended', setAudioEnded)

        return () => {
            audio.removeEventListener('loadeddata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
            audio.removeEventListener('ended', setAudioEnded)
        }
    }, [])

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
            setProgress(newTime)
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            setVolume(newVolume)
        }
    }

    const formatTime = (time: number) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60)
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            const seconds = Math.floor(time % 60)
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
            return `${formatMinutes}:${formatSeconds}`
        }
        return '00:00'
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-6 p-4 bg-white/50 rounded-lg shadow-sm border border-orange-100">
            <audio ref={audioRef} src={src} preload="metadata" />

            <div className="flex items-center w-full gap-4 mb-2">
                <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

                <div className="flex-1 flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={progress}
                        onChange={handleProgressChange}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        aria-label="Seek progress"
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center w-full justify-end gap-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                    <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.06 4.5 4.5 0 000-6.364.75.75 0 010-1.062z" />
                </svg>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    aria-label="Volume control"
                />
            </div>
        </div>
    )
}
