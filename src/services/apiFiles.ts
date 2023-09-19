import supabase from "./supabase";

export async function getFiles() {
  const { data, error } = await supabase.from("upload_file").select("*");
  if (error) {
    console.log(error);
  }
  return data;
}
