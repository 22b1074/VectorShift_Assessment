import React, { useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from './../store';
import { BaseNode } from './abstractNode';
import { useCallback } from 'react';

const extractVariables = (text) => {
  const regex = /\{\{(\w+)\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const {text} = data;

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onConnectEdge = useStore((state) => state.onConnect);
  const onEdgesChange = useStore((state) => state.onEdgesChange);

  const updateNodeInternals = useUpdateNodeInternals();

  const vars = extractVariables(text);

  const allAvailableVariableNames = nodes
    .filter((node) => node.id !== id && (node.data?.handles || []).filter((h) => h.type === 'source').length > 0)
    .map((node) => node.data?.name || 'N/A')
    .filter(Boolean);

  const filteredVars = vars.filter((v) => allAvailableVariableNames.includes(v));
  
  const handles =  [
    ...filteredVars.map((varName, idx) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-input-${varName}`,
      style: { top: 20 + idx * 30, background: '#00ffff' },
      title: `Input for: {{${varName}}}`,
    })),
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      style: { background: '#00ffff' },
      title: 'Output Text',
    },
  ];

  // Remove edges linked to a specific handle
  const removeEdgesByHandle = useCallback((handleId) => {
  const changes = edges
    .filter((edge) => edge.sourceHandle === handleId || edge.targetHandle === handleId)
    .map((edge) => ({ id: edge.id, type: 'remove' }));

  if (changes.length > 0) {
    onEdgesChange(changes);
  }
}, [edges, onEdgesChange]);


  

  // Trigger React Flow internal update when handles change
  useEffect(() => {
    updateNodeInternals(id);

    // --- Dynamic Edge Management ---
    filteredVars.forEach((varName) => {
      const sourceNode = nodes.find((n) => n.data?.name === varName);
      if (sourceNode) {
        const sourceHandles = sourceNode.data?.handles?.filter(h => h.type === 'source') || [];

        const sourceHandleId = sourceHandles.length > 0 ? sourceHandles[0].id : null;
        const targetHandleId = `${id}-input-${varName}`;

        if (!sourceHandleId) {
          console.warn(`No source handle found on node ${sourceNode.id} for var ${varName}`);
          return;  // skip if no valid handle
        }

        const edgeExists = edges.some(
          (edge) =>
            edge.source === sourceNode.id &&
            edge.target === id &&
            edge.sourceHandle === sourceHandleId &&
            edge.targetHandle === targetHandleId
        );

        if (!edgeExists) {
          onConnectEdge({
            source: sourceNode.id,
            sourceHandle: sourceHandleId,
            target: id,
            targetHandle: targetHandleId,
          });
        }
  };
});


    // Remove edges if handles are no longer present
    const validTargetHandles = filteredVars.map((v) => `${id}-input-${v}`);
    edges.forEach((edge) => {
      if (
        edge.target === id &&
        edge.targetHandle?.startsWith(`${id}-input-`) &&
        !validTargetHandles.includes(edge.targetHandle)
      ) {
        removeEdgesByHandle(edge.targetHandle);
      }
    });

  }, [filteredVars, nodes, edges, id, updateNodeInternals, onConnectEdge, onEdgesChange, removeEdgesByHandle]);

  return <BaseNode
           id = {id} 
           title="Text" 
           elements={[
            {
              type: 'text',
              label: 'Text',
              value: text,
              field: 'text',
              autoResize: true,
            },
          ]} 
           handles={handles} />;
};
