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
