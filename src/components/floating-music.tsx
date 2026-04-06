"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { SoundCleanup } from "@/lib/audio-generator";

type Track = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  generator: string; // audio-generator の関数名に対応
};

const tracks: Track[] = [
  {
    id: "musicbox",
    label: "オルゴール",
    emoji: "🎵",
    description: "やさしいオルゴールの音色",
    generator: "playMusicBox",
  },
  {
    id: "whitenoise",
    label: "ホワイトノイズ",
    emoji: "☁️",
    description: "安心感のあるノイズ",
    generator: "playWhiteNoise",
  },
  {
    id: "rain",
    label: "雨の音",
    emoji: "🌧️",
    description: "しとしと降る雨音",
    generator: "playRain",
  },
  {
    id: "wave",
    label: "波の音",
    emoji: "🌊",
    description: "穏やかな波の音",
    generator: "playWaves",
  },
  {
    id: "lullaby",
    label: "子守唄",
    emoji: "🌙",
    description: "眠りを誘うメロディ",
    generator: "playLullaby",
  },
];

export function FloatingMusic() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef<SoundCleanup | null>(null);
  const pathname = usePathname();

  // トップページでは非表示
  if (pathname === "/") return null;

  async function handlePlay(track: Track) {
    // 同じ曲をタップ → 停止
    if (playing === track.id) {
      soundRef.current?.stop();
      soundRef.current = null;
      setPlaying(null);
      return;
    }

    // 別の曲を再生中なら停止
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current = null;
    }

    // 動的インポートで audio-generator をロード
    const generators = await import("@/lib/audio-generator");
    const fn = generators[track.generator as keyof typeof generators] as
      | ((v: number) => SoundCleanup)
      | undefined;
    if (!fn) return;

    const sound = fn(volume);
    soundRef.current = sound;
    setPlaying(track.id);
  }

  function handleVolumeChange(newVolume: number) {
    setVolume(newVolume);
    soundRef.current?.setVolume(newVolume);
  }

  function handleStop() {
    soundRef.current?.stop();
    soundRef.current = null;
    setPlaying(null);
  }

  // アンマウント時のみクリーンアップ
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      soundRef.current?.stop();
      soundRef.current = null;
    };
  }, []);

  return (
    <>
      {/* FABボタン — 検索の反対側（左下）に配置 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all ${
            playing
              ? "bg-emerald-500 text-white animate-pulse"
              : "bg-white/90 text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
          }`}
          aria-label="音楽を聴く"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>
      )}

      {/* 音楽選択オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-2xl p-5 pb-8 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎶</span>
                <h3 className="text-sm font-semibold text-foreground">
                  リラックスサウンド
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1"
              >
                閉じる
              </button>
            </div>

            {/* トラックリスト */}
            <div className="space-y-2 mb-4">
              {tracks.map((track) => {
                const isActive = playing === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handlePlay(track)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-emerald-50 border-2 border-emerald-300 shadow-sm"
                        : "bg-muted/30 border-2 border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        isActive ? "bg-emerald-100" : "bg-muted/50"
                      }`}
                    >
                      {isActive ? "⏸️" : track.emoji}
                    </span>
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-emerald-700" : "text-foreground"
                        }`}
                      >
                        {track.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {track.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-emerald-500 rounded-full animate-[musicBar1_0.8s_ease-in-out_infinite]" />
                        <span className="w-1 bg-emerald-500 rounded-full animate-[musicBar2_0.6s_ease-in-out_infinite_0.2s]" />
                        <span className="w-1 bg-emerald-500 rounded-full animate-[musicBar3_0.7s_ease-in-out_infinite_0.1s]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 音量スライダー */}
            <div className="flex items-center gap-3 px-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-muted-foreground shrink-0"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {volume > 0 && (
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                )}
                {volume > 0.5 && (
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                )}
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="flex-1 h-1.5 accent-emerald-500 rounded-full cursor-pointer"
              />
            </div>

            {/* 停止ボタン（再生中のみ） */}
            {playing && (
              <button
                onClick={handleStop}
                className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                ⏹ 停止する
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes musicBar1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 8px; }
          50% { height: 12px; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
      `}</style>
    </>
  );
}
