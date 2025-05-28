import { W3CAnnotationBody } from '@annotorious/react';
import { useDataModel } from '@/store';
import { MetadataForm } from './MetadataForm';
import { AnnotationMetaField } from '@/components/PropertyFields/hhAnnotationMetaField';


interface ImageMetadataFormProps {

  metadata: W3CAnnotationBody;

  onChange(metadata: W3CAnnotationBody): void;

}

export const ImageMetadataForm = (props: ImageMetadataFormProps) => {

  const { metadata } = props;

  const model = useDataModel();


  // 👇 ② 입력값이 변경될 때 properties에 반영하는 함수 정의
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
      {/* 👇 ③ 내 입력창 먼저 렌더링 */}
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
