import CallApi from '../CallApi';
import RickMortyRepository from '../../controller/RickMorty.repository';

describe('CallApi', () => {
  describe('JSON Placeholder API REST', () => {
    const BASE_URI = 'https://jsonplaceholder.typicode.com/';
    const API: CallApi = new CallApi(BASE_URI);

    it('should return list of user with Api placeholder', async () => {
      const RESULT = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
              lat: '-43.9509',
              lng: '-34.4618',
            },
          },
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
          company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
          },
        },
        {
          id: 3,
          name: 'Clementine Bauch',
          username: 'Samantha',
          email: 'Nathan@yesenia.net',
          address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
              lat: '-68.6102',
              lng: '-47.0653',
            },
          },
          phone: '1-463-123-4447',
          website: 'ramiro.info',
          company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications',
          },
        },
        {
          id: 4,
          name: 'Patricia Lebsack',
          username: 'Karianne',
          email: 'Julianne.OConner@kory.org',
          address: {
            street: 'Hoeger Mall',
            suite: 'Apt. 692',
            city: 'South Elvis',
            zipcode: '53919-4257',
            geo: {
              lat: '29.4572',
              lng: '-164.2990',
            },
          },
          phone: '493-170-9623 x156',
          website: 'kale.biz',
          company: {
            name: 'Robel-Corkery',
            catchPhrase: 'Multi-tiered zero tolerance productivity',
            bs: 'transition cutting-edge web services',
          },
        },
        {
          id: 5,
          name: 'Chelsey Dietrich',
          username: 'Kamren',
          email: 'Lucio_Hettinger@annie.ca',
          address: {
            street: 'Skiles Walks',
            suite: 'Suite 351',
            city: 'Roscoeview',
            zipcode: '33263',
            geo: {
              lat: '-31.8129',
              lng: '62.5342',
            },
          },
          phone: '(254)954-1289',
          website: 'demarco.info',
          company: {
            name: 'Keebler LLC',
            catchPhrase: 'User-centric fault-tolerant solution',
            bs: 'revolutionize end-to-end systems',
          },
        },
        {
          id: 6,
          name: 'Mrs. Dennis Schulist',
          username: 'Leopoldo_Corkery',
          email: 'Karley_Dach@jasper.info',
          address: {
            street: 'Norberto Crossing',
            suite: 'Apt. 950',
            city: 'South Christy',
            zipcode: '23505-1337',
            geo: {
              lat: '-71.4197',
              lng: '71.7478',
            },
          },
          phone: '1-477-935-8478 x6430',
          website: 'ola.org',
          company: {
            name: 'Considine-Lockman',
            catchPhrase: 'Synchronised bottom-line interface',
            bs: 'e-enable innovative applications',
          },
        },
        {
          id: 7,
          name: 'Kurtis Weissnat',
          username: 'Elwyn.Skiles',
          email: 'Telly.Hoeger@billy.biz',
          address: {
            street: 'Rex Trail',
            suite: 'Suite 280',
            city: 'Howemouth',
            zipcode: '58804-1099',
            geo: {
              lat: '24.8918',
              lng: '21.8984',
            },
          },
          phone: '210.067.6132',
          website: 'elvis.io',
          company: {
            name: 'Johns Group',
            catchPhrase: 'Configurable multimedia task-force',
            bs: 'generate enterprise e-tailers',
          },
        },
        {
          id: 8,
          name: 'Nicholas Runolfsdottir V',
          username: 'Maxime_Nienow',
          email: 'Sherwood@rosamond.me',
          address: {
            street: 'Ellsworth Summit',
            suite: 'Suite 729',
            city: 'Aliyaview',
            zipcode: '45169',
            geo: {
              lat: '-14.3990',
              lng: '-120.7677',
            },
          },
          phone: '586.493.6943 x140',
          website: 'jacynthe.com',
          company: {
            name: 'Abernathy Group',
            catchPhrase: 'Implemented secondary concept',
            bs: 'e-enable extensible e-tailers',
          },
        },
        {
          id: 9,
          name: 'Glenna Reichert',
          username: 'Delphine',
          email: 'Chaim_McDermott@dana.io',
          address: {
            street: 'Dayna Park',
            suite: 'Suite 449',
            city: 'Bartholomebury',
            zipcode: '76495-3109',
            geo: {
              lat: '24.6463',
              lng: '-168.8889',
            },
          },
          phone: '(775)976-6794 x41206',
          website: 'conrad.com',
          company: {
            name: 'Yost and Sons',
            catchPhrase: 'Switchable contextually-based project',
            bs: 'aggregate real-time technologies',
          },
        },
        {
          id: 10,
          name: 'Clementina DuBuque',
          username: 'Moriah.Stanton',
          email: 'Rey.Padberg@karina.biz',
          address: {
            street: 'Kattie Turnpike',
            suite: 'Suite 198',
            city: 'Lebsackbury',
            zipcode: '31428-2261',
            geo: {
              lat: '-38.2386',
              lng: '57.2232',
            },
          },
          phone: '024-648-3804',
          website: 'ambrose.net',
          company: {
            name: 'Hoeger LLC',
            catchPhrase: 'Centralized empowering task-force',
            bs: 'target end-to-end models',
          },
        },
      ];
      const EXPECTED = API?.get('users');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await EXPECTED).toEqual(RESULT);
    });

    it('should return one user by id', async () => {
      const RESULT = {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        address: {
          street: 'Hoeger Mall',
          suite: 'Apt. 692',
          city: 'South Elvis',
          zipcode: '53919-4257',
          geo: {
            lat: '29.4572',
            lng: '-164.2990',
          },
        },
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        company: {
          name: 'Robel-Corkery',
          catchPhrase: 'Multi-tiered zero tolerance productivity',
          bs: 'transition cutting-edge web services',
        },
      };

      const EXPECTED = API?.get('users/4');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await EXPECTED).toEqual(RESULT);
    });
  });

  describe('Rick And Morty Controller', () => {
    it('should return list from Rick and Morty', async () => {
      const RESULT: {
        data: {
          characters: {
            info: {
              count: number;
              next: number;
              pages: number;
              prev: number;
            };
            results: Array<{
              name: string;
              image: string;
              gender: string;
              species: string;
              origin: { dimension: string | null; name: string };
              status: string;
              type: string;
            }>;
          };
        };
      } = {
        data: {
          characters: {
            info: { count: 826, next: 11, pages: 42, prev: 9 },
            results: [
              {
                name: "Jessica's Friend",
                image: 'https://rickandmortyapi.com/api/character/avatar/181.jpeg',
                gender: 'Female',
                species: 'Human',
                origin: { dimension: 'Dimension C-137', name: 'Earth (C-137)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Jim',
                image: 'https://rickandmortyapi.com/api/character/avatar/182.jpeg',
                gender: 'Male',
                species: 'Human',
                // eslint-disable-next-line sonarjs/no-duplicate-string
                origin: { dimension: 'Replacement Dimension', name: 'Earth (Replacement Dimension)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Johnny Depp',
                image: 'https://rickandmortyapi.com/api/character/avatar/183.jpeg',
                gender: 'Male',
                species: 'Human',
                origin: { dimension: 'Dimension C-500A', name: 'Earth (C-500A)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Jon',
                image: 'https://rickandmortyapi.com/api/character/avatar/184.jpeg',
                gender: 'Male',
                species: 'Alien',
                origin: { dimension: 'unknown', name: 'Gazorpazorp' },
                status: 'Alive',
                type: 'Gazorpian',
              },
              {
                name: 'Joseph Eli Lipkip',
                image: 'https://rickandmortyapi.com/api/character/avatar/185.jpeg',
                gender: 'Male',
                species: 'Human',
                origin: { dimension: 'Replacement Dimension', name: 'Earth (Replacement Dimension)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Joyce Smith',
                image: 'https://rickandmortyapi.com/api/character/avatar/186.jpeg',
                gender: 'Female',
                species: 'Human',
                origin: { dimension: 'Dimension C-137', name: 'Earth (C-137)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Juggling Rick',
                image: 'https://rickandmortyapi.com/api/character/avatar/187.jpeg',
                gender: 'Male',
                species: 'Human',
                origin: { dimension: null, name: 'unknown' },
                status: 'unknown',
                type: '',
              },
              {
                name: 'Karen Entity',
                image: 'https://rickandmortyapi.com/api/character/avatar/188.jpeg',
                gender: 'Female',
                species: 'Alien',
                origin: { dimension: 'Replacement Dimension', name: "Unity's Planet" },
                status: 'Alive',
                type: 'Unknown-nippled alien',
              },
              {
                name: 'Katarina',
                image: 'https://rickandmortyapi.com/api/character/avatar/189.jpeg',
                gender: 'Female',
                species: 'Human',
                origin: { dimension: 'Replacement Dimension', name: 'Earth (Replacement Dimension)' },
                status: 'Dead',
                type: '',
              },
              {
                name: 'Keara',
                image: 'https://rickandmortyapi.com/api/character/avatar/190.jpeg',
                gender: 'Female',
                species: 'Alien',
                origin: { dimension: 'Replacement Dimension', name: 'Krootabulon' },
                status: 'Alive',
                type: 'Krootabulan',
              },
              {
                name: 'Kevin',
                image: 'https://rickandmortyapi.com/api/character/avatar/191.jpeg',
                gender: 'Male',
                species: 'Alien',
                origin: { dimension: null, name: 'unknown' },
                status: 'Dead',
                type: 'Zigerion',
              },
              {
                name: 'King Flippy Nips',
                image: 'https://rickandmortyapi.com/api/character/avatar/192.jpeg',
                gender: 'Male',
                species: 'Alien',
                origin: { dimension: 'Replacement Dimension', name: 'Pluto' },
                status: 'Alive',
                type: 'Plutonian',
              },
              {
                name: 'King Jellybean',
                image: 'https://rickandmortyapi.com/api/character/avatar/193.jpeg',
                gender: 'Male',
                species: 'Mythological Creature',
                origin: { dimension: 'Fantasy Dimension', name: 'Fantasy World' },
                status: 'Dead',
                type: 'Jellybean',
              },
              {
                name: 'Kozbian',
                image: 'https://rickandmortyapi.com/api/character/avatar/194.jpeg',
                gender: 'unknown',
                species: 'Alien',
                origin: { dimension: null, name: 'unknown' },
                status: 'Alive',
                type: 'Tentacle alien',
              },
              {
                name: 'Kristen Stewart',
                image: 'https://rickandmortyapi.com/api/character/avatar/195.jpeg',
                gender: 'Female',
                species: 'Human',
                origin: { dimension: 'Dimension C-500A', name: 'Earth (C-500A)' },
                status: 'Alive',
                type: '',
              },
              {
                name: 'Krombopulos Michael',
                image: 'https://rickandmortyapi.com/api/character/avatar/196.jpeg',
                gender: 'Male',
                species: 'Alien',
                origin: { dimension: null, name: 'unknown' },
                status: 'Dead',
                type: 'Gromflomite',
              },
              {
                name: 'Kyle',
                image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
                gender: 'Male',
                species: 'Humanoid',
                origin: { dimension: 'Replacement Dimension', name: "Zeep Xanflorp's Miniverse" },
                status: 'Dead',
                type: 'Miniverse inhabitant',
              },
              {
                name: 'Lady Katana',
                image: 'https://rickandmortyapi.com/api/character/avatar/198.jpeg',
                gender: 'Female',
                species: 'Humanoid',
                origin: { dimension: null, name: 'unknown' },
                status: 'Dead',
                type: 'Cyborg',
              },
              {
                name: 'Larva Alien',
                image: 'https://rickandmortyapi.com/api/character/avatar/199.jpeg',
                gender: 'unknown',
                species: 'Alien',
                origin: { dimension: 'Unknown dimension', name: "Larva Alien's Planet" },
                status: 'Alive',
                type: 'Larva alien',
              },
              {
                name: 'Lawyer Morty',
                image: 'https://rickandmortyapi.com/api/character/avatar/200.jpeg',
                gender: 'Male',
                species: 'Human',
                origin: { dimension: null, name: 'unknown' },
                status: 'unknown',
                type: '',
              },
            ],
          },
        },
      };

      const EXPECTED = new RickMortyRepository().getList(10);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await EXPECTED).toEqual(RESULT);
    });
  });
});
