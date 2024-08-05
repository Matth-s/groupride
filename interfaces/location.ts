export interface resultCityInterface {
  nom: string;
  code: number;
  _score: GLfloat;
  codesPostaux: number[];
  departement: {
    code: number;
    nom: string;
  };
}

export interface StreetNumberInterface {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  type: string;
  importance: number;
  street: string;
}
