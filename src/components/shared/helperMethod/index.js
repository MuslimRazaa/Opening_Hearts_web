import { useEffect, useState } from "react";

export const useUserData = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user_data");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const updateUser = () => {
            const updatedUser = localStorage.getItem("user_data");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        // Listen for storage updates (only works across tabs)
        window.addEventListener("storage", updateUser);

        // Polling mechanism for same-tab updates
        const interval = setInterval(updateUser, 500); // Check every 500ms

        return () => {
            window.removeEventListener("storage", updateUser);
            clearInterval(interval);
        };
    }, []);

    return user;
};