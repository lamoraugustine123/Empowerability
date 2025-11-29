'use client';
import { useState, useEffect, useRef } from 'react';

export function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    console.log('🔌 Connecting to WebSocket:', url);
    ws.current = new WebSocket(url);
    
    ws.current.onopen = () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);
    };
    
    ws.current.onclose = () => {
      console.log('❌ WebSocket disconnected');
      setIsConnected(false);
    };
    
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📨 WebSocket message:', data);
        setLastMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);
  
  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(message));
    }
  };
  
  return { isConnected, lastMessage, sendMessage };
}
