export const GET_KNIGHT_BY_ID_RESULT = {
  name: 'Sir Lancelot',
  nickname: 'The Lance',
  birthday: new Date(),
  weapons: [
    {
      name: 'Sword',
      mod: 5,
      attr: 'strength',
      equipped: true,
    },
    {
      name: 'Bow',
      mod: 3,
      attr: 'dexterity',
      equipped: false,
    },
  ],
  attributes: {
    strength: 10,
    dexterity: 12,
    constitution: 14,
    intelligence: 8,
    wisdom: 16,
    charisma: 9,
  },
  keyAttribute: 'strength',
};

export const GET_KNIGHT_RESULT = [
  {
    _id: '65eb4892f642d344532d5ec3',
    nome: 'Sir Lancelot',
    idade: 0,
    armas: 2,
    atributo: 'strength',
    ataque: 4,
    exp: 0,
  },
  {
    _id: '65eb4fd5dfe0ed15afbaaa6f',
    nome: 'Sir natsu',
    idade: 0,
    armas: 2,
    atributo: 'strength',
    ataque: 8,
    exp: 0,
  },
];
