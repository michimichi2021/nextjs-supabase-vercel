import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageProps {
  width: number;
  height: number;
  alt: string;
}

export interface CardProps {
  image: ImageProps;
  title: string;
  text: string;
  button: {
    text: string;
    url: string;
  };
}

export default function Card({ image, title, text, button }) {
  return (
    <div className='w-[300px] text-center rounded-lg shadow-lg '>
      <Image
        src={'aaa'}
        height={100}
        width={100}
        alt={'aaa'}
        className=' rounded-t-lg'
      />
      <h2 className='my-2 text-xl font-bold'>{title}</h2>
      <p className='px-4 text-sm text-left'>{text}</p>
      <button className='py-1.5 px-4 my-4 text-sm  bg-yellow-500 rounded-full shadow-md'>
        {'Read More'}
      </button>
    </div>
  );
};
