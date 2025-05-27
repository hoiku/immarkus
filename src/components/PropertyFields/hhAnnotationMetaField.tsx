import { FC } from 'react';
import { TextField } from './TextField'; // 같은 폴더 내 텍스트 입력 컴포넌트

interface Props {
  metadata: any;
  setMetadata: (value: any) => void;
}

export const AnnotationMetaField: FC<Props> = ({ metadata, setMetadata }) => {
  return (
    <div className="space-y-4">
      <TextField
        label="주석 클래스"
        value={metadata.annotationClass || ''}
        onChange={(val) => setMetadata({ ...metadata, annotationClass: val })}
      />

      <TextField
        label="인스턴스 이름"
        value={metadata.annotationInstance || ''}
        onChange={(val) => setMetadata({ ...metadata, annotationInstance: val })}
      />

      <TextField
        label="작성자"
        value={metadata.author || ''}
        onChange={(val) => setMetadata({ ...metadata, author: val })}
      />

      <TextField
        label="작성일자"
        type="date"
        value={metadata.date || ''}
        onChange={(val) => setMetadata({ ...metadata, date: val })}
      />
    </div>
  );
};

