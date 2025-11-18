(function() {
    "use strict";

    // ============================================
    // ✅ نسخة محسّنة - سريعة وفعالة
    // ============================================

    let devToolsOpen = false;
    let redirected = false;

    // ============================================
    // 1️⃣ منع اختصارات لوحة المفاتيح (خفيف جداً)
    // ============================================
    document.addEventListener("keydown", function(e) {
        const key = e.key.toLowerCase();
        
        // F12
        if (key === "f12") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl + Shift + I/J/C (أدوات المطور)
        if (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl + U (عرض المصدر)
        if (e.ctrlKey && key === "u") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl + S (حفظ الصفحة)
        if (e.ctrlKey && key === "s") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // ============================================
    // 2️⃣ منع النقر بالزر الأيمن والنسخ (خفيف جداً)
    // ============================================
    ["contextmenu", "copy", "cut", "selectstart", "dragstart"].forEach(function(evt) {
        document.addEventListener(evt, function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    });

    // ============================================
    // 3️⃣ كشف أدوات المطور (محسّن - أقل استهلاكاً)
    // ============================================
    function detectDevTools() {
        // طريقة 1: فحص حجم النافذة (كل 3 ثواني بدلاً من كل ثانية)
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > 160 || heightDiff > 160) {
            devToolsOpen = true;
            handleDevTools();
            return;
        }

        // طريقة 2: فحص console.log (خفيف)
        const start = performance.now();
        debugger; // يتوقف إذا كانت DevTools مفتوحة
        const end = performance.now();
        
        if (end - start > 100) {
            devToolsOpen = true;
            handleDevTools();
        }
    }

    // ============================================
    // 4️⃣ التعامل مع فتح أدوات المطور (مرة واحدة فقط)
    // ============================================
    function handleDevTools() {
        if (redirected) return;
        redirected = true;
        
        // خيار 1: إعادة تحميل الصفحة
        // window.location.reload();
        
        // خيار 2: إعادة توجيه لصفحة فارغة
        document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;font-family:Arial;'>⚠️ غير مصرح بالوصول</h1>";
        
        // خيار 3: فقط رسالة تحذير (الأخف)
        // alert("Developer tools detected!");
    }

    // ============================================
    // 5️⃣ فحص دوري (كل 3 ثواني بدلاً من كل ثانية)
    // ============================================
    setInterval(function() {
        if (!redirected) {
            try {
                detectDevTools();
            } catch(e) {
                // تجاهل الأخطاء
            }
        }
    }, 3000); // 3 ثواني بدلاً من 800ms

    // ============================================
    // 6️⃣ كشف باستخدام console (أذكى وأخف)
    // ============================================
    (function() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                devToolsOpen = true;
                handleDevTools();
                throw new Error("DevTools detected");
            }
        });
        
        // فحص واحد فقط عند تحميل الصفحة
        requestIdleCallback(function() {
            console.log(element);
        });
    })();

    // ============================================
    // 7️⃣ منع Firebug وأدوات أخرى
    // ============================================
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
        handleDevTools();
    }

})();
