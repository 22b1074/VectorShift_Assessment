import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';


export const UserInfoNode = ({ id, data }) => {
  const { username, email, phone, age } = data;
  return (
    <BaseNode
      id = {id}
      title="User Info"
      elements={[
        { type: 'text', label: 'UserName', value: username || '', field: 'username' },
        { type: 'text', label: 'Email', value: email || '', field: 'email'},
        { type: 'text', label: 'Phone', value: phone || '', field: 'phone'},
        { type: 'text', label: 'Age', value: age || '', field: 'age' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};
