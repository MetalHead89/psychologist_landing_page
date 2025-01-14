export function useFileUtils() {
  const fileToBase64: (file: File) => Promise<string> = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

  return { fileToBase64 }
}
