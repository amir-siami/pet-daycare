"use client";

// import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function SignOutBtn() {
    const [isPending] = useTransition();

    return (
        <Button
            disabled={isPending}
        >
            Sign out
        </Button>
    );
}