// src/api/contact.ts
import { supabase } from '../lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContact = async (data: ContactFormData) => {
  const { error } = await supabase
    .from('contacts')
    .insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      created_at: new Date().toISOString()
    });

  if (error) throw error;
  return { success: true };
};