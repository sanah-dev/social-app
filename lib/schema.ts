import { z } from 'zod';

// // TODO: schema 정리 필요
// export const fileSchema = z.object({
//   type: z.string().refine((value) => value.includes('image'), {
//     message: '이미지 파일만 업로드 가능합니다',
//   }),
//   size: z.number().max(2, '2MB 이하 파일만 업로드 가능합니다'),
// });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// TODO: schema 정리 필요
export const fileSchema = z.object({
  image: z.instanceof(File, {
    message: '이미지 파일을 선택해주세요.',
  }),
  // size: z.number().max(5, '5MB 이하 파일만 업로드 가능합니다'),
  // type: z
  //   .string()
  //   .refine((value) => value.includes('image'), {
  //     message: '이미지 파일만 업로드 가능합니다',
  //   })
  //   .refine((file) => file.size <= MAX_FILE_SIZE, {
  //     message: `The image is too large. Please choose an image smaller than ${formatBytes(
  //       MAX_FILE_SIZE
  //     )}.`,
  //   })
  //   .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
  //     message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
  //   }),
});
