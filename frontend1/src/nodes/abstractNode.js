import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';
import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
const styles = {
  input: {
    flex: 1,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    border: '1px solid #00f0ff',
    borderRadius: 3,
    color: '#000000',
    padding: '6px 8px',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 14,
    outline: 'none',
  },
  textarea: {
    flex: 1,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    border: '1px solid #00f0ff',
    borderRadius: 3,
    color: '#000000',
    padding: '6px 8px',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 14,
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    minHeight: 40,
  },
  select: {
    flex: 1,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    border: '1px solid #00f0ff',
    borderRadius: 3,
    color: '#000000',
    padding: '6px 8px',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 14,
    outline: 'none',
    cursor: 'pointer',
  },
  labelRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  container: {
    position: 'relative',
    width: 220,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#000814',
    border: '2px solid #00f0ff',
    fontFamily: "'Courier New', Courier, monospace",
    color: '#00ccff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    borderBottom: '1px solid #00ccff',
    paddingBottom: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#00ccff',
    border: 'none',
    borderRadius: 3,
    color: 'white',
    cursor: 'pointer',
    padding: '2px 6px',
    fontSize: 12,
    fontWeight: 'bold',
  },
};

const MAX_TEXTAREA_HEIGHT = 300; // max height in px

export const LabeledTextInput = ({ label, value,onChange, autoResize = false }) => {
  const textareaRef = React.useRef(null);
  
  React.useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset height
      const newHeight = Math.min(textareaRef.current.scrollHeight, MAX_TEXTAREA_HEIGHT);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <label style={styles.labelRow}>
      <span>{label}:</span>
      {autoResize ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          style={{
            ...styles.textarea,
            maxHeight: MAX_TEXTAREA_HEIGHT,
            overflowY: 'auto',
          }}
          rows={1}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          style={styles.input}
        />
      )}
    </label>
  );
};


export const LabeledSelectInput = ({ label, value, onChange, options }) => {
  return (
    <label style={styles.labelRow}>
      <span>{label}:</span>
      <select value={value} onChange={onChange} style={styles.select}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
};

export const CustomHandle = ({ type, position, id, style }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{ background: '#00ffff', ...style }}
    isConnectable={true}
  />
);


export function useUpdateHandles(id, handles) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const prevHandlesRef = useRef();

  useEffect(() => {
    if (
      id &&
      handles.length &&
      !isEqual(prevHandlesRef.current, handles)
    ) {
      updateNodeField(id, 'handles', handles);
      prevHandlesRef.current = handles;
    }
  }, [id, handles, updateNodeField]);
}

export const BaseNode = ({ id, title, elements = [], handles = []}) => {
  const onDeleteNode = useStore((state) => state.onDeleteNode);
  const updateNodeField = useStore((state) => state.updateNodeField);
  

  const handleChange = (field) => (e) => {
    updateNodeField(id, field, e.target.value);
  };

  useUpdateHandles(id, handles);

  return (
    <div style={styles.container}>
      {/* Delete button */}
      <button
        style={styles.deleteButton}
        onClick={() => onDeleteNode(id)}
        title="Delete node"
      >
        DEL
      </button>
      <div style={styles.title}>{title}</div>

      {elements.map((el, idx) => {
        if (el.type === 'text') {
          return (
            <LabeledTextInput
              key={idx}
              label={el.label}
              value={el.value}
              onChange={handleChange(el.field)}
              autoResize={el.autoResize}  
            />
          );
        }
        if (el.type === 'select') {
          return (
            <LabeledSelectInput
              key={idx}
              label={el.label}
              value={el.value}
              onChange={handleChange(el.field)}
              options={el.options}
            />
          );
        }
        return null;
      })}

      {handles.map((handle, idx) => (
        <CustomHandle key={idx} {...handle} />
      ))}
    </div>
  );
};
