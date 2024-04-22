import { Constants } from '../global/constant'

import useFetch from './useFetch'
const useTreasury = () => {
  const { data, loading } = useFetch(
    `${Constants.URL.GBC_API}/pulsar/treasury`
  )

  console.log(data)
  return {
    loading,
    treasury: data,
  }
}
export default useTreasury
