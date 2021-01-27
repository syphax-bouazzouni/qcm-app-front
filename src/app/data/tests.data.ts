import {Test, TestType} from '../interfaces/quiz/test';


const test1: Test = {
  question: 'Les propositions suivantes concernent les os longs des membres.' ,
  type: TestType.QCU ,
  source: 'Externat-Alger',
  propositions: [
    {
      index: 0,
      proposition: 'La croissance en longueur dépend d\'un processus d\'ossification périostée.',
      isResponse: false
    },
    {
      index: 1,
      proposition: 'La moelle osseuse rouge se rencontre principalement au niveau de la diaphyse.',
      isResponse: false
    },
    {
      index: 2,
      proposition: 'L\'évasement de l\'épiphyse d\'un os long permet d’augmenter la composante stabilisatrice de l\'action musculaire.',
      isResponse: false
    },
    {
      index: 3,
      proposition: ' L\'épiphyse fertile de l\'humérus est l\'épiphise proximale.',
      isResponse: true
    },
    {
      index: 4,
      proposition: 'Le cartilage de conjugaison donne naissance au cartilage articulaire.',
      isResponse: false
    },
  ],
}
const test2: Test = {

  question: 'Les propositions suivantes concernent le radius.' ,
  type: TestType.QCU ,
  source: 'Externat-Alger',
  propositions: [
    {
      index: 0,
      proposition: 'La fovea (fossette) de la tête radiale s\'articule avec le disque articulaire (ligament triangulaire).',
      isResponse: false
    },
    {
      index: 1,
      proposition: 'La circonférence articulaire (pourtour articulaire) de la tête radiale est articulaire avec l’incisure trochléaire de l’ulna.',
      isResponse: false
    },
    {
      index: 2,
      proposition: 'Le col sépare la tubérosité radiale de la diaphyse.',
      isResponse: false
    },
    {
      index: 3,
      proposition: 'Le bord ventral de la diaphyse est dit interosseux.',
      isResponse: false
    },
    {
      index: 4,
      proposition: 'Le radius est parallèle à l\'ulna lorsque la main est en supination.',
      isResponse: true
    },
  ],
}
const test3: Test = {

  question: 'Les propositions suivantes concernent le radius.' ,
  type: TestType.QCU ,
  source: 'Externat-Alger',
  propositions: [
    {
      index: 0,
      proposition: 'La fovea (fossette) de la tête radiale s\'articule avec le disque articulaire (ligament triangulaire).',
      isResponse: false
    },
    {
      index: 1,
      proposition: 'La circonférence articulaire (pourtour articulaire) de la tête radiale est articulaire avec l’incisure trochléaire de l’ulna.',
      isResponse: false
    },
    {
      index: 2,
      proposition: 'Le col sépare la tubérosité radiale de la diaphyse.',
      isResponse: false
    },
    {
      index: 3,
      proposition: 'Le bord ventral de la diaphyse est dit interosseux.',
      isResponse: false
    },
    {
      index: 4,
      proposition: 'Le radius est parallèle à l\'ulna lorsque la main est en supination.',
      isResponse: true
    },
  ],
}
export const testsData: Test[] = [ test1 , test2, test3]
