// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// اطمینان از وجود متغیرهای محیطی
// در Vite، متغیرهای محیطی که با VITE_ شروع می شوند، به صورت خودکار در process.env در دسترس نیستند
// و باید مستقیماً از import.meta.env خوانده شوند.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// بررسی اینکه آیا متغیرهای محیطی بارگذاری شده اند
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not set in environment variables.');
  // می توانید در اینجا یک خطا پرتاب کنید یا به روش دیگری مدیریت کنید
  // throw new Error('Supabase URL or Anon Key is not set');
}

// ایجاد کلاینت Supabase
// اگر متغیرها تعریف نشده باشند، createClient ممکن است خطا دهد، که با بررسی بالا مدیریت می شود.
export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

// توضیحات:
// - @supabase/supabase-js: کتابخانه رسمی Supabase برای جاوااسکریپت/تایپ‌اسکریپت.
// - createClient: تابعی برای ایجاد یک نمونه از کلاینت Supabase.
// - import.meta.env: روش استاندارد Vite برای دسترسی به متغیرهای محیطی.
// - VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY: نام متغیرهای محیطی شما.
// - as string: تایپ‌اسکریپت ممکن است نوع import.meta.env را ناشناخته بداند، با این کار تایپ آن را مشخص می‌کنیم.
// - export const supabase: کلاینت Supabase را export می‌کنیم تا در سایر بخش‌های برنامه قابل استفاده باشد.
