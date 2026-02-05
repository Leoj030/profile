import { supabase } from './supabaseClient';

export const uploadFile = async (file: File | Buffer, bucketName: string, fileName: string, fileType: string) => {
    const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
        contentType: fileType
    });

    if (error) {
        console.error(error);
        return null;
    }

    return data.id;
}
