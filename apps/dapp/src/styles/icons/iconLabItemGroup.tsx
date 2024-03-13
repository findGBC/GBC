import icon3_background from '../../assets/img/icons/lab/iconItem/icon3_background.svg'
import icon3_shirt from '../../assets/img/icons/lab/iconItem/icon3_shirt.svg'
import icon3_smile from '../../assets/img/icons/lab/iconItem/icon3_smile.svg'
import icon3_star from '../../assets/img/icons/lab/iconItem/icon3_star.svg'
import { LabItemGroupType } from '../../global/enum'
import type { IGroupItem } from '../../global/type'

const IconLabItemGroup: IGroupItem[] = [
  {
    id: LabItemGroupType.Wearable,
    name: 'Wearables',
    src: icon3_shirt,
  },
  {
    id: LabItemGroupType.Face,
    name: 'Face',
    src: icon3_smile,
  },
  {
    id: LabItemGroupType.Special,
    name: 'Special',
    src: icon3_star,
  },
  {
    id: LabItemGroupType.Background,
    name: 'Background',
    src: icon3_background,
  },
]

export default IconLabItemGroup
