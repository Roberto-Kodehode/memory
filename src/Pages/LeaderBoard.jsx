export function LeaderBoard() {
  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Turns</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>player.name</td>
            <td>player.turns</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
