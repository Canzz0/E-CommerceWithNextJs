export async function addProductImage({id,token,formData}:any) {

        try {
          const imgData = new FormData();
          
          // Tüm resimleri kontrol et ve yükle
          for (let i = 1; i <= 4; i++) {
            const image = formData.get(`image${i}`);
            if (image) {
              imgData.append('image', image);
              imgData.append('id', id);
              
              const response2 = await fetch('http://localhost:3000/api/product/File', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: imgData,
              });
  
              if (!response2.ok) {
                throw new Error('Fotoğraf Yüklenemedi');
              }
            }
          }
        } catch (error) {
          return {
            message: 'Fotoğraf Yüklenemedi',
          };
        }
        
     
}