export const Resources = [
  {
    key: 'dynamodb',
    name: 'DynamoDB',
    description: 'Tablas NoSQL locales',
    icon: 'assets/icons/Arch_Amazon-DynamoDB_64.svg',
    route: '/dynamodb'
  },
  {
    key: 's3',
    name: 'S3',
    description: 'Almacenamiento S3',
    icon: 'assets/icons/Arch_Amazon-S3-on-Outposts_Storage_64.svg',
    route: '/s3'
  },
];

export const ServiceRouteMap: Record<string, string> = {
  dynamodb: '/dynamodb',
  s3: '/s3',
};
