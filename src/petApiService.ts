import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Animal, Pet } from "./APIResponseTypes";

export const petApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: string) => ({ url: "pets", params: { id } }),
      transformResponse: (response: { pets: Pet[] }) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({
        url: "breeds",
        params: { animal },
      }),
      transformResponse: (response: { breeds: string[] }) => response.breeds,
    }),
    getSearch: builder.query({
      query: ({
        animal,
        location,
        breed,
      }: {
        animal: Animal;
        location: string;
        breed: string;
      }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response: { pets: Pet[] }) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useGetSearchQuery } = petApi;
