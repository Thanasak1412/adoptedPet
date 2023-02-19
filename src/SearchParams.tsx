import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Results from "./Results";
import useBreedList from "./useBreedList";
// types
import { Animal, PetState } from "./APIResponseTypes";
// redux
import { all } from "./searchParamsSlice";
import { useGetSearchQuery } from "./petApiService";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const adoptedPet = useSelector(
    (state: { adoptedPet: PetState }) => state.adoptedPet
  );
  const requestParams = useSelector(
    (state: {
      searchParams: {
        value: {
          location: string;
          animal: Animal;
          breed: string;
        };
      };
    }) => state.searchParams
  );
  const dispatch = useDispatch();
  const { data } = useGetSearchQuery(requestParams.value);
  const pets = data ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="shadow-ls mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet.pet ? (
          <div className="pet image-container">
            <img src={adoptedPet.pet.images[0]} alt={adoptedPet.pet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="mb-5 block w-60"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="mb-5 block w-60"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            className="focus disabled:text-gray-60 mb-5 block w-60"
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded border-none bg-orange-500  px-6 py-2 text-white hover:opacity-40">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
