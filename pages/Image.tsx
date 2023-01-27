import { useState, useEffect, useCallback} from 'react';
import { getStorageFileURL } from './storage';

type Props = {
	className?: string | undefined;
	src?: string;
	bucketName: string;
	alt?: string;
};

export const Image: React.VFC<Props> = ({ className, bucketName, src, alt }) => {
  const [url, setUrl] = useState<string>();

  const handleRenderImage = useCallback(async () => {
    if (!src) return;
    const url = await getStorageFileURL({
      bucketName,
      pathName: src,
    });
    if (!url) return;
    setUrl(url);
  }, [bucketName, src]);

  useEffect(() => {
    handleRenderImage();
  }, [handleRenderImage]);

  return <img className={className} src={url} alt={alt} />;
};