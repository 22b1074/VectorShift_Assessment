export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const baseStyle = {
    cursor: 'grab',
    minWidth: '80px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: '#000814',      // Dark navy/black background
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: "'Courier New', Courier, monospace",
    color: '#00f0ff',                // Neon blue text
    border: '2px solid #00f0ff',    // Neon blue border
    boxShadow: '0 0 8px #00f0ff',   // Neon glow
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
    userSelect: 'none',
  };

  // Add hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = '0 0 15px 3px #00ffff';
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = baseStyle.boxShadow;
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
