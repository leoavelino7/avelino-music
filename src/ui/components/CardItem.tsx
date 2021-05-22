import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface Image {
  url: string
  title?: string
  alt?: string
}

export interface Item {
  id: string
  mainText: string
  secondaryText: string
  image: Image
  LeftIcon?: React.FC
  leftIconColorWhenActive?: string
  RightIcon?: React.FC
  rightIconColorWhenActive?: string
  active?: boolean
}

export interface Actions {
  onHandleClickLeftIcon?(card: Item): void
  onHandleClickRightIcon?(card: Item): void
  onHandleClick(card: Item): void
}

export interface CardItemProps {
  card: Item
  actions: Actions
  index?: number
  isDragDisabled: boolean
}

const CardItem: React.FC<CardItemProps> = ({ card, actions, index = 0, isDragDisabled }) => {
  const handleClickLeftIcon = (): void => {
    if (actions?.onHandleClickLeftIcon) actions?.onHandleClickLeftIcon(card)
  }

  const handleClickRightIcon = (): void => {
    if (actions?.onHandleClickRightIcon) actions?.onHandleClickRightIcon(card)
  }

  const handleClick = (): void => {
    actions?.onHandleClick(card)
  }

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
          grid grid-cols-4 border-b-2 py-3 border-opacity-25 dark:border-opacity-5 md:border-opacity-10 
          border-gray-900 dark:border-gray-400 hover:bg-black hover:dark:bg-gray-100 hover:bg-opacity-20 hover:dark:bg-opacity-5
          `}
        >
          <div className="col-span-3 flex flex-row items-center cursor-pointer">
            {card.LeftIcon && actions?.onHandleClickLeftIcon && (
              <button
                type="button"
                onClick={handleClickLeftIcon}
                className={`
                mr-1 opacity-70 dark:opacity-30 text-2xl focus:outline-none hover:opacity-100
                 transition duration-300 ease-out ${
                   card?.active && card?.leftIconColorWhenActive ? card?.leftIconColorWhenActive : 'text-black dark:text-gray-200'
                 }`}
              >
                <card.LeftIcon />
              </button>
            )}
            <div className="flex flex-row" onClick={handleClick} role="button" aria-hidden="true">
              <img src={card.image.url} title={card.image.title} alt={card.image.alt} className="md:m-4 md:rounded-md w-16 h-16" />
              <div className="flex flex-col justify-center m-3 md:m-0 text-black dark:text-white">
                <span className="text-md md:text-base font-medium">
                  {card.mainText.length > 20 ? card.mainText.slice(0, 20).concat('...') : card.mainText}
                </span>
                <span className="text-xs md:text-sm mt-1">{card.secondaryText}</span>
              </div>
            </div>
          </div>
          {card.RightIcon && actions?.onHandleClickRightIcon && (
            <div className="col-span-1 flex flex-col justify-center items-center md:items-end md:mr-3">
              <button
                type="button"
                onClick={handleClickRightIcon}
                className={`text-2xl focus:outline-none hover:text-green-600 transition duration-300 ease-out ${
                  card?.active && card?.rightIconColorWhenActive ? card?.rightIconColorWhenActive : 'text-gray-500 dark:text-white'
                }`}
              >
                <card.RightIcon />
              </button>
            </div>
          )}
        </li>
      )}
    </Draggable>
  )
}

export default CardItem
