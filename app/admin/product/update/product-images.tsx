"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mantine/core';
import Image from 'next/image';

const UpdateProductImages = ({ defaultImage }: { defaultImage?: string }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(defaultImage ? [defaultImage] : []);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      if (previewUrls.length > 0) {
        const confirmed = window.confirm('Yeni bir resim yüklemek mevcut resmi silecektir. Devam etmek istiyor musunuz?');
        if (!confirmed) {
          event.target.value = '';
          return;
        }
        setPreviewUrls([]);
      }
      
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrls([fileUrl]);
      setError(null);
    } else {
      setError("Bir dosya seçmelisiniz.");
    }
  };

  return (
    <Box>
      <div>
        <h1>Dosya Yükle</h1>
        <input 
          type="file" 
          name="image1" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Önizleme</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Önizleme ${index + 1}`} 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default UpdateProductImages;
