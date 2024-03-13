import { renderToString } from 'react-dom/server'

import { Avatar } from '../../components/organism'
import { LabItemGroupType, CategoryIndex } from '../enum'
import { getLabItemTupleIndex, saleDescriptionList } from '../middleware'
import type { CategoryByGroup, IGroupItem } from '../type'

export const GetCategoryGroup = (): CategoryByGroup => {
  const categoryGroup: CategoryByGroup = []
  categoryGroup[LabItemGroupType.Wearable] = [
    CategoryIndex.Shirt,
    CategoryIndex.Hat,
    CategoryIndex.Mask,
  ]
  categoryGroup[LabItemGroupType.Face] = [CategoryIndex.Smile]
  categoryGroup[LabItemGroupType.Special] = [CategoryIndex.Star]
  categoryGroup[LabItemGroupType.Background] = [CategoryIndex.Background]

  return categoryGroup
}

export const GetLabItemsAvailable = (groupType: IGroupItem) => {
  const categoryGroup = GetCategoryGroup()

  const itemList = categoryGroup[groupType.id].some(
    (category) => category === CategoryIndex.Background || CategoryIndex.Star,
  )
    ? saleDescriptionList.filter((item) =>
        categoryGroup[groupType.id].some((category) => category === getLabItemTupleIndex(item.id)),
      )
    : saleDescriptionList.filter((item) => {
        const attrTupleId = getLabItemTupleIndex(item.id)
        return attrTupleId > CategoryIndex.Background && attrTupleId < CategoryIndex.Star
      })

  return itemList
}

export const GetLabItemId = (labItemId: string) => {
  return parseInt(labItemId.split(':')[0], 16)
}

const generateSVGElement = (selectedItem: any): SVGElement => {
  const svgString = renderToString(<Avatar selectSvgKey={selectedItem.svgKey} />)
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
  return svgDoc.documentElement as unknown as SVGElement
}

export const generateImage = async (selectedItem: any): Promise<string> => {
  const svgElement = generateSVGElement(selectedItem)
  const svgString = new XMLSerializer().serializeToString(svgElement)
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)))
}


export const generateImageSvg = async (selectedItem: any): Promise<string> => {
  const svgElement = generateSVGElement(selectedItem)
  const svgString = new XMLSerializer().serializeToString(svgElement)
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)))
}
