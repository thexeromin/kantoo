import { supabase } from "@/lib/supabase";
import type { BoardInput } from "@/lib/validations/board";

export const boardService = {
  create: async (data: BoardInput) => {
    const { data: res, error } = await supabase
      .from("boards")
      .insert([{ ...data }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return res;
  },
  fetchAll: async () => {
    const { data, error } = await supabase.from("boards").select("*");

    if (error) throw error;
    return data;
  }
};
