import { CardProps } from '../components/Card/Card';

export const pets: CardProps[] = [
  {
    id: 1,
    name: 'Osa',
    phone: '999444222',
    email: 'gonzalovidal.dev@gmail.com',
    image: {
      url: 'https://i.postimg.cc/LX35wnZZ/osa.png',
      alt: 'Foto de osa',
    },
    isFavorite: true,
    color: 'gold',
    gender: 'female',
    animalType: 'dog',
  },
  {
    id: 2,
    name: 'Princesa',
    phone: '999534222',
    email: 'princesa@hotmail.com',
    image: {
      url: 'https://i.postimg.cc/h48jfsQZ/princesa.png',
      alt: 'beautiful 3 legged dog',
    },
    isFavorite: true,
    color: 'white',
    gender: 'female',
    animalType: 'dog',
  },
  {
    id: 3,
    name: 'Lily',
    phone: '999444211',
    email: 'laith@hotmail.com',
    image: {
      url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
      alt: 'beautiful cat',
    },
    isFavorite: false,
    color: 'white',
    gender: 'female',
    animalType: 'dog',
  },
  {
    id: 4,
    name: 'Felix',
    phone: '953444211',
    email: 'gather@hotmail.com',
    image: {
      url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      alt: 'beautiful cat',
    },
    isFavorite: false,
    color: 'grey',
    gender: 'male',
    animalType: 'cat',
  },
  {
    id: 5,
    name: 'Holly',
    phone: '934333333',
    email: 'laith@hotmail.com',
    image: {
      url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      alt: 'beautiful cat2',
    },
    isFavorite: false,
    color: 'white',
    gender: 'female',
    animalType: 'cat',
  },
];
