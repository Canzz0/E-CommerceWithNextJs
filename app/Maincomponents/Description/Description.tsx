"use client"
import { Button, Grid, rem, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCircleDottedLetterC, IconMist, IconStar, IconUser } from '@tabler/icons-react';
import classes from './Description.module.css';

const features = [
  {
    icon: IconCircleDottedLetterC,
    title: 'Orijinal Ürün Garantisi',
    description: 'Tüm saatlerimiz %100 orijinal olup 2 yıl garantilidir',
  },
  {
    icon: IconUser,
    title: 'Uzman Kadro',
    description: 'Deneyimli saat ustalarımız ile profesyonel servis hizmeti sunuyoruz',
  },
  {
    icon: IconMist,
    title: 'Geniş Koleksiyon',
    description:
      'Dünyaca ünlü markaların en yeni ve özel koleksiyonlarını sizler için bir araya getiriyoruz',
  },
  {
    icon: IconStar,
    title: 'Özel Hizmet',
    description:
      'Kişiye özel danışmanlık ve after-sales hizmetlerimiz ile yanınızdayız',
  },
];

export function Description() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ from: '#FF9900', to: '#FF6200' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>

      <Grid >
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Lüks ve Zarafeti Buluşturan Premium Saat Koleksiyonu
          </Title>
          <Text c="dimmed">
            En seçkin saat markalarının en yeni modellerini keşfedin. Uzman kadromuz,
            geniş koleksiyonumuz ve profesyonel hizmet anlayışımız ile hayalinizdeki
            saate sahip olmanız için buradayız.
          </Text>

          <Button
            variant="gradient"
            gradient={{ from: '#FF9900', to: '#FF6200' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Koleksiyonu Keşfet
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}