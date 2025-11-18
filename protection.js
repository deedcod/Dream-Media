(function() {
    "use strict";

    // ============================================
    // ⚡ نسخة محسّنة - سريعة جداً وقوية
    // ============================================

    let devToolsDetected = false;
    const THRESHOLD = 160;

    // ============================================
    // 🔒 1) قفل جميع الاختصارات (خفيف جداً)
    // ============================================
    document.addEventListener("keydown", function(e) {
        const key = e.key.toLowerCase();
        
        // ✅ F12 - أدوات المطور
        if (key === "f12") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // ✅ Ctrl + U - عرض المصدر (أهم اختصار!)
        if (e.ctrlKey && key === "u") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // ✅ Ctrl + S - حفظ الصفحة
        if (e.ctrlKey && key === "s") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // ✅ Ctrl + P - طباعة
        if (e.ctrlKey && key === "p") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // ✅ Ctrl + Shift + I/J/C - أدوات المطور
        if (e.ctrlKey && e.shiftKey) {
            if (key === "i" || key === "j" || key === "c") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
        
        // ✅ Ctrl + Shift + K - Console في Firefox
        if (e.ctrlKey && e.shiftKey && key === "k") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
    }, true);

    // ============================================
    // 🔒 2) قفل النقر بالزر الأيمن والنسخ
    // ============================================
    const blockedEvents = [
        "contextmenu",  // كليك يمين
        "copy",         // نسخ
        "cut",          // قص
        "paste",        // لصق (اختياري)
        "selectstart",  // تحديد النص
        "dragstart"     // سحب
    ];

    blockedEvents.forEach(function(evt) {
        document.addEventListener(evt, function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    });

    // ============================================
    // 🔍 3) كشف أدوات المطور (محسّن - كل 5 ثواني)
    // ============================================
    function checkDevTools() {
        if (devToolsDetected) return;
        
        try {
            // طريقة 1: فحص حجم النافذة
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            
            if (widthDiff > THRESHOLD || heightDiff > THRESHOLD) {
                blockAccess();
                return;
            }
            
            // طريقة 2: فحص الوقت (debugger)
            const before = performance.now();
            debugger;
            const after = performance.now();
            
            if (after - before > 100) {
                blockAccess();
            }
        } catch(e) {
            // تجاهل الأخطاء
        }
    }

    // ============================================
    // 🚫 4) حجب الوصول (مرة واحدة فقط)
    // ============================================
    function blockAccess() {
        if (devToolsDetected) return;
        devToolsDetected = true;
        
        // خيار 1: رسالة تحذير
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Arial', sans-serif;
                margin: 0;
            ">
                <div style="
                    background: white;
                    padding: 40px 60px;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                ">
                    <h1 style="color: #667eea; font-size: 48px; margin: 0 0 20px 0;">⚠️</h1>
                    <h2 style="color: #333; margin: 0 0 15px 0;">غير مصرح بالوصول</h2>
                    <p style="color: #666; margin: 0;">تم اكتشاف محاولة فتح أدوات المطور</p>
                </div>
            </div>
        `;
        
        // خيار 2: إعادة تحميل الصفحة (أقوى)
        // setTimeout(function() {
        //     window.location.reload();
        // }, 1000);
        
        // خيار 3: إغلاق النافذة
        // window.close();
    }

    // ============================================
    // ⏱️ 5) فحص دوري (كل 5 ثواني بدلاً من 800ms)
    // ============================================
    setInterval(checkDevTools, 5000); // أخف 6 مرات!

    // ============================================
    // 🎯 6) فحص ذكي باستخدام console.log
    // ============================================
    (function() {
        const element = new Image();
        let consoleOpened = false;
        
        Object.defineProperty(element, "id", {
            get: function() {
                if (!consoleOpened) {
                    consoleOpened = true;
                    blockAccess();
                }
                return "";
            }
        });
        
        // فحص واحد عند التحميل
        requestIdleCallback(function() {
            console.log("%c", element);
        }, { timeout: 1000 });
    })();

    // ============================================
    // 🛡️ 7) حماية إضافية من Firebug
    // ============================================
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
        blockAccess();
    }

    // ============================================
    // 🚀 8) فحص فوري عند التحميل
    // ============================================
    window.addEventListener("load", function() {
        checkDevTools();
    });

    // ============================================
    // 👁️ 9) مراقبة تغيير حجم النافذة
    // ============================================
    window.addEventListener("resize", function() {
        if (!devToolsDetected) {
            checkDevTools();
        }
    });

})();
