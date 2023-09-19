import supabase from "./supabase";

interface DataType {
  file_id: string;
  file_name: string;
  file_url: string;
  user_id: number;
  created_at: Date;
}

export async function getFiles(): Promise<DataType[]> {
  const { data, error } = await supabase.from("upload_file").select("*");
  if (error) {
    console.log(error);
  }
  return data;
}
