odoo.define('eq_copy_clipboard.set_clipboard', function (require) {
    "use strict";

    return function (value) {
        const tempInput = document.createElement("textarea");
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = value.replace(/\u00a0/g, " ");
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    };

});
