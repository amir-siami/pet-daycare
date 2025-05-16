"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import {usePetContext} from "@/lib/hooks";
import {DEFAULT_PET_IMAGE} from "@/lib/constants";

type PetFormProps = {
    actionType: "add" | "edit";
    onFormSubmissionAction: () => void;
};

export default function PetForm({ actionType, onFormSubmissionAction}: PetFormProps) {

    const {handleAddPet, handleEditPet, selectedPet} = usePetContext()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newPet = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string ,
            imageUrl: formData.get("imageUrl") as string || DEFAULT_PET_IMAGE,
            age: +(formData.get('age') as string),
            notes: formData.get("notes") as string,
        }


        if (actionType === "edit") {
            handleEditPet(selectedPet?.id as string, newPet)
        }
        if (actionType === "add") {
            handleAddPet(newPet)
        }
        onFormSubmissionAction()
    }



    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col"
        >
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name='name' defaultValue={actionType === 'add' ? '' : selectedPet?.name} required/>
                    {/*{errors.name && <p className="text-red-500">{errors.name.message}</p>}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" name='ownerName' defaultValue={actionType === 'add' ? '' : selectedPet?.ownerName} required/>
                    {/*{errors.ownerName && (*/}
                    {/*    <p className="text-red-500">{errors.ownerName.message}</p>*/}
                    {/*)}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="imageUrl">Image Url</Label>
                    <Input id="imageUrl" name='imageUrl' defaultValue={actionType === 'add' ? '' : selectedPet?.imageUrl} />
                    {/*{errors.imageUrl && (*/}
                    {/*    <p className="text-red-500">{errors.imageUrl.message}</p>*/}
                    {/*)}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name='age' defaultValue={actionType === "add" ? '' : selectedPet?.age} required/>
                    {/*{errors.age && <p className="text-red-500">{errors.age.message}</p>}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name='notes' defaultValue={actionType === 'add' ? '' : selectedPet?.notes} required/>
                    {/*{errors.notes && (*/}
                    {/*    <p className="text-red-500">{errors.notes.message}</p>*/}
                    {/*)}*/}
                </div>
            </div>

            <PetFormBtn actionType={actionType} />
        </form>
    );
}