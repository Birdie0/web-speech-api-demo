export async function sleep(ms: number): Promise<void> {
  await new Promise(r => setTimeout(r, ms))
}

export async function getVoices(
  maxTries = 10,
): Promise<SpeechSynthesisVoice[]> {
  let tries = 0
  let arr = window.speechSynthesis.getVoices()
  while (arr.length === 0) {
    if (tries === maxTries)
      break
    await sleep(500)
    arr = window.speechSynthesis.getVoices()
    ++tries
  }
  return arr
}
