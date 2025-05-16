'use client'

import {createContext, useState} from "react";
import {Pet} from "@/lib/types";
import {useSearchContext} from "@/lib/hooks";

type TPetContext = {
    pets: Pet[];
    selectedPetId: string | null;
    selectedPet: Pet | undefined;
    numberOfPets: number

    handleAddPet: (pet: Omit<Pet, 'id'>) => void;
    handleEditPet: (petId: string, newPetData: Pet) => void;
    handleCheckoutPet: (id: string) => void;
    handleChangeSelectedPetId: (id: string) => void;
}

type PetContextProviderProps = {
    data: Pet[],
    children: React.ReactNode
}

export const PetContext = createContext<TPetContext | null>(null)

export function PetContextProvider({ data, children }: PetContextProviderProps ) {
    const [pets, setPets] = useState<Pet[]>(data);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    const selectedPet = pets.find((p) => p.id === selectedPetId);
    const numberOfPets = pets.length;

    const handleChangeSelectedPetId = ((id: string | null) => {
        setSelectedPetId(id);
    })

    const handleCheckoutPet = async (petId: string | null) => {
        setPets(prev => prev.filter((pet) => petId !== pet.id));
        setSelectedPetId(null);
    }

    const handleAddPet = (pet: Omit<Pet, "id">) => {
        if (!pet) return;

        const newPet: Pet = {
            id: crypto.randomUUID(),
            ...pet,
        };
        setPets(prev => [...prev, newPet]);
    }

    const handleEditPet = (petId: string, newPetData: Omit<Pet, 'id'>) => {
       setPets(prev => prev.map((pet) => {
           if (pet.id === petId)
               return {
               id: petId,
               ...newPetData,
           }
           return pet;
       })
       )
    }

    const {searchQuery} = useSearchContext()
    const filteredPets: Pet[] = pets.filter((p: Pet) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <PetContext.Provider
            value={{
                pets: filteredPets,
                selectedPetId,
                handleChangeSelectedPetId,
                selectedPet,
                numberOfPets,
                handleCheckoutPet,
                handleAddPet,
                handleEditPet
        }}>
            {children}
        </PetContext.Provider>
    )
}
