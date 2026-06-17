/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

/**
 * 전역 토스트 알림 및 로딩 스피너 프로바이더
 */
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // 3초 후 자동 사라짐
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, setIsLoading }}>
            {children}
            
            {/* 토스트 알림 UI */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    color: '#fff',
                    backgroundColor: toast.type === 'error' ? '#f44336' : '#4caf50',
                    zIndex: 9999,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                    {toast.message}
                </div>
            )}

            {/* 로딩 스피너 UI */}
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 9998,
                    color: '#fff',
                    fontSize: '1.2rem'
                }}>
                    데이터를 불러오는 중...
                </div>
            )}
        </ToastContext.Provider>
    );
};
