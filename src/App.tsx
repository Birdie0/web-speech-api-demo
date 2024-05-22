import { useEffect, useState } from 'react'
import { getVoices } from './utils'

function App() {
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    async function fetchVoices() {
      const voices = await getVoices()
      setVoice(voices[0])
      setVoiceOptions(voices)
    }
    fetchVoices()
  }, [])

  async function speak() {
    window.speechSynthesis.cancel()

    const ssu = new SpeechSynthesisUtterance(text)
    ssu.pitch = pitch
    ssu.rate = rate
    ssu.volume = volume
    ssu.voice = voice

    window.speechSynthesis.speak(ssu)
  }

  return (
    <>
      <h1>Web Speech API Demo</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          speak()
        }}
      >
        <label htmlFor="pitch">Pitch {pitch}</label>
        <input
          id="volume"
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={pitch}
          onChange={(event) => setPitch(event.target.valueAsNumber)}
        />

        <label htmlFor="volume">Rate {rate}</label>
        <input
          id="volume"
          type="range"
          min={0.1}
          max={10}
          step={0.1}
          value={rate}
          onChange={(event) => setRate(event.target.valueAsNumber)}
        />

        <label htmlFor="volume">Volume {volume}</label>
        <input
          id="volume"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(event) => setVolume(event.target.valueAsNumber)}
        />

        {voice != null && voiceOptions.length > 0 && (
          <>
            <label htmlFor="voice">Voice</label>
            <select
              id="voice"
              value={voice.voiceURI}
              onChange={(event) => {
                const voiceOption = voiceOptions.find(
                  (option) => option.voiceURI === event.target.value,
                )
                if (voiceOption) setVoice(voiceOption)
              }}
            >
              {voiceOptions.map((option) => (
                <option key={option.voiceURI} value={option.voiceURI}>
                  {option.name}
                </option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <button type="submit">Speak</button>
      </form>
    </>
  )
}

export default App
