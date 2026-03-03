"use client"

import { useState, useEffect } from 'react';
import { PasswordOptions, generatePassword, evaluateStrength, PasswordStrength } from '@/lib/password';

export default function PasswordGeneratorPage() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 8,
    includeUpper: false,
    includeLower: false,
    includeDigits: false,
    includeSymbols: false,
  });

  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<PasswordStrength>("極弱");
  const [copied, setCopied] = useState<boolean>(false);

  // 當選項變更時自動生成（若有選取條件）
  useEffect(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(evaluateStrength(newPassword, options));
    setCopied(false);
  }, [options]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("複製失敗", err);
    }
  };

  const strengthColor = {
    '極弱': 'text-gray-500',
    '弱': 'text-red-500',
    '中': 'text-yellow-500',
    '強': 'text-green-500',
  }[strength];

  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-3xl font-bold">密碼生成工具</h1>

      <section className="p-6 border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-6">
        {/* 長度設定 */}
        <div className="space-y-2">
          <label className="block font-medium">密碼長度</label>
          <input
            type="number"
            min="1"
            max="128"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) || 0 })}
            className="w-full p-2 border rounded bg-transparent border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 條件勾選 */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'includeUpper', label: '大寫字母' },
            { id: 'includeLower', label: '小寫字母' },
            { id: 'includeDigits', label: '數字' },
            { id: 'includeSymbols', label: '特殊符號' },
          ].map((item) => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(options as any)[item.id]}
                onChange={(e) => setOptions({ ...options, [item.id]: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 結果顯示區 */}
      <section className="space-y-4">
        <div className="relative group">
          <div className="w-full p-4 pr-12 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg break-all min-h-[3.5rem] flex items-center">
            {password || <span className="text-gray-400 text-sm">請勾選條件以生成密碼</span>}
          </div>
          {password && (
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              title="複製密碼"
            >
              {copied ? (
                <span className="text-xs text-green-500 font-bold">已複製</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              )}
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-sm px-1">
          <span>密碼強度：<span className={`font-bold ${strengthColor}`}>{strength}</span></span>
          <button 
            onClick={() => setOptions({...options})} // 觸發 useEffect 重新生成
            className="text-blue-500 hover:underline"
          >
            重新隨機生成
          </button>
        </div>
      </section>
    </div>
  );
}