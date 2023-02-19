import { expect, test } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";
import { Animal } from "../APIResponseTypes";
import { Provider } from "react-redux";
import store from "../store";

// handle testing the react hook from itself.

// function getBreedList(animal: Animal) {
//   let list: string[][] = [];

//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: Infinity,
//         cacheTime: Infinity,
//         retry: false,
//       },
//     },
//   });

//   render(
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <TestComponent />
//       </QueryClientProvider>
//     </Provider>
//   );

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [breedList, [status]] = list;

//   return [list ? breedList.flat() : undefined, status];
// }

// test("gives an empty list with no animal provided", () => {
//   const [breedList, status] = getBreedList("dog");

//   expect(breedList).toHaveLength(0);
//   expect(status).toBe("loading");
// });

// used `renderHook` to testing the react hook with testing-library/react

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("gives an empty list with no animal provided", () => {
  const { result } = renderHook(() => useBreedList("rabbit"), {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    ),
  });

  const [breedList, [status]] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frist",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetchMock.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    ),
  });

  await waitFor(() => expect(result.current[1][0]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
