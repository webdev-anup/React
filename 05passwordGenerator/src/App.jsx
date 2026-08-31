import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength logic
  const getStrength = () => {
    if (length >= 16 && numberAllowed && charAllowed)
      return { label: "Strong", bars: 4, color: "bg-emerald-500" };
    if (length >= 12 && (numberAllowed || charAllowed))
      return { label: "Good", bars: 3, color: "bg-yellow-400" };
    if (length >= 8) return { label: "Fair", bars: 2, color: "bg-orange-400" };
    return { label: "Weak", bars: 1, color: "bg-rose-500" };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 flex items-center justify-center p-4">
      {/* Glow effect behind card */}
      <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-black/40">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            🔐 Password Generator
          </h1>
          <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">
            Secure & Random
          </p>
        </div>

        {/* Password Display */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-cyan-300 font-mono tracking-widest text-base outline-none shadow-inner"
          />
          <button
            onClick={copyToClipboard}
            className={`px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 active:scale-95 shadow-lg
              ${
                copied
                  ? "bg-emerald-500 shadow-emerald-500/30"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/25"
              }`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        {/* Strength Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              Strength
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {strength.label}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  bar <= strength.bars ? strength.color : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Length Slider */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 text-sm font-medium">
              Password Length
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg font-mono font-bold text-sm">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 cursor-pointer accent-cyan-400 rounded-full"
          />
        </div>

        {/* Checkbox Tiles */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Numbers */}
          <label className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-slate-700/40 rounded-2xl hover:border-slate-600 hover:bg-slate-800/70 transition-all cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Include Numbers
              </p>
              <p className="text-xs text-slate-400">e.g. 0 - 9</p>
            </div>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </label>

          {/* Special Characters */}
          <label className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-slate-700/40 rounded-2xl hover:border-slate-600 hover:bg-slate-800/70 transition-all cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Special Characters
              </p>
              <p className="text-xs text-slate-400">e.g. ! @ # \$ %</p>
            </div>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </label>
        </div>

        {/* Regenerate Button */}
        <button
          onClick={passwordGenerator}
          className="w-full py-3 rounded-2xl font-semibold tracking-wide text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition-all duration-200 active:scale-95 shadow-lg shadow-cyan-500/20"
        >
        Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
