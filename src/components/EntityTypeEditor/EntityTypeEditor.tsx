import { ReactNode, useEffect, useState } from 'react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { EntityType } from '@/model';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/Dialog';
import { Editor } from './Editor';
import { useToast } from '@/ui/Toaster';

interface EntityTypeDialogProps {

  children?: ReactNode;

  entityType?: EntityType;

  open?: boolean;

  onOpenChange?(open: boolean): void;

}

export const EntityTypeEditor = (props: EntityTypeDialogProps) => {

  const { toast } = useToast();

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const onOpenChange = (open: boolean) => {
    setOpen(open);

    if (props.onOpenChange)
      props.onOpenChange(open);
  }

  const onSaveError = (error: Error) => {
    console.error(error);
    
    toast({
      variant: 'destructive',
      // @ts-ignore
      title: <ToastTitle className="flex"><XCircle size={18} className="mr-2" /> Error</ToastTitle>,
      description: 'Something went wrong. Could not save entity type.'
    });   
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}>

      {props.children && (
        <DialogTrigger asChild>
          {props.children}
        </DialogTrigger>
      )}

      <DialogContent className="p-0 max-w-4xl my-8 rounded-lg">
        <DialogTitle className="hidden">
          Entity Class Editor
        </DialogTitle>
        
        <DialogDescription className="hidden">
          Edit your entity class definition.
        </DialogDescription>

        <Editor 
          entityType={props.entityType}
          onSaved={() => onOpenChange(false)} 
          onSaveError={onSaveError} />
      </DialogContent>
    </Dialog>
  )

}