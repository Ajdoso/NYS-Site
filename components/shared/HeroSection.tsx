'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Banner, BrandId } from '@/types/ecommerce';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { Zap } from 'lucide-react';

interface HeroSectionProps {
  banner?: Banner;
  brandSlug: BrandId;
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultCtaText?: string;
  defaultCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  banner,
  brandSlug,
  defaultTitle = 'STEPPE HORIZON',
  defaultSubtitle = 'Kazakh national heritage re-engineered into heavyweight modern streetwear.',
  defaultCtaText = 'EXPLORE COLLECTION',
  defaultCtaUrl = `/${brandSlug}/shop`,
  secondaryCtaText = 'SHOP ALL',
  secondaryCtaUrl = `/${brandSlug}/shop`,
}) => {
  const isTyn = brandSlug === 'tyn';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const title = banner?.title || defaultTitle;
  const subtitle = banner?.subtitle || defaultSubtitle;
  const ctaText = banner?.ctaText || defaultCtaText;
  const ctaUrl = banner?.ctaUrl || defaultCtaUrl;
  const imageUrl = banner?.imageUrl || (isTyn
    ? 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85'
    : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85'
  );
  const videoUrl = banner?.videoUrl;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      className={`relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden ${
        isTyn ? 'bg-[#0A1F26] text-[#F7F5F0]' : 'bg-[#050505] text-white'
      }`}
    >
      {/* Background Media: Video with Fallback Image */}
      {videoUrl && !videoFailed ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            poster={imageUrl}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-center transition-transform duration-1000 scale-105"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-100 hover:scale-105 opacity-60"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}

      {/* Cinematic Gradient Overlays */}
      <div
        className={`absolute inset-0 ${
          isTyn
            ? 'bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/50 to-[#0A1F26]/30'
            : 'bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40'
        }`}
      />

      {/* Main Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-12 sm:pt-16">
        {/* Brand Tag Pill */}
        <div className="flex justify-center">
          {isTyn ? (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-[#C49A45]/40 bg-[#0D4352]/80 backdrop-blur-md rounded-full shadow-md">
              <KoshkarMuyiz className="w-4 h-4 text-[#C49A45]" color="#C49A45" />
              <span className="text-[10px] sm:text-xs font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
                Дала Көкжиегі • Drop 01
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-[#25272A] bg-[#0F0F10]/90 backdrop-blur-md rounded-full font-mono shadow-md">
              <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
                PRO-SERIES ZERO • RECOVERY GRADE
              </span>
            </div>
          )}
        </div>

        {/* Big Headline */}
        <h1
          className={`text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none ${
            isTyn ? 'font-serif tracking-wider' : 'font-sans'
          }`}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-base text-zinc-300 font-light tracking-wide leading-relaxed">
          {subtitle}
        </p>

        {/* Dual CTAs */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaUrl}
            className={`w-full sm:w-auto px-8 py-4 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-2 ${
              isTyn
                ? 'bg-[#C49A45] hover:bg-[#E0C078] text-[#0A1F26]'
                : 'bg-[#CCFF00] hover:bg-[#B8E600] text-black shadow-pro-glow font-mono'
            }`}
          >
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCtaUrl}
            className={`w-full sm:w-auto px-8 py-4 border text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center justify-center ${
              isTyn
                ? 'border-[#F7F5F0]/60 hover:bg-[#F7F5F0] hover:text-[#0D4352] text-[#F7F5F0]'
                : 'border-[#25272A] hover:border-[#CCFF00] hover:text-[#CCFF00] text-white font-mono'
            }`}
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>

      {/* Video Controls (if video active) */}
      {videoUrl && !videoFailed && (
        <div className="absolute top-6 right-6 z-20 flex items-center space-x-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Bottom Coordinates & Badges */}
      <div
        className={`absolute bottom-6 inset-x-0 max-w-7xl mx-auto px-6 flex items-center justify-between text-[10px] tracking-widest text-zinc-400 uppercase ${
          isTyn ? 'font-serif' : 'font-mono'
        }`}
      >
        <span>{isTyn ? 'ALMATY ATELIER (43.2220° N, 76.8512° E)' : 'ALMATY SPORTS LAB'}</span>
        <span className={isTyn ? 'hidden sm:inline text-[#C49A45]' : 'hidden sm:inline text-[#CCFF00]'}>
          {isTyn ? 'AUTHENTIC KAZAKH ORNAMENTATION' : 'MILITARY-GRADE AERO TEXTILE'}
        </span>
        <span>{isTyn ? 'ASTANA SHOWROOM (51.1694° N, 71.4491° E)' : 'PERFORMANCE GRADE-A'}</span>
      </div>
    </section>
  );
};
