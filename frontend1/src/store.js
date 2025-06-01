// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
      node.data = {
                ...node.data, // Keep existing data if any
            };
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      console.log('onEdgesChange triggered:', changes);
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const { source, target } = connection;
      const nodes = get().nodes;

      const sourceExists = nodes.find((n) => n.id === source);
      const targetExists = nodes.find((n) => n.id === target);

      if (!sourceExists || !targetExists) {
        console.warn('Skipping onConnect: missing node(s)', connection);
        return;
      }

      console.log('onConnect triggered:', connection);

      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, style: { stroke: '#00ffff', strokeWidth: 2 },markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    onDeleteNode: (nodeId) => {
      set({
        edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        nodes: get().nodes.filter((node) => node.id !== nodeId),
      });

      console.log("After delete → Nodes:", get().nodes);
      console.log("After delete → Edges:", get().edges);  
    },

}));
