"use client"

import { useState, useEffect, useRef } from 'react';
import { LotteryOption, parseOptions, drawLottery } from '@/lib/lottery';

export default function LotteryPage() {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<LotteryOption[]>([]);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<LotteryOption | null>(null);
  const [rollingName, setRollingName] = useState<string>("?");
  
  // 用於記錄已中籤的 ID（若不允許重複中籤）
  const [drawnIds, setDrawnIds] = useState<Set<string>>(new Set());

  // 處理抽籤邏輯與動畫
  const handleStartDraw = () => {
    const currentOptions = parseOptions(input);
    
    // 過濾邏輯：若不允許重複，排除已中籤者
    const availableOptions = allowDuplicates 
      ? currentOptions 
      : currentOptions.filter(opt => !drawnIds.has(opt.name)); // 以名稱作為唯一判斷基準或可改用 ID

    if (availableOptions.length === 0) {
      alert("沒有可抽籤的選項（或選項已抽完）");
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // 文字滾動動畫邏輯
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      setRollingName(availableOptions[randomIndex].name);
      counter++;
      
      if (counter > 20) { // 滾動約 2 秒
        clearInterval(interval);
        const winner = drawLottery(availableOptions);
        if (winner) {
          setResult(winner);
          setRollingName(winner.name);
          if (!allowDuplicates) {
            setDrawnIds(prev => new Set(prev).add(winner.name));
          }
        }
        setIsSpinning(false);
      }
    }, 100);
  };

  const resetLottery = () => {
    setDrawnIds(new Set());
    setResult(null);
    setRollingName("?");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">抽籤工具</h1>

      {/* 輸入區 */}
      <section className="space-y-2">
        <label className="block font-medium">輸入選項（格式：名稱,權重）</label>
        <textarea
          className="w-full h-40 p-3 border rounded-md bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="例如：&#10;小明,1&#10;小華,5&#10;小王"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className="text-xs text-gray-500">提示：每行一個選項，權重預設為 1。</p>
      </section>

      {/* 設定區 */}
      <section className="flex items-center gap-6 p-4 border rounded-lg border-gray-200 dark:border-gray-800">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="w-4 h-4"
          />
          <span>允許重複中籤</span>
        </label>
        <button 
          onClick={resetLottery}
          className="text-sm text-red-500 hover:underline"
        >
          重設已抽籤名單
        </button>
      </section>

      {/* 抽籤展示區 */}
      <section className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="text-5xl font-bold mb-8 h-16 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {rollingName}
        </div>
        
        <button
          onClick={handleStartDraw}
          disabled={isSpinning || !input.trim()}
          className={`px-8 py-3 rounded-full font-bold text-white transition-all ${
            isSpinning || !input.trim() 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 shadow-lg active:scale-95"
          }`}
        >
          {isSpinning ? "抽籤中..." : "開始抽籤"}
        </button>

        {result && !isSpinning && (
          <div className="mt-6 text-green-600 dark:text-green-400 font-medium">
            恭喜中籤：{result.name} (權重: {result.weight})
          </div>
        )}
      </section>
      
      {!allowDuplicates && drawnIds.size > 0 && (
        <section className="text-sm text-gray-500">
          已中籤人數：{drawnIds.size}
        </section>
      )}
    </div>
  );
}