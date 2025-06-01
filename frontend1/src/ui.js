import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { LogintypeNode } from './nodes/logintypeNode';
import { UserInfoNode } from './nodes/userinfoNode';
import { AddressNode } from './nodes/addressinfoNode';
import { GenderNode } from './nodes/genderNode';
import { PreferencesNode } from './nodes/preferencesNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  customLoginType: LogintypeNode,
  userInfo: UserInfoNode,
  addressInfo: AddressNode,
  gender: GenderNode,
  preferences: PreferencesNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <style>{`
        /* Controls container */
        .reactflow__controls {
          background-color: #000814 !important;
          border: 1px solid #00f0ff !important;
          border-radius: 8px;
          box-shadow: 0 0 12px #00f0ff;
          padding: 4px;
        }

        /* Controls buttons */
        .reactflow__controls button {
          background-color: transparent !important;
          border: 1px solid #00f0ff !important;
          color: #00f0ff !important;
          filter: drop-shadow(0 0 4px #00f0ff);
          margin: 2px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Hover effect */
        .reactflow__controls button:hover {
          background-color: rgba(0, 240, 255, 0.2) !important;
          box-shadow: 0 0 12px #00f0ff;
          color: #00f0ff !important;
          border-color: #00f0ff !important;
        }

        /* Focus effect for accessibility */
        .reactflow__controls button:focus {
          outline: none;
          box-shadow: 0 0 16px #00f0ff;
        }

        /* SVG icons inside buttons get neon blue */
        .reactflow__controls button svg {
          stroke: #00f0ff;
          fill: #00f0ff;
          filter: drop-shadow(0 0 4px #00f0ff);
        }
      `}</style>

      <div
        ref={reactFlowWrapper}
        style={{ width: '100%', height: '65vh', backgroundColor: '#000814' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          style={{ backgroundColor: '#000814' }}
          connectionLineStyle={{ stroke: '#00f0ff', strokeWidth: 2 }}
        >
          <Background
            color="#001a2e"
            gap={gridSize}
            style={{ filter: 'brightness(0.7)' }}
          />
          <Controls />
          <MiniMap
            nodeStrokeColor="#00f0ff"
            nodeColor="#001a2e"
            nodeBorderRadius={5}
            maskColor="rgba(0, 0, 0, 0.6)"
            style={{
              backgroundColor: '#000814',
              border: '1px solid #00f0ff',
              boxShadow: '0 0 8px #00f0ff',
              borderRadius: '8px',
            }}
          />
        </ReactFlow>
      </div>
    </>
  );
};
