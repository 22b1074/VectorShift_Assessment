import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const { name, type, } = data;

  return (
    <BaseNode
      id = {id}
      title="Output"
      elements={[
        { type: 'text', label: 'Name', value: name, field: 'name', autoResize: false },
        { type: 'select', label: 'Type', value: type, field: 'type', options: ['Text', 'Image'] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
      />
    );
};


