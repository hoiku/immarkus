import { W3CAnnotationBody } from '@annotorious/react';
import { useDataModel } from '@/store';
import { MetadataForm } from './MetadataForm';
import { AnnotationMetaField } from '@/components/PropertyFields/hhAnnotationMetaField'; //hhcd


interface ImageMetadataFormProps {

  metadata: W3CAnnotationBody;

  onChange(metadata: W3CAnnotationBody): void;

}

export const ImageMetadataForm = (props: ImageMetadataFormProps) => {

  const { metadata } = props;

  const model = useDataModel();


  // hh코드시작
  const handleCustomChange = (value: any) => {
    onChange({ 
      ...metadata, 
      properties: { 
        ...metadata.properties, 
        ...value 
      } 
    });
  };
  // 코드 끝

  
  return (


    // 삽입코드

    <>
      {/* hhcd */}
      <AnnotationMetaField 
        metadata={metadata.properties || {}} 
        setMetadata={handleCustomChange} 
      />



    
    <MetadataForm 
      metadata={metadata}
      schemas={model.imageSchemas} 
      onChange={props.onChange} />

      </>
  )

}
