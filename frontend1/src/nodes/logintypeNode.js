import { BaseNode} from './abstractNode';
import { Position } from 'reactflow';

export const LogintypeNode = ({ id, data }) => {
  const { logintype } = data;
  return (
    <BaseNode
      id = {id}
      title="Login Type"
      elements={[
        { type: 'select', label: 'LoginType', value: logintype ?? 'UserName', field: 'logintype', options: ['UserName', 'Email', 'Phone'],},
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    />
  );
};
