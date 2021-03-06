import './App.css';
import React, { useState } from 'react';
import * as loadListData from './data/loadList.json'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const LoadlistContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const LoadListBox = styled.div`
  padding: 8px;
`;

const LoadList = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;


function App() {
  const [loadList , setLoadList] = useState(loadListData.default);
  
  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(loadList);
    const [reorderedItem] = items.splice(result.source.index , 1);
    items.splice(result.destination.index , 0 , reorderedItem);
    setLoadList(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <LoadlistContainer>
        <Title>Load List</Title>
        <Droppable droppableId="loadList">
        {(provided) => (
          <LoadListBox {...provided.droppableProps} ref={provided.innerRef}>
            {loadList.map((load , index) => {
              return (
                <Draggable draggableId={index.toString()} index={index}>
                {(provided) => (
                  <LoadList key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    
                    {`${load.Stop_Name}`}
                  </LoadList>
                )} 
              </Draggable>
              )
              
            })}
            {provided.placeholder}
          </LoadListBox>
        )

        }


        </Droppable>
      </LoadlistContainer>
    </DragDropContext>
  );
}

export default App;
