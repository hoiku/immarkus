import { ListTree } from 'lucide-react';
import { EntityType } from '@/model';
import { useDataModel } from '@/store';
import { DEFAULT_COLOR, getForegroundColor } from '@/utils/color';

interface EntityTypeBrowserSuggestionProps {

  type: EntityType;

  highlighted: boolean;

}

export const EntityTypeBrowserSuggestion = (props: EntityTypeBrowserSuggestionProps) => {

  const { type, highlighted } = props;

  const model = useDataModel();

  const parent = type.parentId ? model.getEntityType(type.parentId) : undefined;   

  const children = model.getChildTypes(type.id);

  const color = type.color || DEFAULT_COLOR;

  return (
    <div
      className="etb-suggestion pr-2 py-1 rounded-sm data-[highlighted]:bg-accent cursor-pointer" 
      data-highlighted={highlighted ? 'true' : undefined}>
      
      <div className="flex justify-between text-muted-foreground">
        <div className="flex items-center">
          <span 
            className="pip-small ml-1.5"
            style= {{
              backgroundColor: color,
              color: getForegroundColor(color)
            }} />

          <span 
            className="inline-flex items-end pl-1.5 pr-1 py-0.5 rounded-sm text-black">
            {type.label || type.id}
          </span>

          {parent && (
            <span>
              ({parent.label || parent.id})
            </span>
          )}
        </div>

        <div>
          {children.length > 0 && (
            <div className="flex text-xs items-center mt-[0.5px]">
              <ListTree className="w-3.5 h-3.5" />

              <span className="ml-0.5 mt-[0.5px] mr-1">
                {children.length} child{children.length > 1 && 'ren'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}