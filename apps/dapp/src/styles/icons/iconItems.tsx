import icon3_background from '../../assets/img/icons/lab/iconItem/icon3_background.svg'
import icon3_hat from '../../assets/img/icons/lab/iconItem/icon3_hat.svg'
import icon3_mask from '../../assets/img/icons/lab/iconItem/icon3_mask.svg'
import icon3_shirt from '../../assets/img/icons/lab/iconItem/icon3_shirt.svg'
import icon3_smile from '../../assets/img/icons/lab/iconItem/icon3_smile.svg'
import icon3_star from '../../assets/img/icons/lab/iconItem/icon3_star.svg'
import { CategoryIndex } from '../../global/enum'
import type { ICategoryIcon } from '../../global/type'

/**
 * categoryIndex:
 * 0: background,
 * 1: shirt,
 * 2: faceColor,
 * 3: smile,
 * 4: mask,
 * 5: hat,
 * 6: star
 *
 */

const iconItems: ICategoryIcon[] = [
  {
    category: CategoryIndex.Hat,
    id: 40277,
    src: icon3_hat,
  },
  {
    category: CategoryIndex.Shirt,
    id: 40276,
    src: icon3_shirt,
  },
  {
    category: CategoryIndex.Smile,
    id: 40275,
    src: icon3_smile,
  },
  {
    category: CategoryIndex.Background,
    id: 40274,
    src: icon3_background,
  },
  {
    category: CategoryIndex.Mask,
    id: 40282,
    src: icon3_mask,
  },
  {
    category: CategoryIndex.Star,
    id: 40284,
    src: icon3_star,
  },
]

export default iconItems
