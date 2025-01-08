import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, NotebookPen } from 'lucide-react';
import { Folder, IIIFManifestResource, RootFolder } from '@/model';
import { isPresentationManifest, isRootFolder } from '../Types';
import { useStore } from '@/store';
import { Button } from '@/ui/Button';
import { IIIFImporter } from '../IIIFImporter';

interface PageHeaderProps {

  folder: Folder | RootFolder | IIIFManifestResource;

  onShowMetadata(): void;

}

export const PageHeader = (props: PageHeaderProps) => {

  const { folder } = props;

  const store = useStore();

  const images = useMemo(() => {
    if (isPresentationManifest(folder)) {
      return folder.pages;
    } else {
      return store.getFolderContents(folder.handle)?.images.length || 0;
    }
  }, [folder, store]);

  return (
    <div className="space-y-1 flex-grow">
      <h1 className="text-sm text-muted-foreground tracking-tight">
        {isRootFolder(folder) ? (
          <span>Folder</span>
        ) : (
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <ol className="flex items-center gap-0.5">
              <li>
                <Link className="hover:underline" to={`/images`}>{store.getRootFolder().name}</Link>
              </li>

              <ChevronRight className="h-4 w-4" />

              {folder.path.map((id, idx) => (
                <Fragment key={`${idx}-${id}`}>
                  <li key={`${idx}-${id}`}> 
                    <Link className="hover:underline" to={`/images/${id}`}>{store.getFolder(id).name}</Link>
                  </li>

                  <ChevronRight className="h-4 w-4" />
                </Fragment>
              ))}
            </ol>
          </nav>
        )}
      </h1>

      <h2 className="text-3xl font-semibold tracking-tight">
        {folder.name}
      </h2>

      <p className="text-sm text-muted-foreground flex gap-2.5 pt-0.5">
        <span>{images} images</span>
        <span>·</span> 
        <Button 
          variant="link"
          className="text-muted-foreground flex items-center gap-1.5 p-0 h-auto font-normal"
          onClick={props.onShowMetadata}>
          <NotebookPen className="size-4" /> Metadata
        </Button>

        {!isPresentationManifest(folder) && (
          <>
            <span>·</span> 

            <IIIFImporter 
              folderId={'id' in folder ? folder.id : undefined}
              onImport={resource => console.log('imported', resource)} />
          </>
        )}
      </p>
    </div>
  )

}