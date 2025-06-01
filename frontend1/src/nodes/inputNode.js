import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const { name, type } = data;

  return (
    <BaseNode
      id={id}
      title="Input"
      elements={[
        {type: 'text',label: 'Name',value: name || '',field: 'name',},
        {type: 'select',label: 'Type',value: type || 'Text',field: 'type',options: ['Text', 'File'],},
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    />
  );
};
