import { useEffect, useState } from 'react'

type IGenerateImageFunction = (selectedItem: any) => Promise<string>
type ITitleSvg = string

const useImageDownloader = (
  generateImageFunction: IGenerateImageFunction,
  selectedItem: any,
  titleSvg: ITitleSvg,
) => {
  const [downloadTrigger, setDownloadTrigger] = useState<boolean>(false)

  useEffect(() => {
    const handleDownload = async () => {
      const imageDataURL = await generateImageFunction(selectedItem)
      downloadSVGAsPNG(imageDataURL)
    }

    if (downloadTrigger) {
      handleDownload()
      setDownloadTrigger(false)
    }
  }, [downloadTrigger, generateImageFunction, selectedItem])

  const triggerDownload = () => {
    setDownloadTrigger(true)
  }

  const downloadSVGAsPNG = (svg: string) => {
    const canvas = document.createElement('canvas')
    const w = 1500
    const h = 1500
    const img_to_download = document.createElement('img')
    img_to_download.src = svg

    img_to_download.onload = function () {
      canvas.setAttribute('width', w.toString())
      canvas.setAttribute('height', h.toString())
      const context = canvas.getContext('2d')
      context.drawImage(img_to_download, 0, 0, w, h)
      const dataURL = canvas.toDataURL('image/png')
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), titleSvg)
        e.preventDefault()
      } else {
        const a = document.createElement('a')
        const my_evt = new MouseEvent('click')
        a.download = titleSvg
        a.href = dataURL
        a.dispatchEvent(my_evt)
      }
    }
  }

 
  return { triggerDownload }
}
export default useImageDownloader
