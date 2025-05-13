'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser
} from "@supabase/auth-helpers-react";
import { Subscription, UserDetails } from "@/app/types/types";
import React from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

/** This user context includes info about 
 * `accessToken`, `user`, `userDetails`, `isLoading`, `subscription` 
 */
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

/**
 * This context provider gives global access to the hook `useUser`.
 * 
 * It gives global access to `accessToken`, `user`, `userDetails`, `isLoading`, `subscription`.
 */
export function MyUserContextProvider({
  children
}: Props) {
  const { session, isLoading: isLoadingUser, supabaseClient } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  function getUserDetails() {
    return supabaseClient.from("users").select("*").maybeSingle();
  }
  function getSubscription() {
    return supabaseClient
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .maybeSingle();
  } 

  React.useEffect(() => {
    const isFinishedLoadingUser = user && !isLoadingData;
    if (isFinishedLoadingUser && !userDetails && !subscription) {
      setIsLoadingData(true);
      
      Promise.allSettled([getUserDetails(), getSubscription()])
        .then((results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        });
    } 
    else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [isLoadingUser, isLoadingData, userDetails, subscription]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
};

/**
 * This hook gives global access to `accessToken`, `user`, `userDetails`, `isLoading`, `subscription`.
 * 
 * @requires can only be called in a Client Component
 * @requires UserProvider must be around the component to call useUser.
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};