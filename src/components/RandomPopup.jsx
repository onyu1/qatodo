import { useEffect, useState } from 'react';
import './RandomPopup.css';

const POPUP_MESSAGES = [
  {
    type: 'ad',
    title: '특별 할인!',
    message: '프리미엄 플랜 50% 할인 중! 지금 바로 업그레이드하세요.',
    buttonText: '닫기',
  },
  {
    type: 'notice',
    title: '공지사항',
    message: '시스템 점검 안내: 매주 일요일 새벽 2시~4시',
    buttonText: '확인',
  },
  {
    type: 'survey',
    title: '설문조사',
    message: '서비스 개선을 위해 간단한 설문에 참여해주세요!',
    buttonText: '다음에',
  },
  {
    type: 'tip',
    title: '꿀팁!',
    message: '할 일을 완료하면 통계에서 진행률을 확인할 수 있어요.',
    buttonText: '알겠어요',
  },
  {
    type: 'update',
    title: '업데이트 알림',
    message: '새로운 기능이 추가되었습니다. 확인해보세요!',
    buttonText: '닫기',
  },
];

function RandomPopup({ triggerCount }) {
  const [isVisible, setIsVisible] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    // 50% 확률로 팝업 표시
    if (triggerCount > 0 && Math.random() < 0.5) {
      const randomPopup = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
      setPopup(randomPopup);
      setIsVisible(true);
    }
  }, [triggerCount]);

  const handleClose = () => {
    setIsVisible(false);
    setPopup(null);
  };

  if (!isVisible || !popup) return null;

  return (
    <div
      id="random-popup-overlay"
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-message"
    >
      <div
        id="random-popup"
        className={`popup-content popup-${popup.type}`}
        data-popup-type={popup.type}
      >
        <button
          id="popup-close-x-btn"
          className="popup-close-x"
          onClick={handleClose}
          aria-label="팝업 닫기"
        >
          ×
        </button>
        <div className="popup-icon" aria-hidden="true">
          {popup.type === 'ad' && '🎁'}
          {popup.type === 'notice' && '📢'}
          {popup.type === 'survey' && '📋'}
          {popup.type === 'tip' && '💡'}
          {popup.type === 'update' && '🆕'}
        </div>
        <h2 id="popup-title" className="popup-title">{popup.title}</h2>
        <p id="popup-message" className="popup-message">{popup.message}</p>
        <button
          id="popup-close-btn"
          className="popup-btn"
          onClick={handleClose}
        >
          {popup.buttonText}
        </button>
      </div>
    </div>
  );
}

export default RandomPopup;
