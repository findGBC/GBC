import { Loader } from '../../components/mollecules'
import { Avatar } from '../../components/organism'
import { getTupleFromToken } from '../../global/logic/labs'
import type { IToken } from '../../global/middleware'

type DisplayOwnedBerriesProps = {
  ownedBerries: IToken[] | undefined
  isLoading: boolean
}

const DisplayOwnedBerries = ({ ownedBerries, isLoading }: DisplayOwnedBerriesProps) => {
  if (isLoading) {
    return <Loader />
  }

  if (!ownedBerries || ownedBerries.length === 0) {
    return <div>No berries owned</div>
  }

  return (
    <div className="grid gap-4 justify-center text-left grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3">
      {/* GBC */}
      {ownedBerries.map((berry: IToken) => (
        <div className="p-4 bg-base-100 rounded-xl animated fadeIn">
          <div className="rounded-xl">
            <Avatar selectSvgKey={getTupleFromToken(berry)} classes="rounded-xl"></Avatar>
          </div>
          <div className="mt-4 text-secondary-content font-bold text-sm">
            GBC #{parseInt(berry.id.toString(), 16)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayOwnedBerries
