import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';


export const PreferencesNode = ({ id, data }) => {
  const { theme, notifications } = data;
  return (
    <BaseNode
      id = {id}
      title="Preferences"
      elements={[
        { type: 'select', label: 'Theme', value: theme || 'Light', filed: 'theme', options: ['Light', 'Dark'] },
        { type: 'select', label: 'Notifications', value: notifications || 'Enabled', filed: 'notifications', options: ['Enabled', 'Disabled'] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};



