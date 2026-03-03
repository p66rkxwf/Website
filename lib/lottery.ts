export type LotteryOption = {
  id: string;
  name: string;
  weight: number;
};

// 解析批量匯入的文字（格式：選項名稱,權重）
export function parseOptions(input: string): LotteryOption[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => {
      const parts = line.split(',');
      const name = parts[0].trim();
      // 若無設定權重或格式錯誤，預設為 1
      const weight = parts.length > 1 ? parseInt(parts[1].trim(), 10) : 1;
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        name,
        weight: isNaN(weight) || weight <= 0 ? 1 : weight,
      };
    });
}

// 根據權重進行隨機抽籤
export function drawLottery(options: LotteryOption[]): LotteryOption | null {
  if (options.length === 0) return null;

  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let randomValue = Math.random() * totalWeight;

  for (const option of options) {
    randomValue -= option.weight;
    if (randomValue <= 0) {
      return option;
    }
  }
  
  // 浮點數誤差防禦機制，回傳最後一個選項
  return options[options.length - 1];
}