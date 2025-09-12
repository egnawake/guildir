import avatar from './cat.jpg';

const guilds = [
  {
    id: 0,
    name: 'Guild 1',
    icon: avatar,
    description: 'Guild 1 description.',
    tags: ['PvE'],
    games: ['Guild Wars 2'],
  },
  {
    id: 1,
    name: 'Guild 2',
    icon: avatar,
    description: 'Guild 2 description.',
    tags: ['Social'],
    games: ['World of Warcraft'],
  },
];

const tags = [
  'PvE',
  'PvP',
];

const games = [
  'World of Warcraft',
  'Final Fantasy XIV',
];

const data = {
  guilds: {
    getAll: () => {
      return guilds;
    },
    getTags: () => {
      return tags;
    },
    getGames: () => {
      return games;
    }
  }
};

export default data;
