var opts = {

    back: "",
    defs: "",

    save_main_page: function(){
        defs.main_page = $("#main_page").val();
        alert("Saved");
        browser.runtime.sendMessage({code: "set", msg: defs});
        $("#main_page").focus();
        return 0;
    },
    save_main_page_as_blank: function(){
        defs.main_page = "about:blank";
        alert("Saved");
        browser.runtime.sendMessage({code: "set", msg: defs});
        $("#main_page").focus();
        return 0;
    },

    // EVENT
    fill: function(){
        $("#main_page").val(defs.main_page);
        $("#save_main_page").click(this.save_main_page);
        $("#save_main_page_as_blank").click(this.save_main_page_as_blank);
    },

    getMsg: function(r){
        defs = r.msg;
        opts.fill();
    },

    init: function(e){
        // GETTING THE SETTINGS
        browser.runtime.sendMessage({code: "get"},this.getMsg);
    }

};

document.addEventListener("load", opts.init());