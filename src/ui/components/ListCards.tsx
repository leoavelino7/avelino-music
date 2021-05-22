import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'

import CardItem, { Item, Actions } from './CardItem'

export interface ListsCardsProps {
  listId: string
  cards: Item[]
  actions: Actions
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void
  isDragDisabled: boolean
}

const ListCards: React.FC<ListsCardsProps> = ({ cards, actions, onDragEnd = () => null, listId, isDragDisabled }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={listId}>
      {provided => (
        <ul className="max-h-96 max-h-result-list overflow-auto" {...provided.droppableProps} ref={provided.innerRef}>
          {cards.map((card, index) => (
            <CardItem key={card.id} card={card} index={index} actions={actions} isDragDisabled={isDragDisabled} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </DragDropContext>
)

export default ListCards
