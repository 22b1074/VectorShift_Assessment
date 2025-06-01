import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';

export const GenderNode = ({ id, data }) => {
  const { gender } = data;
  
  return (
    <BaseNode
      id = {id}
      title="Gender"
      elements={[
        {type: 'select',label: 'Gender',value: gender ?? 'Male',field: 'gender',options: ['Male', 'Female', 'Other'],
        },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    />
  );
};

