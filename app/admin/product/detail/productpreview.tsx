import { getProductID } from '@/app/product/actions/GET/getproductbyID';
import { Products } from '@/app/types/product/ListProduct';
import {
  Alert,
  Box,
  Container,
  Grid,
  Group,
  rem,
  Skeleton,
  Text,
  Title
} from '@mantine/core';
import { useEffect, useState } from 'react';
import UpdatedProduct from '../update/updated-product';
import { useProductStore } from '../store/product-store';
import DeleteProduct from '../delete/delete-product';

const ProductPreview = ({ close, id }: any) => {
  const { isSuccess } = useProductStore()

  const [product, setProduct] = useState<Products>();
  const PRIMARY_COL_HEIGHT = rem(450);

  useEffect(() => {
    dataFetch()
  }, [id])

  const dataFetch = async () => {
    try {
      const data = await getProductID({ id })
      setProduct(data)
    } catch (error: any) {
      <Alert mt={15} variant="filled" color="green" title="">
        {error}
      </Alert>
    }
  }


  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess])
  return (
    <>
      <Container mt="md" size="xl">
        <Grid w={'100%'}>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Box style={{ position: 'relative' }}>
              {product?.image1 ? (
                <img
                  src={`${product.image1}`}

                  style={{
                    width: '100%',
                    height: PRIMARY_COL_HEIGHT,
                    maxHeight: PRIMARY_COL_HEIGHT,
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={true} />
              )}
              {/*
              <Button className={classes.arrowbtnl} onClick={handlePrevImage}>
                <IconChevronLeft size={32} />
              </Button>
              <Button className={classes.arrowbtnr} onClick={handleNextImage}>
                <IconChevronRight size={32} />
              </Button>
              */}


            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Grid mt="md" gutter="md">
              <Grid.Col>
                <Box>
                  <Title order={4}>{product?.name}</Title>
                </Box>
              </Grid.Col>
              <Grid.Col mt="xl" span={6}>
                <Group>
                  <Text fw={500} size="lg">
                    Ürün Fiyatı:
                  </Text>
                  <Text>{product?.price}₺</Text>
                </Group>
              </Grid.Col>
              <Grid.Col mt="xl" span={6}>
                <Group>
                  <Text fw={500} size="lg">
                    Ürün Stok Durumu:
                  </Text>
                  <Text>{product?.stock}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Box>
                  <Title order={2}>Ürün Açıklaması</Title>
                  <Text size="md">{product?.descrip}</Text>
                </Box>
                <Box>

                </Box>
              </Grid.Col>
              <Grid.Col>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {product && <DeleteProduct close={close} productId={product?.id} />}
                  {product && <UpdatedProduct close2={close} data={product} />}
                </Box>
                <Box>

                </Box>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default ProductPreview;
