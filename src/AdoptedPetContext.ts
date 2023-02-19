import { createContext } from "react";
import { Pet } from './APIResponseTypes';

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet | null) => void]>([
    {
        id: 1,
        name: 'fido',
        animal: 'dog',
        description: 'lorem ipsum',
        breed: 'Beagle',
        images: [],
        city: 'Seattle',
        state: 'WA',
    },
    () => {},
]);

export default AdoptedPetContext;
