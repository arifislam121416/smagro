export const uploadImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("Please select an image.");
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing.");
  }

  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data?.error?.message || "Image upload failed."
    );
  }

  return data.data.url;
};