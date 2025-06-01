// toolbar.js

import { DraggableNode } from './draggableNode';

const styles = {
  toolbarContainer: {
    padding: '20px',
    backgroundColor: '#000814',
    border: '2px solid #00f0ff',
    borderRadius: '10px',
    fontFamily: "'Courier New', Courier, monospace",
  },
  nodeList: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
};

export const PipelineToolbar = () => {
  return (
    <div style={styles.toolbarContainer}>
      <div style={styles.nodeList}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='customLoginType' label='LoginType' />
        <DraggableNode type='userInfo' label='UserInfo' />
        <DraggableNode type='addressInfo' label='AddressInfo' />
        <DraggableNode type='gender' label='Gender' />
        <DraggableNode type='preferences' label='Preferences' />
      </div>
    </div>
  );
};
