// types
import { Animal } from "./APIResponseTypes";
// apiService
import { useGetBreedsQuery } from "./petApiService";

export default function useBreedList(animal: Animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) {
    return [[], ["success"]];
  }

  return [breeds ?? [], isLoading ? ["loading"] : ["success"]];
}
