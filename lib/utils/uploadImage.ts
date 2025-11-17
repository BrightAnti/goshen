import { supabase } from "@/lib/supabase/client";

export async function uploadImage(
  file: File,
  bucket: string = "school-images"
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(
  url: string,
  bucket: string = "school-images"
): Promise<void> {
  try {
    const fileName = url.split("/").pop();
    if (!fileName) return;

    const { error } = await supabase.storage.from(bucket).remove([fileName]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}


