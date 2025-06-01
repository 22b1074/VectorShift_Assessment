import { BaseNode } from './abstractNode';
import { Position } from 'reactflow';

export const AddressNode = ({ id, data }) => {
  const { street, city, zip, country } = data;

  return (
    <BaseNode
      id = {id}
      title="Address Info"
      elements={[
        { type: 'text', label: 'Street', value: street || '', filed: 'street', },
        { type: 'text', label: 'City', value: city || '', filed: 'city',},
        { type: 'text', label: 'ZIP Code', value: zip || '', field: 'zip',},
        { type: 'text', label: 'Country', value: country || '', filed: 'country', },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};
