"use client";

import useUploadModal from "@/hooks/useUpload";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import uniqid from "uniqid";
import toast from "react-hot-toast";


/**
 * This component handles displaying the form to upload a song.
 * 
 * It displays inputs for song's title, author, song, and thumbnail.
 * 
 * If any of the fields are empty, the form is not submitted 
 * and a error message appears.
 * 
 * Otherwise it submits the song and thumbnail to Supabase storage,
 * and creates a song record in Supabase.
 * 
 * It then closes the modal and displays a success message.
 * 
 * If song upload fails, it displays an error for failed Song upload.
 * If image upload fails, it displays an error for failed Image upload.
 * If database upload fails, it displays an error for failed database upload.
 * 
 * If for some reason the user is not logged in, it displays a error message for not logged in.
 * 
 * @requires user needs to be logged in. 
 */
const UploadModal = () => {
	const supabaseClient = useSupabaseClient();
	const router = useRouter();
	const { user } = useUser();
	const uploadModal = useUploadModal();
	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: "",
			title: "",
			song: null,
			image: null,
		},
	});

	const onChange = (open: boolean): void => {
		if (!open) {
			reset();
			uploadModal.onClose();
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);
			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];
			if (!user) {
				toast.error("Need to be logged in to use this feature");
				return;
			}
			if (!imageFile || !songFile) {
				toast.error("Missing fields");
				return;
			}
			const uniqueID = uniqid();

			const { data: songData, error: songError } = await supabaseClient.storage
				.from("songs")
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: "3600",
					upsert: false,
				});
			if (songError) {
				setIsLoading(false);
				return toast.error("Failed song upload");
			}

			const { data: imageData, error: imageError } = await supabaseClient.storage
				.from("images")
				.upload(`image-${values.title}-${uniqueID}`, imageFile, {
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
			isOpen={uploadModal.isOpen}
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

export default UploadModal;
