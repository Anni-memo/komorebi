/**
 * こもれびリラックスサウンド — Web Audio API による音声生成
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export type SoundCleanup = {
  stop: () => void;
  setVolume: (v: number) => void;
};

// ─── ホワイトノイズ ───
export function playWhiteNoise(volume: number): SoundCleanup {
  const ctx = getAudioContext();
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  // やわらかくするためローパスフィルター
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 4000;

  const gain = ctx.createGain();
  gain.gain.value = volume * 0.3;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();

  return {
    stop: () => { source.stop(); source.disconnect(); },
    setVolume: (v) => { gain.gain.value = v * 0.3; },
  };
}

// ─── 雨の音 ───
export function playRain(volume: number): SoundCleanup {
  const ctx = getAudioContext();

  // ベースノイズ（連続した雨音）
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 2500;
  bandpass.Q.value = 0.5;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 800;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = volume * 0.25;

  noiseSource.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start();

  // 雨粒のドロップ音
  const dropGain = ctx.createGain();
  dropGain.gain.value = volume * 0.15;
  dropGain.connect(ctx.destination);

  let dropInterval: ReturnType<typeof setInterval> | null = null;
  dropInterval = setInterval(() => {
    const numDrops = Math.floor(Math.random() * 3) + 1;
    for (let d = 0; d < numDrops; d++) {
      const delay = Math.random() * 200;
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 2000 + Math.random() * 4000;
          const dropEnv = ctx.createGain();
          dropEnv.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
          dropEnv.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(dropEnv);
          dropEnv.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.05);
        } catch { /* ignore after stop */ }
      }, delay);
    }
  }, 150);

  return {
    stop: () => {
      noiseSource.stop();
      noiseSource.disconnect();
      if (dropInterval) clearInterval(dropInterval);
    },
    setVolume: (v) => {
      noiseGain.gain.value = v * 0.25;
      dropGain.gain.value = v * 0.15;
    },
  };
}

// ─── 波の音 ───
export function playWaves(volume: number): SoundCleanup {
  const ctx = getAudioContext();

  // ベースノイズ
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;

  // LFOで波の寄せ引きを再現
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.08; // 約12秒周期

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 400;

  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  // 第2のLFO（音量の揺れ）
  const volumeLfo = ctx.createOscillator();
  volumeLfo.type = "sine";
  volumeLfo.frequency.value = 0.1;

  const volumeLfoGain = ctx.createGain();
  volumeLfoGain.gain.value = volume * 0.15;

  const mainGain = ctx.createGain();
  mainGain.gain.value = volume * 0.3;

  volumeLfo.connect(volumeLfoGain);
  volumeLfoGain.connect(mainGain.gain);
  volumeLfo.start();

  source.connect(filter);
  filter.connect(mainGain);
  mainGain.connect(ctx.destination);
  source.start();

  return {
    stop: () => {
      source.stop();
      lfo.stop();
      volumeLfo.stop();
      source.disconnect();
      lfo.disconnect();
      volumeLfo.disconnect();
    },
    setVolume: (v) => {
      mainGain.gain.value = v * 0.3;
      volumeLfoGain.gain.value = v * 0.15;
    },
  };
}

// ─── オルゴール（仮 — 後でSuno/Udioで差し替え） ───
export function playMusicBox(volume: number): SoundCleanup {
  const ctx = getAudioContext();
  const mainGain = ctx.createGain();
  mainGain.gain.value = volume * 0.4;
  mainGain.connect(ctx.destination);

  // きらきら星風のメロディ（ド ド ソ ソ ラ ラ ソ — ファ ファ ミ ミ レ レ ド）
  const melody = [
    523, 523, 784, 784, 880, 880, 784, 0,
    698, 698, 659, 659, 587, 587, 523, 0,
    784, 784, 698, 698, 659, 659, 587, 0,
    784, 784, 698, 698, 659, 659, 587, 0,
    523, 523, 784, 784, 880, 880, 784, 0,
    698, 698, 659, 659, 587, 587, 523, 0,
  ];

  const noteDuration = 0.45;
  const noteGap = 0.05;
  let currentNote = 0;
  let stopped = false;

  function playNote() {
    if (stopped) return;

    const freq = melody[currentNote % melody.length];
    if (freq > 0) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      // オルゴール風エンベロープ（アタックが速く、減衰が長い）
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + noteDuration);

      // 倍音を追加（オルゴールのキラキラ感）
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = freq * 3;
      const env2 = ctx.createGain();
      env2.gain.setValueAtTime(0, ctx.currentTime);
      env2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      env2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration * 0.5);

      osc.connect(env);
      env.connect(mainGain);
      osc2.connect(env2);
      env2.connect(mainGain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + noteDuration);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + noteDuration);
    }

    currentNote++;
    if (!stopped) {
      noteTimeout = setTimeout(playNote, (noteDuration + noteGap) * 1000);
    }
  }

  let noteTimeout: ReturnType<typeof setTimeout> | null = null;
  playNote();

  return {
    stop: () => {
      stopped = true;
      if (noteTimeout) clearTimeout(noteTimeout);
      mainGain.disconnect();
    },
    setVolume: (v) => {
      mainGain.gain.value = v * 0.4;
    },
  };
}

// ─── 子守唄（仮 — 後でSuno/Udioで差し替え） ───
export function playLullaby(volume: number): SoundCleanup {
  const ctx = getAudioContext();
  const mainGain = ctx.createGain();
  mainGain.gain.value = volume * 0.35;
  mainGain.connect(ctx.destination);

  // ゆりかごの歌風メロディ（3/4拍子、ゆっくり）
  // ド ミ ソ — ミ ド — レ ファ ラ — ファ レ ...
  const melody = [
    { freq: 262, dur: 0.6 },
    { freq: 330, dur: 0.6 },
    { freq: 392, dur: 1.2 },
    { freq: 330, dur: 0.6 },
    { freq: 262, dur: 1.2 },
    { freq: 0,   dur: 0.3 },
    { freq: 294, dur: 0.6 },
    { freq: 349, dur: 0.6 },
    { freq: 440, dur: 1.2 },
    { freq: 349, dur: 0.6 },
    { freq: 294, dur: 1.2 },
    { freq: 0,   dur: 0.3 },
    { freq: 330, dur: 0.6 },
    { freq: 392, dur: 0.6 },
    { freq: 494, dur: 1.2 },
    { freq: 392, dur: 0.6 },
    { freq: 330, dur: 1.2 },
    { freq: 0,   dur: 0.3 },
    { freq: 262, dur: 0.6 },
    { freq: 330, dur: 0.6 },
    { freq: 392, dur: 0.6 },
    { freq: 349, dur: 0.6 },
    { freq: 330, dur: 0.6 },
    { freq: 294, dur: 0.6 },
    { freq: 262, dur: 1.8 },
    { freq: 0,   dur: 0.6 },
  ];

  let currentNote = 0;
  let stopped = false;

  function playNote() {
    if (stopped) return;

    const note = melody[currentNote % melody.length];
    if (note.freq > 0) {
      // 温かみのある音色（三角波 + サイン波）
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = note.freq;

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = note.freq;

      const env = ctx.createGain();
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.08);
      env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.dur);

      const env2 = ctx.createGain();
      env2.gain.setValueAtTime(0, ctx.currentTime);
      env2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
      env2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.dur * 0.7);

      osc.connect(env);
      env.connect(mainGain);
      osc2.connect(env2);
      env2.connect(mainGain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + note.dur);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + note.dur);
    }

    const nextDelay = note.dur * 1000;
    currentNote++;
    if (!stopped) {
      noteTimeout = setTimeout(playNote, nextDelay);
    }
  }

  let noteTimeout: ReturnType<typeof setTimeout> | null = null;
  playNote();

  return {
    stop: () => {
      stopped = true;
      if (noteTimeout) clearTimeout(noteTimeout);
      mainGain.disconnect();
    },
    setVolume: (v) => {
      mainGain.gain.value = v * 0.35;
    },
  };
}
