"use client";

import useUploadModal from "@/app/hooks/modals/useUploadModal";
import { useUser } from "@/app/hooks/useUser";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal from "@/app/components/modals/Modal";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";

interface Debug {
	isOpen: boolean
}

interface UploadModalProps {
	debug?: Debug
}


/**
 * This component handles displaying the form to upload a song.
 * 
 * It displays inputs for song's title, author, song, and thumbnail.
 * 
 * If the user closes the modal, the form is reset.
 * If the esc key is pressed, the form should reset.
 * 
 * @requires user needs to be logged in. 
 * @requires SupabaseProvider needs to be around this component.
 * @requires UserProvider needs to be around this component.
 * @requires RouterContext needs to be around this component.
 */
export default function UploadModal({
	debug
}: UploadModalProps) {
	const { user } = useUser();
	const router = useRouter();
	const supabaseClient = useSupabaseClient();
	const uploadModal = useUploadModal();

	const [isLoading, setIsLoading] = React.useState(false);

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: "",
			title: "",
			song: null,
			image: null,
		},
	});

	let isModalOpen = uploadModal.isOpen;
	if (debug) {
		isModalOpen = debug.isOpen
	}

	/**
	 * This function toggles the open state for the modal.
	 * When the modal is closed, the form is reset.
	 */
	function onChange(open: boolean) {
		if (!open) {
			reset();
			uploadModal.onClose();
		}
	};
	/**
	 * This function handles uploading song data.
	 * 
	 * If the user is not logged in, it displays a error message to the user.
	 * 
	 * If any of the fields are empty, the form is not submitted,
	 * it displays a message to the user for missing fields.
	 * 
	 * Otherwise it submits the song and thumbnail to Supabase storage
	 * in the form of `song-title-id` and `image-title-id`,
	 * and creates a song record in Supabase table.
	 * 
	 * If a song, image, or database upload fails, it displays an error for that failed operation.
	 * 
	 * Otherwise it then closes the modal and displays a success message to the user.
	 */
	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);
			if (!user) {
				toast.error("Need to be logged in to use this feature");
				return;
			}

			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];
			if (!imageFile || !songFile) {
				toast.error("Missing fields");
				return;
			}

			/**
			 * TODO MOVE TO ACTIONS FOLDER AND HIDE FROM CLIENT.
			 */
			const uniqueId = uniqid();
			const { data: songData, error: songError } = await supabaseClient.storage
				.from("songs")
				.upload(`song-${values.title}-${uniqueId}`, songFile, {
					cacheControl: "3600",
					upsert: false,
				});
			if (songError) {
				setIsLoading(false);
				return toast.error("Failed song upload");
			}

			const { data: imageData, error: imageError } = await supabaseClient.storage
				.from("images")
				.upload(`image-${values.title}-${uniqueId}`, imageFile, {
					cacheControl: "3600",
					upsert: false,
				});
			if (imageError) {
				setIsLoading(false);
				return toast.error("Failed image upload");
			}

			const { error } = await supabaseClient
				.from("songs")
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					image_path: imageData.path,
					song_path: songData.path,
				});

			if (error) {
				setIsLoading(false);
				return toast.error(error.message);
			}

			reset();
			router.refresh();
			setIsLoading(false);
			toast.success("Song created");
			uploadModal.onClose();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			title="Add a song"
			description="Upload mp3 files"
			isOpen={isModalOpen}
			onChange={onChange}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
				<Input
					id="title"
					disabled={isLoading}
					{...register("title", { required: true })}
					placeholder="Song Title"
				/>
				<Input
					id="author"
					disabled={isLoading}
					{...register("author", { required: true })}
					placeholder="Song Author"
				/>
				<div>
					<div className="pb-1">Select a song file</div>
					<Input
						id="song"
						disabled={isLoading}
						{...register("song", { required: true })}
						type="file"
						accept=".mp3"
					/>
				</div>
				<div>
					<div className="pb-1">Select an image</div>
					<Input
						id="image"
						disabled={isLoading}
						{...register("image", { required: true })}
						type="file"
						accept="image/*"
					/>
				</div>
				<Button disabled={isLoading} type="submit">
					Create
				</Button>
			</form>
		</Modal>
	);
};