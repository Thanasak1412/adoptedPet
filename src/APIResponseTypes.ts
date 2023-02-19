export type Animal = "dog" | "cat" | "rabbit" | "bird" | "reptile";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetApiResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export interface BreedListApiResponse {
  animal: Animal;
  breeds: string[];
}

export type PetState = {
  isLoading: boolean;
  isError: boolean;
  pet: Pet | null;
};
