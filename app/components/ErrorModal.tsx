'use client';

import React, { ReactElement, useEffect, useState } from 'react';

interface ErrorModalProps {
  message: ReactElement | string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    },[ message ]);

    return (
        <div className={`sticky shadow-lg top-0 mx-auto w-4/5 z-50 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-red-500 text-white p-4 rounded shadow-lg text-center">
                {message}
            </div>
        </div>
    );
};

export default ErrorModal;
