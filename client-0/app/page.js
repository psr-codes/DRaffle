"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import App from "@/components/App";
import LotteryForm from "@/components/LotteryForm";
export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    return (
        <div>
            {/* <LotteryForm /> */}
            <App />
        </div>
    );
}
