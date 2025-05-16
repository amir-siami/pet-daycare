import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import SearchContextProvider from "@/contexts/search-context-provider";
import {PetContextProvider} from "@/contexts/pet-context-prodiver";
import {Pet} from "@/lib/types";

    const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets')
    if (!response.ok) {
        throw new Error("Could not find any pets for this page.");
    }
    const data: Pet[] = await response.json();
export default async function Layout({children}: {children: React.ReactNode}) {

    return (
        <>
            <BackgroundPattern />

            <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
                <AppHeader />
                <SearchContextProvider>
                    <PetContextProvider data={data}>
                        {children}
                    </PetContextProvider>
                </SearchContextProvider>
                <AppFooter />
            </div>
        </>
    );
}