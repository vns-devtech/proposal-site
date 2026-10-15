import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, [role="button"], .clickable');
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationId: number;
    // Smooth follower lerp
    const followLoop = () => {
      setFollowerPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationId = requestAnimationFrame(followLoop);
    };
    animationId = requestAnimationFrame(followLoop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [pos.x, pos.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-[#FF6F91] transition-transform duration-75"
        style={{
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(255, 111, 145, 0.8)',
        }}
      />
      {/* Trailing romantic ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border border-[#FF6F91]/60 transition-all duration-150 ease-out flex items-center justify-center"
        style={{
          width: isHovered ? '42px' : '28px',
          height: isHovered ? '42px' : '28px',
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(255, 198, 212, 0.28)' : 'rgba(255, 198, 212, 0.12)',
        }}
      >
        {isHovered && (
          <span className="text-[10px] select-none text-[#6D2446]">💗</span>
        )}
      </div>
    </>
  );
};
