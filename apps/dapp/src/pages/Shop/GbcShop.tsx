const GbcShop = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: 'XM',
      winLoss: '12/2',
      pnl: 55269.25,
      pnlFormatted: '+55,269.25',
      percentageFormatted: '+100.93%',
      cashPrize: 20000,
      cashPrizeFormatted: '$20,000',
      color: 'text-purple-500', // ou une autre classe pour la couleur de l'avatar
    },
    {
      rank: 2,
      name: 'Monte',
      winLoss: '6/0',
      pnl: 42593.19,
      pnlFormatted: '+42,593.19',
      percentageFormatted: '+96.47%',
      cashPrize: 15000,
      cashPrizeFormatted: '$15,000',
      color: 'text-yellow-500',
    },
    {
      rank: 3,
      name: 'Feedthem',
      winLoss: '4/2',
      pnl: 30437.02,
      pnlFormatted: '+30,437.02',
      percentageFormatted: '+12.36%',
      cashPrize: 10000,
      cashPrizeFormatted: '$10,000',
      color: 'text-blue-500',
    },
    // Ajoutez d'autres joueurs comme nécessaire
  ]

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md sm:max-w-xl">
        <h1 className="text-xl font-bold text-center text-white sm:text-2xl">Leaderboard</h1>

        {/* Liste des joueurs */}
        <div className="mt-6 space-y-4">
          {leaderboardData.map((player, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 bg-gray-800 rounded-xl sm:flex-row sm:justify-between sm:items-center"
            >
              {/* Avatar et nom */}
              <div className="flex items-center space-x-4">
                <img src={player.avatar} alt={player.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="text-lg font-bold text-white">{player.name}</div>
                  <div className="text-sm text-gray-400">{player.winLoss}</div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="flex flex-col items-start space-y-2 mt-4 sm:mt-0 sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-center">
                <div className="text-green-400">
                  <div className="font-bold text-lg sm:text-base">{player.pnl}</div>
                  <div className="text-xs sm:text-sm">{player.percentage}</div>
                </div>
                <div className="font-bold text-lg text-white">{player.cashPrize}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GbcShop
