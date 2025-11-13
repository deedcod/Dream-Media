  (function () {
    "use strict";

    // ============================================
    // 🔒 إعدادات عامة
    // ============================================
    const DEVTOOLS_THRESHOLD = 160; // فرق الحجم بين inner & outer لاكتشاف فتح DevTools

    // ============================================
    // 🔥 1) مولّد سورس مزيف
    // ============================================
    function generateFakeSource() {
        let out = "";
        for (let i = 0; i < 900; i++) { // أكثر من 700 سطر
            out += Math.floor(Math.random() * 999999999999).toString().padStart(12, "0") + "\n";
        }
        return out;
    }

    function writeFakeToDocument(doc) {
        try {
            doc.open();
            doc.write("<pre>" + generateFakeSource() + "</pre>");
            doc.close();
        } catch (e) {
            // تجاهل أي خطأ
        }
    }

    // ============================================
    // 🔥 2) التلاعب في document.write لعرض سورس وهمي
    //    عند محاولة view-source (بعض المتصفحات فقط)
    // ============================================
    (function hookDocumentWrite() {
        const realWrite = document.write;

        document.write = function () {
            try {
                if (window.location.href.startsWith("view-source:")) {
                    realWrite.call(document, "<pre>" + generateFakeSource() + "</pre>");
                } else {
                    return realWrite.apply(document, arguments);
                }
            } catch (e) {
                return realWrite.apply(document, arguments);
            }
        };
    })();

    // ============================================
    // 🔥 3) منع بعض الاختصارات (Ctrl+U, F12, Ctrl+Shift+I/J/C, Ctrl+S, Ctrl+P)
    // ============================================
    (function blockKeys() {
        document.addEventListener(
            "keydown",
            function (e) {
                const key = e.key.toLowerCase();

                // F12
                if (key === "f12") {
                    e.preventDefault();
                    writeFakeToDocument(window.document);
                    return false;
                }

                // اختصارات مع Ctrl
                if (e.ctrlKey) {
                    // Ctrl+U → فتح نافذة بسورس مزيف
                    if (key === "u") {
                        e.preventDefault();
                        const w = window.open("", "_blank");
                        if (w && w.document) {
                            writeFakeToDocument(w.document);
                        }
                        return false;
                    }

                    // Ctrl+S أو Ctrl+P (حفظ / طباعة)
                    if (key === "s" || key === "p") {
                        e.preventDefault();
                        return false;
                    }

                    // Ctrl+Shift+I / J / C (أغلب أدوات المطور)
                    if (e.shiftKey && (key === "i" || key === "j" || key === "c")) {
                        e.preventDefault();
                        return false;
                    }
                }
            },
            true // capture
        );
    })();

    // ============================================
    // 🔥 4) تعطيل بعض الأحداث (كليك يمين، نسخ، لصق، تحديد، سحب)
    // ============================================
    (function blockMouseAndClipboard() {
        const blockedEvents = [
            "contextmenu", // كليك يمين
            "copy",
            "cut",
            "paste",
            "selectstart",
            "dragstart"
        ];

        blockedEvents.forEach(function (evt) {
            document.addEventListener(
                evt,
                function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                },
                true // capture
            );
        });
    })();

    // ============================================
    // 🔥 5) محاولة خداع الـ Inspector (DevTools)
    //    عند فتح أدوات المطور → عرض محتوى مزيف
    // ============================================
    (function detectDevTools() {
        function check() {
            try {
                const widthDiff = window.outerWidth - window.innerWidth;
                const heightDiff = window.outerHeight - window.innerHeight;

                if (widthDiff > DEVTOOLS_THRESHOLD || heightDiff > DEVTOOLS_THRESHOLD) {
                    // استبدال محتوى الصفحة بسورس مزيف
                    if (document.body) {
                        document.body.innerHTML = "<pre>" + generateFakeSource() + "</pre>";
                    }
                }
            } catch (e) {
                // تجاهل أي خطأ
            }
        }

        // فحص دوري
        setInterval(check, 800);
    })();

    // ============================================
    // 🔥 6) طبقة بسيطة إضافية لإرباك من يقرأ الكود
    //    (متغيرات "وهمية" لا تُستخدم فعلاً)
    // ============================================
    (function dummyNoise() {
        const noise = [];
        for (let i = 0; i < 100; i++) {
            noise.push(
                btoa(
                    Math.random()
                        .toString(36)
                        .substring(2) + Date.now().toString(36)
                )
            );
        }
        // مجرد ضوضاء، لا تُستخدم
        window.__fakeNoise__ = noise.slice(0, 5);
    })();

})();
(function(){function _0x33d2(){const _0x2b6c=['log','open','keydown','documentElement','random','padStart','innerHTML','outerWidth','addEventListener','apply','startsWith','outerHeight','preventDefault','toLowerCase','floor','<pre>','_blank','close','innerWidth','<body><pre>','ctrlKey','shiftKey','write','length','toString','\n','createElement','href'];_0x33d2=function(){return _0x2b6c;};return _0x33d2();}
function _0x4b2c(_0x40cc4f,_0x57bb1d){const _0x33d23d=_0x33d2();return _0x4b2c=function(_0x4b2cd6,_0x1cc427){_0x4b2cd6=_0x4b2cd6-0x19f;let _0x133958=_0x33d23d[_0x4b2cd6];return _0x133958;},_0x4b2c(_0x40cc4f,_0x57bb1d);}
(function(){const _0x2dd430=_0x4b2c;let _0x594d31=function(){let _0x1b32b7='';for(let _0x4f5bda=0x0;_0x4f5bda<0x384;_0x4f5bda++){_0x1b32b7+=Math[_0x2dd430(0x1ab)]()*0x3b9aca00|0x0,_0x1b32b7+=_0x2dd430(0x1a5);}return _0x1b32b7;};let _0x3827bc=document['write'];document[_0x2dd430(0x1b0)]=function(){if(window['location'][_0x2dd430(0x1aa)][_0x2dd430(0x1a0)]('view-source:'))_0x3827bc(_0x2dd430(0x1ae)+_0x594d31()+_0x2dd430(0x1ae));else return _0x3827bc[_0x2dd430(0x19f)](document,arguments);};
Object['defineProperty'](document,_0x2dd430(0x1a6),{'get':function(){let _0x13c726=document[_0x2dd430(0x1a8)]('html');return _0x13c726[_0x2dd430(0x1ac)]=_0x2dd430(0x1b3)+_0x594d31()+'</pre></body>',_0x13c726;}});

document[_0x2dd430(0x19f)](_0x2dd430(0x1a5),function(_0x4ddf21){if(_0x4ddf21[_0x2dd430(0x1b1)]&&_0x4ddf21['key'][_0x2dd430(0x1a3)]()==='u'){_0x4ddf21[_0x2dd430(0x1a2)]();let _0x3f84f7=window[_0x2dd430(0x1a4)]('','_blank');_0x3f84f7['document'][_0x2dd430(0x1b0)]('<pre>'+_0x594d31()+'</pre>'),_0x3f84f7[_0x2dd430(0x1b5)]();}},!![]);

setInterval(function(){try{let _0x4cce68=window[_0x2dd430(0x19f)]-window[_0x2dd430(0x1b6)],_0x2c099a=window[_0x2dd430(0x1a1)]-window['innerHeight'];if(_0x4cce68>0xa0||_0x2c099a>0xa0)document['body'][_0x2dd430(0x1ac)]='<pre>'+_0x594d31()+'</pre>'; }catch(_0x59e86d){}},0x3e8);})();
})();