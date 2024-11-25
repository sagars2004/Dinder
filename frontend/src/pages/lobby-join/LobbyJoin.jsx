import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './LobbyJoin.css';

function LobbyJoin() {
  const location = useLocation();
  const [participants, setParticipants] = useState([]);
  const roomCode = location.state?.roomCode;
  const userName = location.state?.userName;
  const [userId, setUserId] = useState(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    // Connect to WebSocket
    const socket = io('http://localhost:5000');

    // Join session room
    socket.emit('joinSession', { 
      roomCode, 
      userName,
      isHost: false 
    });

    // Listen for participants updates
    socket.on('participantsUpdate', (updatedParticipants) => {
      console.log('Received participants update:', updatedParticipants);
      const filteredParticipants = updatedParticipants.filter(p => p.name !== 'Host');
      setParticipants(filteredParticipants);
    });

    // Listen for userId assignment from server
    socket.on('userIdAssigned', ({ userId }) => {
      console.log('Received userId:', userId);
      localStorage.setItem('currentUserId', userId); // Store with different key
      setUserId(userId);
    });

    // Listen for session started event
    socket.on('sessionStarted', (data) => {
      console.log('Session started by host:', data);
      if (data.success) {
        // Redirect to restaurant swiper page
        window.location.href = `/sessions/${data.sessionId}/restaurants`;
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('sessionStarted');
      socket.off('userIdAssigned');
      socket.emit('leaveSession', { roomCode });
      socket.close();
    };
  }, [roomCode, userName]);

  const copyInviteLink = () => {
    const link = `${window.location.origin}/join?code=${roomCode}`;
    navigator.clipboard.writeText(link);
  };

  const copyGroupCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  return (
    <section className="lobby-section">
      <div className="join-instructions">
        <h1>Tell your friends to go to <span className="highlight">dindersdd.cs.rpi.edu/join</span></h1>
      </div>

      <div className="lobby-content">
        <div className="left-panel">
          <h2>ROOM CODE</h2>
          <div className="room-code-display">
            {roomCode}
          </div>
          
          <button 
            className="lobby-button" 
            onClick={copyInviteLink}
          >
            <span className="icon">📋</span>
            <h2>Invite link</h2>
          </button>
          <button 
            className="lobby-button" 
            onClick={copyGroupCode}
          >
            <span className="icon">📋</span>
            <h2>Copy group code</h2>
          </button>
        </div>

        <div className="members-panel">
          <h4>Members:</h4>
          <div className="participants-list">
            {participants && participants.length > 0 ? (
              participants.map((participant, index) => (
                <div key={index} className="participant-item">
                  {participant.name} {participant.isHost ? '(Host)' : ''}
                </div>
              ))
            ) : (
              <div className="participant-item">Waiting for participants...</div>
            )}
          </div>
        </div>
      </div>

      {waiting && (
        <div className="waiting-message">
          Waiting for host to start the session...
        </div>
      )}
    </section>
  );
}

export default LobbyJoin;