import React from 'react'; // Import React for component creation

/**
 * AspectRatioVideo functional component.
 * Embeds a video with a responsive aspect ratio.
 *
 * Props:
 * - videoUrl: string - The URL of the video to be embedded (e.g., YouTube embed URL).
 * - aspectRatio: string (optional, default: "16/9") - The aspect ratio of the video,
 * expressed as "width/height" (e.g., "16/9", "4/3", "1/1"). This directly maps to Tailwind's
 * `aspect-[width/height]` class (e.g., `aspect-16/9`).
 * - title: string (optional, default: "Embedded Video") - The title for the iframe,
 * important for accessibility and screen readers.
 */
const AspectRatioVideo = ({
	videoUrl,
	aspectRatio = "16/9", // Default aspect ratio changed to "16/9" for direct Tailwind usage
	title = "Embedded Video",
}) => {
	return (
		// Outer div creates the aspect ratio container using Tailwind's aspect-ratio classes.
		// `overflow-hidden` ensures video edges are clipped within the container.
		// `rounded-lg` applies rounded corners to the video container.
		<div className={`aspect-${aspectRatio} overflow-hidden rounded-lg`}>
			{/* Iframe for embedding the video. */}
			<iframe
				src={videoUrl} // The source URL of the video
				title={title} // Title for accessibility
				frameBorder="0" // No border around the iframe
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Permissions for video features
				allowFullScreen // Allows the video to go full screen
				className="w-full h-full" // Ensures the iframe fills its parent container
			></iframe>
		</div>
	);
};

export default AspectRatioVideo;
