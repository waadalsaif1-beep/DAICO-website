$htmlReplacements = @(
  @{ Key="head_title"; Find="مركز دايكو للتميز في البيانات والذكاء الاصطناعي | DAICO"; Replace="" },
  @{ Key="head_desc"; Find="مركز دايكو (DAICO) هو مركز التميز للبيانات والذكاء الاصطناعي بجامعة الملك سعود بشراكة سدايا، لسد الفجوة المهنية وإعداد الكفاءات الوطنية وتطوير الحلول الذكية."; Replace="" },
  @{ Key="brand_title"; Find=">دايكو <"; Replace="><span data-i18n=`"brand_title`"></span> <" },
  @{ Key="brand_badge"; Find=">إحدى مبادرات سدايا<"; Replace="><span data-i18n=`"brand_badge`"></span><" },
  @{ Key="nav_about"; Find=">عن دايكو<"; Replace="><span data-i18n=`"nav_about`"></span><" },
  @{ Key="nav_programs"; Find=">البرامج والمسارات<"; Replace="><span data-i18n=`"nav_programs`"></span><" },
  @{ Key="nav_trainers"; Find=">الخبراء والموجهون<"; Replace="><span data-i18n=`"nav_trainers`"></span><" },
  @{ Key="nav_faqs"; Find=">الأسئلة الشائعة<"; Replace="><span data-i18n=`"nav_faqs`"></span><" },
  @{ Key="nav_contact"; Find=">اتصل بنا<"; Replace="><span data-i18n=`"nav_contact`"></span><" },
  @{ Key="btn_login"; Find=">تسجيل الدخول<"; Replace="><span data-i18n=`"btn_login`"></span><" },
  @{ Key="btn_register"; Find=">انضم إلينا<"; Replace="><span data-i18n=`"btn_register`"></span><" },
  @{ Key="hero_badge"; Find=">مركز التميز للبيانات والذكاء الاصطناعي<"; Replace="><span data-i18n=`"hero_badge`"></span><" },
  @{ Key="hero_title"; Find=">نقود التحول الوطني ونمكّن القطاعات الحيوية بالبيانات والذكاء الاصطناعي<"; Replace="><span data-i18n=`"hero_title`"></span><" },
  @{ Key="hero_desc"; Find=">
          نعمل في مركز دايكو (DAICO) بكلية علوم الحاسب والمعلومات بجامعة الملك سعود، بشراكة استراتيجية مع سدايا، على تأهيل الكوادر الوطنية وسد الفجوة مع سوق العمل عبر برامج تدريبية متخصصة، ودعم هندسة البرمجيات الذكية وتطوير حالات استخدام وطنية تدعم التحول الرقمي.
        <"; Replace="><span data-i18n=`"hero_desc`"></span><" },
  @{ Key="btn_discover"; Find=">اكتشف حلولنا<"; Replace="><span data-i18n=`"btn_discover`"></span><" },
  @{ Key="btn_participate"; Find=">شارك في التحول<"; Replace="><span data-i18n=`"btn_participate`"></span><" },
  @{ Key="partners_title"; Find=">بمبادرة استراتيجية من<"; Replace="><span data-i18n=`"partners_title`"></span><" },
  @{ Key="partner_ksu"; Find=">جامعة الملك سعود<"; Replace="><span data-i18n=`"partner_ksu`"></span><" },
  @{ Key="partner_sdaia"; Find=">الهيئة السعودية للبيانات والذكاء الاصطناعي | سدايا<"; Replace="><span data-i18n=`"partner_sdaia`"></span><" },
  @{ Key="visit_site"; Find=">زيارة الموقع الرسمي<"; Replace="><span data-i18n=`"visit_site`"></span><" },
  @{ Key="stat_students"; Find=">طالب ومبتكر متخرج<"; Replace="><span data-i18n=`"stat_students`"></span><" },
  @{ Key="stat_courses"; Find=">برنامج تدريبي وورشة عمل<"; Replace="><span data-i18n=`"stat_courses`"></span><" },
  @{ Key="stat_trainers"; Find=">مدرب وخبير أكاديمي<"; Replace="><span data-i18n=`"stat_trainers`"></span><" },
  @{ Key="stat_employment"; Find=">نسبة التوظيف والالتحاق بسوق العمل<"; Replace="><span data-i18n=`"stat_employment`"></span><" },
  @{ Key="about_subtitle"; Find=">من نحن<"; Replace="><span data-i18n=`"about_subtitle`"></span><" },
  @{ Key="about_title"; Find=">مركز دايكو للتميز في البيانات والذكاء الاصطناعي<"; Replace="><span data-i18n=`"about_title`"></span><" },
  @{ Key="about_desc"; Find=">مبادرة وطنية مشتركة بين سدايا وجامعة الملك سعود لتأهيل الكوادر المتخصصة، ودعم تطوير برمجيات الذكاء الاصطناعي، وتطوير حالات استخدام مبتكرة ترفع الإنتاجية وتدعم التحول الرقمي.<"; Replace="><span data-i18n=`"about_desc`"></span><" },
  @{ Key="about_card1_title"; Find=">تعليم مهني تفاعلي<"; Replace="><span data-i18n=`"about_card1_title`"></span><" },
  @{ Key="about_card1_desc"; Find=">مناهج تدريبية مبنية وفقاً لأحدث الممارسات ومعايير سوق العمل الفعلية لضمان تحصيل مهارات حقيقية وعملية.<"; Replace="><span data-i18n=`"about_card1_desc`"></span><" },
  @{ Key="about_card2_title"; Find=">ابتكار ومنافسة<"; Replace="><span data-i18n=`"about_card2_title`"></span><" },
  @{ Key="about_card2_desc"; Find=">تنظيم هاكاثونات ومسابقات برمجية تثير العصف الذهني وتدعم تكوين فرق قوية لصياغة حلول تخدم رؤية المملكة.<"; Replace="><span data-i18n=`"about_card2_desc`"></span><" },
  @{ Key="about_card3_title"; Find=">شهادات معتمدة وموثقة<"; Replace="><span data-i18n=`"about_card3_title`"></span><" },
  @{ Key="about_card3_desc"; Find=">نصدر شهادات حضور وإتمام رقمية مزودة برموز استجابة سريعة (QR) مشفرة وموثقة تتيح للجهات التحقق الفوري.<"; Replace="><span data-i18n=`"about_card3_desc`"></span><" },
  @{ Key="programs_subtitle"; Find=">مسارات التدريب<"; Replace="><span data-i18n=`"programs_subtitle`"></span><" },
  @{ Key="programs_title"; Find=">برامج الابتكار المتاحة حالياً<"; Replace="><span data-i18n=`"programs_title`"></span><" },
  @{ Key="programs_desc"; Find=">تصفح مساراتنا المعتمدة وسجل مقعدك مباشرة لبدء رحلتك التعليمية معنا.<"; Replace="><span data-i18n=`"programs_desc`"></span><" },
  @{ Key="filter_all"; Find=">الكل<"; Replace="><span data-i18n=`"filter_all`"></span><" },
  @{ Key="filter_course"; Find=">الدورات التدريبية<"; Replace="><span data-i18n=`"filter_course`"></span><" },
  @{ Key="filter_bootcamp"; Find=">المعسكرات التقنية<"; Replace="><span data-i18n=`"filter_bootcamp`"></span><" },
  @{ Key="filter_hackathon"; Find=">الهاكاثونات<"; Replace="><span data-i18n=`"filter_hackathon`"></span><" },
  @{ Key="filter_workshop"; Find=">ورش العمل<"; Replace="><span data-i18n=`"filter_workshop`"></span><" },
  @{ Key="trainers_subtitle"; Find=">المشرفون والخبراء<"; Replace="><span data-i18n=`"trainers_subtitle`"></span><" },
  @{ Key="trainers_title"; Find=">طاقم المدربين الأكاديميين<"; Replace="><span data-i18n=`"trainers_title`"></span><" },
  @{ Key="trainers_desc"; Find=">مجموعة متميزة من المستشارين والخبراء الأكاديميين ذوي الخبرات الطويلة في القطاعين الأكاديمي والخاص.<"; Replace="><span data-i18n=`"trainers_desc`"></span><" },
  @{ Key="success_subtitle"; Find=">قصص نجاح<"; Replace="><span data-i18n=`"success_subtitle`"></span><" },
  @{ Key="success_title"; Find=">ماذا يقول خريجونا؟<"; Replace="><span data-i18n=`"success_title`"></span><" },
  @{ Key="success_q1"; Find=">\"التحقت بمعسكر الأمن السيبراني في مركز دايكو وكان التحدي كبيراً، ولكن الخبرة والمحتوى العملي ساعداني على اجتياز المقابلة والتوظيف كمهندس حماية شبكات فور تخرجي.\"<"; Replace="><span data-i18n=`"success_q1`"></span><" },
  @{ Key="success_q2"; Find=">\"برنامج مطور الويب المتكامل باستخدام Laravel & Next.js كان نقطة تحول في مسيرتي البرمجية. التطبيقات العملية والربط الحقيقي هما أهم ما يميز هذا الكورس.\"<"; Replace="><span data-i18n=`"success_q2`"></span><" },
  @{ Key="partners_scroll_title"; Find=">شركاء الابتكار والنجاح<"; Replace="><span data-i18n=`"partners_scroll_title`"></span><" },
  @{ Key="faq_subtitle"; Find=">الأسئلة المتكررة<"; Replace="><span data-i18n=`"faq_subtitle`"></span><" },
  @{ Key="faq_title"; Find=">لديك استفسار؟ لدينا إجابة<"; Replace="><span data-i18n=`"faq_title`"></span><" },
  @{ Key="faq_q1"; Find=">كيف يمكنني التسجيل في البرامج المجانية؟<"; Replace="><span data-i18n=`"faq_q1`"></span><" },
  @{ Key="faq_a1"; Find=">يمكنك ببساطة إنشاء حساب مجاني في المنصة، والضغط على خيار تفاصيل أي برنامج مجاني، ثم الضغط على `"سجل الآن`" لحجز مقعدك فوراً طالما تتوفر مقاعد شاغرة.<"; Replace="><span data-i18n=`"faq_a1`"></span><" },
  @{ Key="faq_q2"; Find=">هل الشهادات معترف بها؟<"; Replace="><span data-i18n=`"faq_q2`"></span><" },
  @{ Key="faq_a2"; Find=">نعم، جميع الشهادات الصادرة تحمل رمز تحقق فريد (QR Code) مسجل في قواعد بيانات مركز دايكو، مما يمكن إدارات الموارد البشرية والشركات من التحقق من صحتها بمسحة واحدة.<"; Replace="><span data-i18n=`"faq_a2`"></span><" },
  @{ Key="faq_q3"; Find=">ما هي متطلبات حضور المعسكرات الحضورية؟<"; Replace="><span data-i18n=`"faq_q3`"></span><" },
  @{ Key="faq_a3"; Find=">المعسكرات الحضورية تقام بمقر الحاضنة بالرياض وتتطلب إحضار حاسب محمول شخصي بمواصفات تقنية مناسبة، واجتياز اختبار المهارات التأسيسي للمسار المحدد.<"; Replace="><span data-i18n=`"faq_a3`"></span><" },
  @{ Key="contact_subtitle"; Find=">تواصل معنا<"; Replace="><span data-i18n=`"contact_subtitle`"></span><" },
  @{ Key="contact_title"; Find=">يسعدنا سماع صوتك<"; Replace="><span data-i18n=`"contact_title`"></span><" },
  @{ Key="contact_info"; Find=">معلومات الاتصال<"; Replace="><span data-i18n=`"contact_info`"></span><" },
  @{ Key="contact_desc"; Find=">نحن هنا للإجابة على جميع استفساراتك حول البرامج والتسجيل وعروض رعاية المبتكرين.<"; Replace="><span data-i18n=`"contact_desc`"></span><" },
  @{ Key="contact_addr"; Find=">العنوان<"; Replace="><span data-i18n=`"contact_addr`"></span><" },
  @{ Key="contact_addr_val"; Find=">كلية علوم الحاسب والمعلومات، جامعة الملك سعود، الرياض، المملكة العربية السعودية<"; Replace="><span data-i18n=`"contact_addr_val`"></span><" },
  @{ Key="contact_email"; Find=">البريد الإلكتروني<"; Replace="><span data-i18n=`"contact_email`"></span><" },
  @{ Key="contact_phone"; Find=">رقم الهاتف الموحد<"; Replace="><span data-i18n=`"contact_phone`"></span><" },
  @{ Key="form_name"; Find=">الاسم الكريم *<"; Replace="><span data-i18n=`"form_name`"></span><" },
  @{ Key="form_email"; Find=">البريد الإلكتروني *<"; Replace="><span data-i18n=`"form_email`"></span><" },
  @{ Key="form_msg"; Find=">مضمون الرسالة *<"; Replace="><span data-i18n=`"form_msg`"></span><" },
  @{ Key="btn_send"; Find=">إرسال الرسالة<"; Replace="><span data-i18n=`"btn_send`"></span><" },
  @{ Key="footer_desc"; Find=">مركز التميز للبيانات والذكاء الاصطناعي بكلية علوم الحاسب والمعلومات بجامعة الملك سعود، بشراكة استراتيجية مع سدايا لسد الفجوة بين التعليم الأكاديمي وسوق العمل وتطوير الحلول البرمجية الذكية.<"; Replace="><span data-i18n=`"footer_desc`"></span><" },
  @{ Key="footer_links"; Find=">روابط سريعة<"; Replace="><span data-i18n=`"footer_links`"></span><" },
  @{ Key="footer_about"; Find=">عن المركز<"; Replace="><span data-i18n=`"footer_about`"></span><" },
  @{ Key="footer_programs"; Find=">تصفح المسارات<"; Replace="><span data-i18n=`"footer_programs`"></span><" },
  @{ Key="footer_team"; Find=">فريق الخبراء<"; Replace="><span data-i18n=`"footer_team`"></span><" },
  @{ Key="footer_rules"; Find=">الشروط والأنظمة<"; Replace="><span data-i18n=`"footer_rules`"></span><" },
  @{ Key="footer_privacy"; Find=">سياسة الخصوصية<"; Replace="><span data-i18n=`"footer_privacy`"></span><" },
  @{ Key="footer_terms"; Find=">شروط الخدمة والتدريب<"; Replace="><span data-i18n=`"footer_terms`"></span><" },
  @{ Key="footer_cert"; Find=">سياسة الاعتماد الفني<"; Replace="><span data-i18n=`"footer_cert`"></span><" },
  @{ Key="footer_copyright"; Find=">حقوق الطبع محفوظة © 2026 مركز دايكو للتميز في البيانات والذكاء الاصطناعي.<"; Replace="><span data-i18n=`"footer_copyright`"></span><" },
  @{ Key="footer_saudi"; Find=">صنع بكل فخر بالمملكة العربية السعودية 🇸🇦<"; Replace="><span data-i18n=`"footer_saudi`"></span><" }
)

$files = Get-ChildItem -Filter *.html -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    foreach ($entry in $htmlReplacements) {
        $content = $content.Replace($entry.Find, $entry.Replace)
    }
    
    # Handle placeholders specifically
    $content = $content -replace 'placeholder="الاسم الرباعي"', 'data-i18n-placeholder="contact_name_ph" placeholder=""'
    $content = $content -replace 'placeholder="اكتب استفسارك بالتفصيل..."', 'data-i18n-placeholder="contact_msg_ph" placeholder=""'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "HTML Replacement Complete."
