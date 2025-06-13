import { shuffleArray } from "../bot/utils/shuffle";
import { rolePatterns } from "../config/pattarns";

export function assignRoles(players: string[]): Record<string, string> {
  const numPlayers = players.length;
  const patterns = rolePatterns[numPlayers];
  if (!patterns) throw new Error(`未対応のプレイヤー数です: ${numPlayers}`);

  const selectedPattern = shuffleArray(patterns)[0];
  const shuffledPlayers = shuffleArray([...players]);

  const assignments: Record<string, string> = {};
  for (let i = 0; i < shuffledPlayers.length; i++) {
    assignments[shuffledPlayers[i]] = selectedPattern[i];
  }

  return assignments;
}
