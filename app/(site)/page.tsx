import getSongs from "@/actions/getSongs";
import { Song } from "@/types";
import React from "react";
import { HomePresenter } from "./components/HomePresenter";

/** This is used to disable caching */
export const revalidate = 0;

export default function HomeController() {
	let songs: Song[] = [];

	getSongs().then((songData: Song[]) => {
		songs = songData;
	})

	return (
		<HomePresenter 
			songs={songs} 
		/>
	)
}
