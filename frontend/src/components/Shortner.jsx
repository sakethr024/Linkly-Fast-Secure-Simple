import React, { useState } from "react";
import axios from "axios";
import { FiLink, FiArrowRight, FiCopy, FiCheck } from "react-icons/fi";

const Shortner = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/url/shorten", {
        longUrl,
      });

      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      {/* Background glowing circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* 3D Card */}
      <div
        className="
        relative w-full max-w-lg
        rounded-3xl
        p-8 md:p-10
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        shadow-[0_25px_80px_rgba(0,0,0,0.5)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_35px_100px_rgba(79,70,229,0.3)]
        "
      >
        {/* Top 3D icon */}
        <div className="flex justify-center mb-6">
          <div
            className="
            w-20 h-20
            rounded-2xl
            flex items-center justify-center
            bg-gradient-to-br from-indigo-500 to-purple-600
            shadow-[0_15px_35px_rgba(99,102,241,0.5)]
            rotate-3
            hover:rotate-0
            transition-all duration-300
            "
          >
            <FiLink className="text-white text-4xl -rotate-3" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl font-extrabold text-white tracking-tight">
          URL <span className="text-indigo-400">Shortener</span>
        </h1>

        <p className="text-center text-slate-400 mt-3 mb-8">
          Transform long URLs into short, shareable links.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiLink
              className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-indigo-400
              text-xl
              "
            />

            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              required
              className="
              w-full
              bg-slate-900/70
              border border-white/10
              text-white
              placeholder-slate-500
              rounded-2xl
              pl-12 pr-5 py-4
              outline-none
              transition-all duration-300
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-500/20
              focus:bg-slate-900
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
            group
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            text-white
            font-bold
            text-lg
            shadow-[0_10px_30px_rgba(99,102,241,0.35)]
            hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)]
            hover:-translate-y-1
            active:translate-y-0
            transition-all duration-300
            flex items-center justify-center gap-3
            "
          >
            Shorten URL
            <FiArrowRight
              className="
              text-xl
              group-hover:translate-x-2
              transition-transform duration-300
              "
            />
          </button>
        </form>

        {/* Result */}
        {shortUrl && (
          <div
            className="
            mt-8
            p-5
            rounded-2xl
            bg-slate-900/70
            border border-indigo-500/30
            shadow-inner
            "
          >
            <p className="text-sm text-slate-400 mb-2">Your shortened URL</p>

            <div className="flex items-center gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="
                flex-1
                text-indigo-400
                font-semibold
                hover:text-indigo-300
                break-all
                transition
                "
              >
                {shortUrl}
              </a>

              <button
                onClick={copyUrl}
                type="button"
                className="
                flex-shrink-0
                p-3
                rounded-xl
                bg-indigo-600/20
                text-indigo-400
                hover:bg-indigo-600
                hover:text-white
                transition-all duration-300
                "
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>

            {copied && (
              <p className="text-green-400 text-xs mt-2">
                URL copied successfully!
              </p>
            )}
          </div>
        )}

        {/* Bottom text */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Fast • Secure • Simple
        </p>
      </div>
    </div>
  );
};

export default Shortner;
