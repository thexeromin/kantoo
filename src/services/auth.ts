import { supabase } from "@/lib/supabase";
import type { SignupInput, LoginInput } from "@/lib/validations/auth";

export const authService = {
  signup: async (data: SignupInput) => {
    const { data: res, error } = await supabase.auth.signUp(data);
    if (error) {
      throw new Error(error.message);
    }

    return res.user;
  },
  login: async (data: LoginInput) => {
    const { data: res, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw new Error(error.message);
    }

    return res.user;
  }
};
