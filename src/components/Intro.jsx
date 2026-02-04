import { useEffect, useState } from 'react';
import './Intro.css';

function Intro({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 0.3초 ~ 1.2초 랜덤 시간
    const duration = Math.random() * 900 + 300;

    const timer = setTimeout(() => {
      setFadeOut(true);
      // 페이드아웃 애니메이션 후 완료
      setTimeout(onComplete, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      id="intro-screen"
      className={`intro ${fadeOut ? 'fade-out' : ''}`}
      role="presentation"
      aria-label="앱 로딩 화면"
    >
      <div className="intro-content">
        <div id="intro-logo" className="intro-logo">
          <span id="intro-check" className="intro-check" aria-hidden="true">✓</span>
        </div>
        <h1 id="intro-title" className="intro-title">TODO</h1>
      </div>
    </div>
  );
}

export default Intro;
