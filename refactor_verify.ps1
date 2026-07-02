$replacements = @(
  @{ Find="<title>تأكيد الحساب | دايكو</title>"; Replace="<title data-i18n=`"auth_verify_page_title`">تأكيد الحساب | دايكو</title>" },
  @{ Find="<span>التسجيل</span>"; Replace="<span data-i18n=`"auth_verify_step1`">التسجيل</span>" },
  @{ Find="<span>التفعيل</span>"; Replace="<span data-i18n=`"auth_verify_step2`">التفعيل</span>" },
  @{ Find="<span>الإتمام</span>"; Replace="<span data-i18n=`"auth_verify_step3`">الإتمام</span>" },
  @{ Find="<span>دايكو DAICO</span>"; Replace="<span data-i18n=`"auth_brand`">دايكو DAICO</span>" },
  @{ Find="<h1 class=`"auth-title`">تفعيل الحساب والبريد</h1>"; Replace="<h1 class=`"auth-title`" data-i18n=`"auth_verify_heading`">تفعيل الحساب والبريد</h1>" },
  @{ Find="أدخل الرمز المكون من 4 أرقام المرسل إلى:"; Replace="<span data-i18n=`"auth_verify_desc_text`">أدخل الرمز المكون من 4 أرقام المرسل إلى:</span>" },
  @{ Find=">تفعيل الحساب</button>"; Replace=" data-i18n=`"auth_verify_btn`">تفعيل الحساب</button>" },
  @{ Find="<span>لم يصلك الرمز؟ <a href=`"#`" id=`"resend-btn`">أعد إرسال الرمز (OTP)</a></span>"; Replace="<span><span data-i18n=`"auth_verify_no_code`">لم يصلك الرمز؟</span> <a href=`"#`" id=`"resend-btn`" data-i18n=`"auth_verify_resend`">أعد إرسال الرمز (OTP)</a></span>" },
  @{ Find="<script src=`"../js/db.js`"></script>"; Replace="<script src=`"../js/i18n.js`"></script>`n  <script src=`"../js/db.js`"></script>" },
  @{ Find="تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني. يرجى إدخال الرمز المكون من 4 أرقام لتفعيل حسابك (الرمز صالح لمدة 5 دقائق)."; Replace="`" + window.DAICO_I18N.t('auth_verify_success_sent') + `"" },
  @{ Find="تم تفعيل حسابك بنجاح! جاري تسجيل الدخول..."; Replace="`" + window.DAICO_I18N.t('auth_verify_success_activated') + `"" },
  @{ Find="جاري توليد وإرسال رمز جديد..."; Replace="`" + window.DAICO_I18N.t('auth_verify_generating_new') + `"" }
)

$file = "c:\Users\reem7\OneDrive\Desktop\DAICO website\DAICO-website\auth\verify-email.html"
$content = Get-Content $file -Raw -Encoding UTF8
foreach ($entry in $replacements) {
    $content = $content.Replace($entry.Find, $entry.Replace)
}
Set-Content -Path $file -Value $content -Encoding UTF8
Write-Host "verify-email.html done"
