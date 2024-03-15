import { FormEvent, useEffect, useState } from 'react';
import { useFolderMetadata } from '@/store';
import { FolderGridItem } from '../ItemGrid';
import { PropertyValidation } from '@/components/PropertyFields';
import { Button } from '@/ui/Button';
import { W3CAnnotationBody } from '@annotorious/react';
import { FolderMetadataForm, hasChanges } from '@/components/MetadataForm';

interface FolderMetadataPanelProps {

  folder: FolderGridItem;

}

export const FolderMetadataPanel = (props: FolderMetadataPanelProps) => {

  const { metadata, updateMetadata } = useFolderMetadata(props.folder?.id);

  const [formState, setFormState] = useState<W3CAnnotationBody | undefined>();

  useEffect(() => {
    setFormState(metadata);    
  }, [metadata]);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    updateMetadata(formState);
  }

  return (
    <PropertyValidation>
      <form 
        className="flex flex-col justify-between h-full"
        onSubmit={onSubmit}>
        <div className="flex flex-col flex-grow">
          <h2 className="leading-relaxed mr-5 mb-8 font-medium">
            {props.folder.name}
          </h2>
          
          <FolderMetadataForm
            metadata={formState}
            onChange={setFormState} />
        </div>

        <div className="pt-2 pb-4">        
          <Button 
            disabled={!hasChanges(metadata, formState)} 
            className="w-full mb-2"
            type="submit">
            Save
          </Button>
        </div>
      </form>
    </PropertyValidation>
  )

}