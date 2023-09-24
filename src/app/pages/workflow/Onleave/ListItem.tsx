import { Draggable } from "react-beautiful-dnd";
import { Badge, Chip } from "@material-tailwind/react";

const ListItem = ({
    item,
    index,
    titleCard,
}) => {

  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {titleCard === 'approval' ? (
              <Badge content={index + 1} withBorder>
                <Chip
                    value={item.content}
                    color={item.bgColor}
                    variant="outlined"
                />
              </Badge>
            ) : (
              <Chip
              value={item.content}
              color={item.bgColor}
              variant="outlined"
          />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
