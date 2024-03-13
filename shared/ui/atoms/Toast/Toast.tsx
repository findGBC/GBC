import type { Id, TypeOptions, UpdateOptions } from 'react-toastify'
import { toast } from 'react-toastify'

const baseOptions: UpdateOptions = {
  autoClose: 5000,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: false,
  isLoading: false,
  position: 'top-right',
  progress: undefined,
  theme: 'dark',
}

class Toast {
  private id: Id

  constructor(content: string) {
    this.id = toast.loading(content)
  }

  update(type: TypeOptions, content: string) {
    const options = baseOptions
    options.type = type
    options.render = content
    options.isLoading = false

    toast.update(this.id, options)
  }
}
export default Toast
